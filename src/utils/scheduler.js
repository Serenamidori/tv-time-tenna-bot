const helper = require("./schedulerHelpers");
const { setTimeout } = require('timers/promises');
const DailyTask = require('../../models/DailyTask');
const { DateTime } = require("luxon");

class ScheduledTasks {
  static async runDailyTasks(client) {
    console.log('📋 Running Daily Tasks');
    const birthdayRan = await this.shouldRunToday('birthday') && await this.runBirthdayWishes(client);
    if (!birthdayRan && await this.shouldRunToday('ilovetv')) {
      await this.runTVChatMessage(client);
    }
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
      await task.save();
      return true;
    } catch (error) {
      console.error(`Error updating task ${task.taskType}:`, error);
      return false;
    }
  }

  static async shouldRunToday(taskType) {
    const now = DateTime.now().setZone("America/Chicago");
    const currentHour = now.hour;
    const isWithinTimeSlot = currentHour >= 9 && currentHour < 22;
    const todayString = now.toISODate();

    if (!isWithinTimeSlot) {
      console.log(`📋 [${taskType}] currently outside allowed hours`);
      return false;
    }

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
    const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
    const now = DateTime.now().setZone("America/Chicago");
    const today = now.toJSDate();
    const todayString = now.toISODate();
    const task = await this.getTask('birthday');

    try {
      const birthdays = await helper.getTodaysBirthdays(today);
      let sent = false;
      let sentMessageID = null;
      if (birthdays.length > 0) {
        await channel.sendTyping();
        await setTimeout(3000);
        const sentMessage = await channel.send(helper.happyBirthdayMessage(birthdays));
        sentMessageID = sentMessage.id;
        console.log(`📋 [birthday] message was sent on ${today.toDateString()} at ${helper.toCST(today)}`);
        sent = true;
      } else {
        console.log(`📋 [birthday] no message sent today (${today.toDateString()})`);
      }

      await this.updateTask(task, today, todayString, sentMessageID);
      return sent;
    } catch (error) {
      console.error('Failed to send Birthday chat message:', error);
      return false;
    }
  }

  static async runTVChatMessage(bot) {
    const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
    const now = DateTime.now().setZone("America/Chicago");
    const today = now.toJSDate();
    const todayString = now.toISODate();
    const task = await this.getTask('ilovetv');

    try {
      await channel.sendTyping();
      await setTimeout(3000);
      const sentMessage = await channel.send(helper.iLoveTVMessage());
      console.log(`📋 [ilovetv] message was sent on ${today.toDateString()} at ${helper.toCST(today)}`);
      await this.updateTask(task, today, todayString, sentMessage.id);
    } catch (error) {
      console.error('Failed to send TV chat message:', error);
    }
  }
  
  static async getDailyMessageId(taskType = 'ilovetv') {
    const task = await this.getTask(taskType);
    return (task !== null) ? task.messageId : null;
  }
}

module.exports = { ScheduledTasks };
