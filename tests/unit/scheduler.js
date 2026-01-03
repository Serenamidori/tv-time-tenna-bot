const { ScheduledTasks } = require('../../src/utils/scheduler'); 
const schedulerHelpers = require("../../src/utils/schedulerHelpers");
const DailyTask = require('../../models/DailyTask');
const Profile = require('../../models/Profile');

jest.useFakeTimers();
jest.mock('../../models/DailyTask', () => ({
  findOneAndUpdate: jest.fn()
}));
jest.mock('../../models/Profile', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn()
}));

describe('Post Scheduler Tests', () => {
  beforeEach(() => {
    DailyTask.findOneAndUpdate.mockClear();
    Profile.find.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('scheduler.js', () => {
    describe('shouldRunToday', () => {
      it('should return true when within range 16:00 to 4:00 UTC', async () => {
        jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayString = yesterday.toISOString().split('T')[0];

        DailyTask.findOneAndUpdate.mockResolvedValue(
          { taskType: 'ilovetv', lastExecuted: yesterday, executionDay: yesterdayString }
        );

        const res = await ScheduledTasks.shouldRunToday('ilovetv');
        expect(res).toBeTruthy();
      });

      it('should return false when outside ranger 16:00 to 4:00 UTC', async () => {
        jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 7, 30, 0, 0)));
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        DailyTask.findOneAndUpdate.mockResolvedValue(
          { taskType: 'ilovetv', lastExecuted: yesterday, executionDay: yesterdayString }
        );

        const res = await ScheduledTasks.shouldRunToday('ilovetv');
        expect(res).toBeFalsy();
      });
    });

    describe('getDailyMessageId', () => {
      it('should return the correct messageId for default value', async () => {
        DailyTask.findOneAndUpdate.mockResolvedValue(
          { taskType: 'ilovetv', messageId: "123" }
        );
        const messageId = await ScheduledTasks.getDailyMessageId();
        expect(messageId).toEqual("123");
      });

      it('should return null messageId if none exists', async () => {
        DailyTask.findOneAndUpdate.mockResolvedValue(
          { taskType: 'birthday', messageId: null }
        );
        const messageId = await ScheduledTasks.getDailyMessageId('birthday');
        expect(messageId).toEqual(null);
      });
    });
  });

  describe('schedulerHelpers.js', () => {
    describe('sameMonthAndDay', () => {
      it('should return true if two dates are the same', () => {
        const date1 = new Date();
        const date2 = new Date(date1);
        expect(schedulerHelpers.sameMonthAndDay(date1, date2)).toBeTruthy();
      });

      it('should return true if the same date is explicitly used', () => {
        const date = new Date();
        expect(schedulerHelpers.sameMonthAndDay(date, date)).toBeTruthy();
      });

      it('should return false if two dates are not the same', () => {
        const date1 = new Date();
        let date2 = new Date();
        date2.setDate(date2.getDate() + 1);
        expect(schedulerHelpers.sameMonthAndDay(date1, date2)).toBeFalsy();
      });

      it('should return false if dates are not given', () => {
        const date1 = "this is not a date";
        const date2 = 100;
        expect(schedulerHelpers.sameMonthAndDay(date1, date2)).toBeFalsy();
        expect(schedulerHelpers.sameMonthAndDay(null, null)).toBeFalsy();
      });
    });

    describe('getTodaysBirthdays', () => {
      const today = new Date();
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)

      it('should return empty array if there are no birthdays that day', async () => {
        Profile.find.mockResolvedValue([
          { id: 'test', birthday: yesterday },
          { id: 'test2', birthday: yesterday }
        ]);
        const birthdays = await schedulerHelpers.getTodaysBirthdays(today);
        expect(birthdays).toEqual([]);
        expect(birthdays).toHaveLength(0);
      });

      it('should return a birthday when there is a birthday that day', async () => {
        Profile.find.mockResolvedValue([
          { id: 'test', birthday: today },
          { id: 'test2', birthday: yesterday }
        ]);
        const birthdays = await schedulerHelpers.getTodaysBirthdays(today);
        expect(birthdays).not.toEqual([]);
        expect(birthdays).toHaveLength(1);
      });

      it('should return multiple birthdays when there are multiple birthdays that day', async () => {
        Profile.find.mockResolvedValue([
          { id: 'test', birthday: today },
          { id: 'test2', birthday: today }
        ]);
        const birthdays = await schedulerHelpers.getTodaysBirthdays(today);
        expect(birthdays).not.toEqual([]);
        expect(birthdays).toHaveLength(2);
      });
    });

    describe('toCST', () => {
      it('should return UTC to correct CST timestamp for logging', () => {
        const date1 = new Date(Date.UTC(2024, 0, 15, 7, 30, 0, 0));
        const date2 = new Date(Date.UTC(2024, 0, 15, 9, 0, 0, 0));
        const date3 = new Date(Date.UTC(2024, 0, 15, 2, 20, 20, 0));
        const date4 = new Date(Date.UTC(2024, 0, 15, 16, 45, 0, 0));
        expect(schedulerHelpers.toCST(date1)).toBe("1:30:00 AM CST");
        expect(schedulerHelpers.toCST(date2)).toBe("3:00:00 AM CST");
        expect(schedulerHelpers.toCST(date3)).toBe("8:20:20 PM CST");
        expect(schedulerHelpers.toCST(date4)).toBe("10:45:00 AM CST");
      }); 
    });
  });
});