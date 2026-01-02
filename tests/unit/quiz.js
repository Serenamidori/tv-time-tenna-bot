const quizHelpers = require('../../src/utils/quizHelpers.js'); 

jest.useFakeTimers();

describe('Quiz Command Tests', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getWaitMessage', () => {
    const lastQuizAt = new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0));

    it('should tell the user they have 24 hours left for new quizzes', () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 15, 17, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", lastQuizAt);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 24 hours, superstar!");
    });

    it('should tell the user they have 4 hours left for new quizzes', () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 13, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", lastQuizAt);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 4 hours, superstar!");
    });


    it('should tell the user they have 1 hour left for new quizzes', () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 16, 30, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", lastQuizAt);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 1 hour, superstar!");
    });

    it('should tell the user they have 30 minutes left for new quizzes', () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 17, 0, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", lastQuizAt);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 30 minutes, superstar!");
    });

    it('should tell the user they have 1 minute left for new quizzes', () => {
      jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2024, 0, 16, 17, 29, 0, 0)));
      const res = quizHelpers.getWaitMessage("Gab", lastQuizAt);
      expect(res).toBe("Whoops! Sorry Gab, but you've already done your 6 quizzes today! Try again in 1 minute, superstar!");
    });
  });
});