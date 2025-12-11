const DailyTask = require('../models/DailyTask');
const lovesTvPattern = /\b(i do|we do|me|indeed|ye+s|yea+h|ilovetv)\b|\b(i|we|i really|we really)?\s+(lo+ve|lu+v|like|enjoy)\s+(tv|television|watching tv)\b/i;
let dailyMessageId = null;
let respondedUsers = new Set();

class ScheduledTasks {
  static async shouldRunToday(taskType) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const currentHourUTC = today.getUTCHours();
    const isWithinTimeSlot = currentHourUTC >= 16 && currentHourUTC < 4;
    if (!isWithinTimeSlot) { return false };

    try {
      const task = await DailyTask.findOne({ taskType });
      if (!task || task.executionDay !== todayString) {
        await DailyTask.findOneAndUpdate(
          { taskType },
          { lastExecuted: today, executionDay: todayString },
          { upsert: true }
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error checking task ${taskType}:`, error);
      return false;
    }
  }
  
  // static async runBirthdayWishes(client) {
  //   if (await this.shouldRunToday('birthday')) {
  //     // Your birthday wish logic here
  //     const birthdayChannel = client.channels.cache.get('BIRTHDAY_CHANNEL_ID');
  //     birthdayChannel.send('🎂 Happy Birthday to our awesome members! 🎉');
  //   }
  // }

  static async runTVChatMessage(bot) {
    if (await this.shouldRunToday('ilovetv')) {
      const channel = await bot.channels.fetch(process.env.STAGE_CHAT);

      try {
        await channel.sendTyping();
        await setTimeout(3000);
        const sentMessage = await channel.send(lines[utils.random.rand(lines.length)-1]);
        dailyMessageId = sentMessage.id;
        respondedUsers.clear();

        bot.on('messageCreate', async (message) => {
          if (message.author.bot) return;
          
          if (message.reference?.messageId === dailyMessageId) {
            let response = null
      
            if (lovesTvPattern.test(message.content)) {
              response = thanks[utils.random.rand(thanks.length)-1];
      
              if (!respondedUsers.has(message.author.id)) {
                response += " [+15 POINTS]"
                utils.points.give(message.author.id, 15)
                respondedUsers.add(message.author.id);
              };
      
            } else {
              response = {content: nope[utils.random.rand(nope.length)-1], ephemeral: true};
            }
            await message.reply(response);
          }
        });
      } catch (error) {
        console.error('Failed to send TV chat message:', error);
      }
    }
  }

  // Main method to run all scheduled tasks
  static async runDailyTasks(client) {
    await this.runBirthdayWishes(client);
    await this.runTVChatMessage(client);
  }
}

// combine these
module.exports = ScheduledTasks;
module.exports.getDailyMessageId = () => dailyMessageId;
