const cron = require('node-cron');
const utils = require("../../utils");
const { setTimeout } = require("timers/promises");
const lovesTvPattern = /\b(i do|we do|me|indeed|ye+s|yea+h)\b|\b(i|we|i really|we really)?\s+(lo+ve|lu+v|like|enjoy)\s+(tv|television|watching tv)\b/i;
let dailyMessageId = null;

module.exports = async (bot) => {
  let respondedUsers = new Set();

  cron.schedule('0 10 * * *', async () => {
    const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
    const randomDelayMs = Math.floor(Math.random() * 43200000); // 43200000 ms = 12 hours
    const delayHours = Math.floor(randomDelayMs / 3600000);
    const delayMins = Math.floor((randomDelayMs % 3600000) / 60000);
    console.log(`📋 ilovetvcheck will occur in: ${delayHours}h ${delayMins}m`);

    await setTimeout(randomDelayMs);

    await channel.sendTyping();
    await setTimeout(3000);
    const sentMessage = await channel.send(lines[utils.random.rand(lines.length)-1]);
    dailyMessageId = sentMessage.id;
    respondedUsers.clear();
  }, {
    timezone: 'America/Chicago'
  });

  console.log('📋 ilovetvcheck job registered (runs daily at 10 AM CST + random delay)');

  bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (message.reference?.messageId === dailyMessageId) {
      let response = null

      if (lovesTvPattern.test(message.content)) {
        response = thanks[utils.random.rand(thanks.length)-1];

        if (!respondedUsers.has(message.author.id)) {
          response += " [+15 POINTS]"
          utils.points.give(message.author.id, 15)
          respondedUsers.add(message.author.id);
        };

      } else {
        response = {content: nope[utils.random.rand(nope.length)-1], ephemeral: true};
      }
      await message.reply(response);
    }
  });
};

module.exports.getDailyMessageId = () => dailyMessageId;

// dialogue
const lines = [
  'Hey folks! Just popping in to ask, do you _love_ TV?',
  'At Everyone! Do you love TV?\n-# _(... did I do that right?)_',
  'Quick! Someone reply with "I Love TV!"\n-# _(... please?)_',
  `I Love TV. That's all you gotta say.`,
  'Hey! Who here loves TV?',
  `Got some points with _your_ name on them if you reply with "I Love TV"!`,
  '-# ...does anyone love TV...?',
  'Do _you_ love TV? I bet you do!',
  `Let's all shout "I Love TV"! Don't be shy now!`
];

const thanks = [
  `Yes, you _do_ love TV, don't you?`,
  `That's CORRECT!`,
  'I could hear that 99 more times!',
  `Haha, that's right!`,
  '<:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360>',
  'You really <:love1:1443452223387340984><:love2:1443452224029065276> TV? I knew it!'
];

const nope = [
  `That's the wrong answer!`,
  `Hmm, that doesn't sound quite right...`,
  `Sorry, what was that?! Couldn't hear you!`,
  'I must not have heard you right. You meant to say "I love TV" right?',
  'Ooh, so close. But, not really. Try again!'
];