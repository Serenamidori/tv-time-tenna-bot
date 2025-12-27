const handler = require('../../src/features/conversation/handler.js'); 
const examples = [
  ['goodMorning', 'good morning!!'],
  ['goodMorning', 'morning tenna!!'],
  ['goodMorning', "g'morning tenna"],
  ['goodMorning', 'morning'],
  ['goodMorning', "mornin'"],
  ['goodMorning', 'morning'],
  ['goodMorning', 'gm'],
  ['goodMorning', 'rise and shine tenna!'],
  ['goodnight', 'nighty night'],
  ['goodnight', 'good night'],
  ['goodnight', "g'night tenna!"],
  ['goodnight', 'nighttttt'],
  ['goodnight', 'niiiiight'],
  ['goodnight', 'sleep tight tenna!'],
  ['goodnight', 'have a good night tenna!'],
  ['goodnight', 'night night!'],
  ['goodnight', 'nini!'],
  ['goodbye', 'byeee tennaaaa'],
  ['goodbye', 'byyyeee'],
  ['goodbye', 'good bye'],
  ['goodbye', 'goodbye'],
  ['goodbye', 'seeyaa'],
  ['goodbye', 'bye byeee'],
  ['greeting', 'Hi Tenna!!'],
  ['greeting', 'Hello'],
  ['greeting', 'Yoooo Tenna!!!'],
  ['greeting', 'yo'],
  ['greeting', 'heyyyyyaa'],
  ['greeting', 'Heyyyy'],
  ['greeting', 'hiiii mr tenna'],
  ['greeting', 'hewwo']
]

describe('Dialogue Handler Tests', () => {
  for (const content of examples) {
    it(`should correctly detect "${content[1]}" as ${content[0]}`, () => {
      expect(handler.detectIntent(content[1])).toBe(content[0]);
    });
  }
});