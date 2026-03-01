const { quizHelpers } = require('../../src/utils');

jest.useFakeTimers();

describe('Quiz Command Tests', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getWaitMessage', () => {
    const timezone = "America/Chicago";

    it('should tell the user they have 24 hours left for new quizzes (UTC)', () => {
      // UTC: January 15, 2024 at 12:00 AM | CST: January 14, 2024 at 6:00 PM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", null);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 24 hours, superstar!");
    });

    it('should tell the user they have 6 hours left for new quizzes (UTC)', () => {
      // UTC: January 15, 2024 at 5:30 PM | CST: January 15, 2024 at 11:30 AM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", "");
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 6 hours, superstar!");
    });

    it('should tell the user they have 12 hours left for new quizzes (CST)', () => {
      // UTC: January 15, 2024 at 5:30 PM | CST: January 15, 2024 at 11:30 AM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", timezone);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 12 hours, superstar!");
    });

    it('should tell the user they have 4 hours left for new quizzes (CST)', () => {
      // UTC: January 16, 2024 at 2:00 AM | CST: January 15, 2024 at 8:00 PM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 2, 0, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", timezone);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 4 hours, superstar!");
    });

    it('should tell the user they have 1 hour left for new quizzes (CST)', () => {
      // UTC: January 16, 2024 at 5:00 AM | CST: January 15, 2024 at 11:00 PM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 5, 0, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", timezone);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 1 hour, superstar!");
    });

    it('should tell the user they have 30 minutes left for new quizzes (CST)', () => {
      // UTC: January 16, 2024 at 5:30 AM | CST: January 15, 2024 at 11:30 PM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 5, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", timezone);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 30 minutes, superstar!");
    });

    it('should tell the user they have 1 minute left for new quizzes (CST)', () => {
      // UTC: January 16, 2024 at 5:59 AM | CST: January 15, 2024 at 11:59 PM
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 5, 59, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", timezone);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 1 minute, superstar!");
    });
  });
});