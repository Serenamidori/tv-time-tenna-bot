const utils = require("./");
const helper = require("./schedulerHelpers");
const { setTimeout } = require('timers/promises');
const DailyTask = require('../../models/DailyTask');
let respondedUsers = new Set();

class ScheduledTasks {
  static async runDailyTasks(client) {
    console.log('📋 Running Daily Tasks');
    await this.runBirthdayWishes(client);
    await this.runTVChatMessage(client);
  }

  static async getTask(taskType) {
    try {
      const task = await DailyTask.findOneAndUpdate(
        { taskType: taskType },
        { $setOnInsert: { taskType: taskType, createdAt: new Date() } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
      return task;
    } catch (error) {
      console.error(`Error finding task ${taskType}:`, error);
      return null;
    }
  }

  static async updateTask(task, lastExecuted, executionDay, messageId) {
    try {
      task.lastExecuted = lastExecuted;
      task.executionDay = executionDay;
      task.messageId = messageId;
      task.save();
      return true;
    } catch (error) {
      console.error(`Error updating task ${task.taskType}:`, error);
      return false;
    }
  }

  static async shouldRunToday(taskType) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const currentHourUTC = today.getUTCHours();
    const isWithinTimeSlot = currentHourUTC >= 16 || currentHourUTC < 4;
    if (!isWithinTimeSlot) {
      console.log(`📋 [${taskType}] currently outside allowed hours`);
      return false;
    };

    try {
      const task = await this.getTask(taskType);
      if (!task || task.executionDay !== todayString) {
        console.log(`📋 [${taskType}] task is available to run today!`);
        return true;
      }
      console.log(`📋 [${taskType}] task has already been run today on ${task.executionDay} at ${helper.toCST(task.lastExecuted)}`);
      return false;
    } catch (error) {
      console.error(`Error checking task ${taskType}:`, error);
      return false;
    }
  }
  
  static async runBirthdayWishes(bot) {
    if (await this.shouldRunToday('birthday')) {
      const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const task = await this.getTask('birthday');

      try {
        const birthdays = await helper.getTodaysBirthdays(today);
        let sentMessageID = null;
        if (birthdays.length > 0) {
          await channel.sendTyping();
          await setTimeout(3000);
          const sentMessage = await channel.send(helper.happyBirthdayMessage(birthdays));
          sentMessageID = sentMessage.id;
          console.log(`📋 [birthday] message was sent on ${today.toDateString()} at ${helper.toCST(today)}`);
        } else {
          console.log(`📋 [birthday] no message sent today (${today.toDateString()})`);
        }

        await this.updateTask(task, today, todayString, sentMessageID);
        
      } catch (error) {
        console.error('Failed to send Birthday chat message:', error);
      }
    }
  }

  static async runTVChatMessage(bot) {
    const lovesTvPattern = /\b((i|we) do|me+|indee+d|ye+s+|yea+h+|ilovetv)\b|\b((i|we)( really)?)?\s+(lo+ve|lu+v|li+ke|enjoy)\s+((watching\s)?(tv|television))\b/i;

    if (await this.shouldRunToday('ilovetv')) {
      const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const task = await this.getTask('ilovetv');

      try {
        await channel.sendTyping();
        await setTimeout(3000);
        const sentMessage = await channel.send(helper.iLoveTVMessage());
        console.log(`📋 [ilovetv] message was sent on ${today.toDateString()} at ${helper.toCST(today)}`);
        respondedUsers.clear();
        await this.updateTask(task, today, todayString, sentMessage.id);

        bot.on('messageCreate', async (message) => {
          if (message.author.bot) return;
          
          if (message.reference?.messageId === sentMessage.id) {
            let response = null
      
            if (lovesTvPattern.test(message.content)) {
              response = helper.tennaThankYouMessage();
      
              if (!respondedUsers.has(message.author.id)) {
                response += " [+15 POINTS]"
                utils.points.give(message.author.id, 15)
                respondedUsers.add(message.author.id);
              };
      
            } else {
              response = {content: helper.tennaNopeMessage(), ephemeral: true};
            }
            await message.reply(response);
          }
        });
      } catch (error) {
        console.error('Failed to send TV chat message:', error);
      }
    }
  }

  static async getDailyMessageId(taskType = 'ilovetv') {
    const task = await this.getTask(taskType);
    return task.messageId;
  }
}

module.exports = { ScheduledTasks };
