const { setTimeout } = require('timers/promises');
const { tiers } = require('./triggers');
const responses = require('./responses');
const { profileService, pointsService } = require("../../utils");
const { DateTime } = require("luxon");

async function handleDialogue(message, bot) {
  const profile = await profileService.find(message.author.id);
  const name = profileService.getName(message, profile);
  const isMention = message.mentions.has(bot.user.id);
  const isReply = await isReplyToTenna(message, bot);
  if (!isMention && !isReply) return;

  const content = message.content.replace(/<@&1446953590458552462>|<@1443029860397219862>/g, '').trim();
  const intent = detectIntent(content);
  let response = getRandomResponse(intent, name);

  switch (intent) {
    case 'iLoveTV':
      const tz = profile.timezone || "UTC";
      const saidToday = DateTime.now().setZone(tz).hasSame(DateTime.fromJSDate(profile.lastILoveTVAt).setZone(tz), "day");
      if (!saidToday) {
        response += " [+20 POINTS]"
        pointsService.give(message.author.id, 20)
        profile.lastILoveTVAt = new Date();
        profile.save();
      }
      break;
  }

  const typingDelay = Math.min(response.length * 50, 3000);
  await message.channel.sendTyping();
  await setTimeout(typingDelay);
  await message.reply(response);
}

async function isReplyToTenna(message, bot) {
  if (message.reference != null) {
    const referenceMessage = await message.channel.messages.fetch(message.reference.messageId);
    return referenceMessage.author.id === bot.user.id;
  }
  return false;
}

function detectIntent(content) {
  if (content.length === 0) return 'empty';
  
  for (const tier of tiers) {
    for (const [intent, config] of Object.entries(tier)) {
      if (config.pattern.test(content)) {
        return intent;
      }
    }
  }
  
  return 'fallback';
}

function getRandomResponse(intent, name) {
  const pool = responses[intent];
  if (!pool) {
    console.warn(`Missing response pool for intent: ${intent}`);
    return responses.fallback[0].replace('{user}', name);
  }
  let line = pool[Math.floor(Math.random() * pool.length)];
  return line.replace('{user}', name);
}

module.exports = { detectIntent, handleDialogue };