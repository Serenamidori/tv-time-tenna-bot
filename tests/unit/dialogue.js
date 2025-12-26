const handler = require('../../src/features/conversation/handler.js'); 

describe('Dialogue Handler Tests', () => {
  describe('Tier 12 Regex Pattern Matching', () => {
    it('should correctly detect greetings', () => {
      const examples = ['Hi Tenna!!', 'Hello', 'Yoooo Tenna!!!', 'yo', 'heyyyyyaa', 'Heyyyy', 'hiiii mr tenna', 'hewwo'];
      for (const content of examples) {
        expect(handler.detectIntent(content)).toBe('greeting');
      }
    });

    it('should correctly detect goodbyes', () => {
      const examples = ['byeee tennaaaa', 'byyyeee', 'good bye', 'seeyaa', 'bye byeee'];
      for (const content of examples) {
        expect(handler.detectIntent(content)).toBe('goodbye');
      }
    });

    it('should correctly detect goodnights', () => {
      const examples = ['nighty night', 'good night', "g'night tenna!", 'nighttttt', 'niiiiight', 'sleep tight tenna!', 'have a good night tenna!', 'night night!', 'nini!'];
      for (const content of examples) {
        expect(handler.detectIntent(content)).toBe('goodnight');
      }
    });

    it('should correctly detect goodMorning', () => {
      const examples = ['good morning!!', 'morning tenna!!', "g'morning tenna", "mornin'", 'morning', 'gm', 'rise and shine tenna!'];
      for (const content of examples) {
        expect(handler.detectIntent(content)).toBe('goodMorning');
      }
    });
  });
});
