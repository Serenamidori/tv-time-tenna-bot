const handler = require('../../src/features/conversation/handler.js'); 

describe('Dialogue Handler Tests:', () => {
  describe('regex pattern matching', () => {
    it('should correctly handle greetings', () => {
      const res = handler.detectIntent('hello');
      expect(res).toBe('greeting');
    });
  });
});
