const utils = require("./");
const { setTimeout } = require('timers/promises');
const DailyTask = require('../../models/DailyTask');
const lovesTvPattern = /\b((i|we) do|me+|indee+d|ye+s+|yea+h+|ilovetv)\b|\b((i|we)( really)?)?\s+(lo+ve|lu+v|li+ke|enjoy)\s+((watching\s)?(tv|television))\b/i;
let dailyMessageId = null;
let respondedUsers = new Set();

class ScheduledTasks {
  static async runDailyTasks(client) {
    console.log('📋 Running Daily Tasks');
    await this.runBirthdayWishes(client);
    await this.runTVChatMessage(client);
  }

  static async getDailyTask(taskType) {
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

  static async updateDailyTask(task, lastExecuted, executionDay, messageId) {
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
      const task =  await this.getDailyTask(taskType);
      if (!task || task.executionDay !== todayString) {
        console.log(`📋 [${taskType}] task is available to run today!`);
        return true;
      }
      console.log(`📋 [${taskType}] task has already been run today on ${task.executionDay} at ${this.toCST(task.lastExecuted)}`);
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
      const task = await this.getDailyTask('birthday');

      try {
        const birthdays = await this.getTodaysBirthdays(today);
        let sentMessageID = null;
        if (birthdays.length > 0) {
          await channel.sendTyping();
          await setTimeout(3000);
          const sentMessage = await channel.send(this.happyBirthdayMessage(birthdays));
          sentMessageID = sentMessage.id;
          console.log(`📋 [birthday] message was sent on ${today.toDateString()} at ${this.toCST(today)}`);
        } else {
          console.log(`📋 [birthday] no message sent today (${today.toDateString()})`);
        }

        await this.updateDailyTask(task, today, todayString, sentMessageID);
        
      } catch (error) {
        console.error('Failed to send Birthday chat message:', error);
      }
    }
  }

  static async runTVChatMessage(bot) {
    if (await this.shouldRunToday('ilovetv')) {
      const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const task = await this.getDailyTask('ilovetv');

      try {
        await channel.sendTyping();
        await setTimeout(3000);
        const sentMessage = await channel.send(iLoveTVLines[utils.random.rand(iLoveTVLines.length)-1]);
        console.log(`📋 [ilovetv] message was sent on ${today.toDateString()} at ${this.toCST(today)}`);
        dailyMessageId = sentMessage.id;
        respondedUsers.clear();
        await this.updateDailyTask(task, today, todayString, dailyMessageId);

        bot.on('messageCreate', async (message) => {
          if (message.author.bot) return;
          
          if (message.reference?.messageId === dailyMessageId) {
            let response = null
      
            if (lovesTvPattern.test(message.content)) {
              response = iLoveTVThanks[utils.random.rand(iLoveTVThanks.length)-1];
      
              if (!respondedUsers.has(message.author.id)) {
                response += " [+15 POINTS]"
                utils.points.give(message.author.id, 15)
                respondedUsers.add(message.author.id);
              };
      
            } else {
              response = {content: iLoveTVNope[utils.random.rand(iLoveTVNope.length)-1], ephemeral: true};
            }
            await message.reply(response);
          }
        });
      } catch (error) {
        console.error('Failed to send TV chat message:', error);
      }
    }
  }

  static async getTodaysBirthdays(today) {
    const all = await utils.profile.all();
    return all.filter(profile => profile.birthday != null && this.sameMonthAndDay(profile.birthday, today));
  }
  
  static sameMonthAndDay(date1, date2) {
    const month1 = date1.getMonth();
    const day1 = date1.getDate();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    return month1 == month2 && day1 == day2;
  }

  static happyBirthdayMessage(birthdays) {
    let userIds = birthdays.map(profile => `<@!${profile.id}>`);
    let line = "";

    if (userIds.length > 1) {
      line = birthdayLinesPlural[utils.random.rand(linesPlural.length)-1]
    } else {
      line = birthdayLines[utils.random.rand(lines.length)-1]
    }

    return line.replace('{users}', userIds.join(' '));
  }

  static toCST(today) {
    return today.toLocaleTimeString('en-US', {
      timeZone: 'America/Chicago',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }
}

// Dialogue
const birthdayLines = [
  `<:breaking1:1446597036601507840><:breaking2:1446597037486375113><:breaking3:1446597038639681628><:breaking4:1446597046290350151><:breaking5:1446597047615754280> We've got a birthday today! Happy Birthday {users}!`,
  `Hope you have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
  `Hey {users}! Are you having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
  `Oh {users}, I hope you're having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
];
const birthdayLinesPlural = [
  `<:breaking1:1446597036601507840><:breaking2:1446597037486375113><:breaking3:1446597038639681628><:breaking4:1446597046290350151><:breaking5:1446597047615754280> We've got some birthdays today! Happy Birthday {users}!`,
  `Hope you all have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
  `Hey {users}! Are you all having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
  `Oh {users}, I hope you're all having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
];
const iLoveTVLines = [
  'Hey folks! Just popping in to ask, do you _love_ TV?',
  'At Everyone! Do _you_ love TV?\n-# _(... did I do that right??)_',
  'Quick! Someone reply with "I Love TV!"\n-# _(... please?)_',
  `"I Love TV". That's all you gotta say.`,
  'Hey, friends and fans! Who here loves TV??',
  `Got some points with _your_ name on them if you reply with "I Love TV"!`,
  '-# _...does anyone love TV...?_',
  'Do _you_ love TV? I bet you do! Reply with "I Love TV"!!',
  `Let's all shout "I Love TV"! Don't be shy now!`
];
const iLoveTVThanks = [
  `Yes, you _do_ love TV, don't you?`,
  `That's CORRECT!`,
  'I could hear that 99 more times!',
  `Haha, that's right!`,
  '<:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360>',
  'You really <:love1:1443452223387340984><:love2:1443452224029065276> TV? I knew it!'
];
const iLoveTVNope = [
  `That's the wrong answer!`,
  `Hmm, that doesn't sound quite right...`,
  `Sorry, what was that?! Couldn't hear you!`,
  'I must not have heard you right. You meant to say "I love TV" right?',
  'Ooh, so close. But, not really. Try again!'
];

module.exports = { ScheduledTasks, getDailyMessageId: () => dailyMessageId };
