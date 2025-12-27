const handler = require('../../src/features/conversation/handler.js'); 
const examples = [
  // tier1_blockers

  // tier2_questionsToTenna

  // tier3_commands

  // tier4_conversational

  // tier5_characters

  // tier6_otherMentions

  // tier7_compliments
  ['loveFans', 'can you say you love your fans'],
  ['loveFans', 'will you say you love us?'],
  ['loveFans', 'would you say you love your fans?'],
  ['loveFans', 'can you say you love me'],
  ['loveFans', 'can you say that you love me'],
  ['loveFans', 'do you love fans'],
  ['hugFans', 'tenna can you hug me'],
  ['hugFans', 'tenna can I get a hug?'],
  ['hugFans', 'could you hug me?'],
  ['hugFans', 'could I have a hug?'],
  ['hugFans', 'could you give me a hug?'],
  ['hugFans', 'could I get a sloppy kiss?'],
  ['hugFans', 'will you pat me'],

  // tier8_insults

  // tier9_userState

  // tier10_selfQuestions
  
  // tier11_tvQuestions
  ['tvQuestionWhen', 'when is the next show?'],
  ['tvQuestionWhen', 'what time is the next episode'],
  ['tvQuestionWhen', "when's the broadcast???"],
  ['tvQuestionWhen', 'when is tv time'],
  ['tvQuestionWhen', 'WHEN TV TIME, TENNA'],
  ['tvQuestionWhen', 'what time are you on air'],
  ['tvQuestionWhen', 'when do you go on air?'],
  ['tvQuestionRating', 'how are the ratings?'],
  ['tvQuestionRating', 'are ratings low?'],
  ['tvQuestionRating', 'are you popular?'],
  ['tvQuestionRating', 'how many fans do you have??'],
  ['tvQuestionRating', 'how well is the show going?'],
  ['tvQuestionRating', 'do you get a lot of viewers?'],
  ['tvQuestionRating', 'how is tv time'],
  ['tvQuestionWhat', 'What show do you host again?'],
  ['tvQuestionWhat', 'what is the name of your show'],
  ['tvQuestionWhat', 'which channel is your show on?'],
  ['tvQuestionWhat', 'what channel is tv time on'],
  ['tvQuestionWhat', 'what is your channel??'],
  ['tvQuestionWhat', 'which program should I watch?'],
  ['tvQuestionHow', 'how do I watch tv time??'],
  ['tvQuestionHow', 'how can I tune in'],
  ['tvQuestionHow', 'how can I find you'],
  ['tvQuestionHow', 'how watch'],
  ['tvQuestionHow', 'how do I see your show tenna??'],
  ['selfQuestionWhy', 'why are you like this'],
  ['selfQuestionWhy', 'why must you be like this'],
  ['selfQuestionWhy', 'why cant you understand me???'],
  ['selfQuestionWhy', 'why would you hurt me'],
  ['selfQuestionWhy', "why don't you hit the bricks"],
  ['selfQuestionWhy', 'whyyyyy tenna'],
  ['selfQuestionWhy', 'tenna why, just why'],
  ['selfQuestionCanYou', 'could you please stop'],
  ['selfQuestionCanYou', 'can you do a trick?'],
  ['selfQuestionCanYou', 'are you able to hang out later?'],
  ['selfQuestionCanYou', 'are you gonna chill out'],

  // tier12_greetings
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
  ['greeting', 'hewwo'],
]

describe('Dialogue Handler Tests', () => {
  for (const content of examples) {
    it(`should correctly detect "${content[1]}" as ${content[0]}`, () => {
      expect(handler.detectIntent(content[1])).toBe(content[0]);
    });
  }
});