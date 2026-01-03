const { ScheduledTasks } = require('../../src/utils/scheduler'); 
const DailyTask = require('../../models/DailyTask');

jest.useFakeTimers();
jest.mock('../../models/DailyTask', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn()
}));

describe('Post Scheduler Tests', () => {
  beforeEach(() => {
    DailyTask.findOne.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('shouldRunToday', () => {
    it('should return true when within range 16:00 to 4:00 UTC', async () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0];

      DailyTask.findOneAndUpdate.mockResolvedValue([
        { taskType: 'ilovetv', lastExecuted: yesterday, executionDay: yesterdayString }
      ]);

      const res = await ScheduledTasks.shouldRunToday('ilovetv');
      expect(res).toBeTruthy();
    });

    it('should return false when outside ranger 16:00 to 4:00 UTC', async () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 7, 30, 0, 0)));
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      DailyTask.findOneAndUpdate.mockResolvedValue([
        { taskType: 'ilovetv', lastExecuted: yesterday, executionDay: yesterdayString }
      ]);

      const res = await ScheduledTasks.shouldRunToday('ilovetv');
      expect(res).toBeFalsy();
    });
  });

  // TODO: Find a way to mock Discord message send to test runTVChatMessage()
  // TODO: OR pull out functionality into helper functions to test individual parts
  // describe('runTVChatMessage', () => {
  //   it('should return true when within range 16:00 to 4:00 UTC', async () => {
  //     jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
  //     const today = new Date();
  //     let yesterday = new Date();
  //     yesterday.setDate(yesterday.getDate() - 1)
  //     const todayString = today.toISOString().split('T')[0];
  //     const yesterdayString = yesterday.toISOString().split('T')[0];

  //     DailyTask.findOne.mockResolvedValue([
  //       { taskType: 'ilovetv', lastExecuted: yesterday, executionDay: yesterdayString }
  //     ]);
  //     DailyTask.findOneAndUpdate.mockResolvedValue([
  //       { taskType: 'ilovetv', lastExecuted: today, executionDay: todayString }
  //     ]);

  //     const res = await ScheduledTasks.shouldRunToday('ilovetv');
  //     expect(DailyTask.findOne).toHaveBeenCalled();
  //     expect(res).toBeTruthy();
  //   });
  // });

});