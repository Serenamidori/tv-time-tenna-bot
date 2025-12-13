const { setTimeout } = require('timers/promises');
const { tiers } = require('./triggers');
const responses = require('./responses');
const utils = require("../../utils");
const { getDailyMessageId } = require('../scheduled/ilovetvcheck');

async function handleDialogue(message, bot) {
  const profile = await utils.profile.find(message.author.id);
  const name = utils.profile.getName(message, profile);
  const isMention = message.mentions.has(bot.user.id);
  const isReply = await isReplyToTenna(message, bot);

  if (!isMention && !isReply) return;
  if (message.reference?.messageId === getDailyMessageId()) return;
  
  const content = message.content.replace(/<@!?(\d+)>/g, '').trim();
  const intent = detectIntent(content);
  const response = getRandomResponse(intent, name);
  const typingDelay = Math.min(response.length * 50, 4000);

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


module.exports = { handleDialogue };