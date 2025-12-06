const { setTimeout } = require('timers/promises');
const triggers = require('./triggers');
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
  const response = getRandomResponse(detectIntent(content), name);
  const typingDelay = Math.min(response.length * 50, 4000); // He's gotta have subtle boomer typing speed

  await message.channel.sendTyping();
  await setTimeout(typingDelay);
  await message.reply(response);
}

async function isReplyToTenna(message, bot) {
  if (message.reference != null) {
    const referenceMessage = await message.channel.messages.fetch(message.reference.messageId);
    return referenceMessage.author.id === bot.user.id;
  } else {
    return false;
  }
};

function detectIntent(content) {
  if (content.length === 0) return 'empty';
  if (triggers.offLimits.some(word => content.toLowerCase().includes(word))) { return 'offLimits' };
  if (triggers.quizCommand.test(content)) return 'quizCommand';
  if (triggers.balanceCommand.test(content)) return 'balanceCommand';
  if (triggers.introduceCommand.test(content)) return 'introduceCommand';
  if (triggers.scheduleCommand.test(content)) return 'scheduleCommand';
  if (triggers.pipisMention.test(content)) return 'pipisMention';
  if (triggers.emailMention.test(content)) return 'emailMention';
  if (triggers.krisMention.test(content)) return 'krisMention';
  if (triggers.susieMention.test(content)) return 'susieMention';
  if (triggers.ralseiMention.test(content)) return 'ralseiMention';
  if (triggers.torielMention.test(content)) return 'torielMention';
  if (triggers.familyMention.test(content)) return 'familyMention';
  if (triggers.mikeMention.test(content)) return 'mikeMention';
  if (triggers.mettatonMention.test(content)) return 'mettatonMention';
  if (triggers.workersMention.test(content)) return 'workersMention';
  if (triggers.laninoElninaMention.test(content)) return 'laninoElninaMention';
  if (triggers.spamtonMention.test(content)) return 'spamtonMention';
  if (triggers.knightMention.test(content)) return 'knightMention';
  if (triggers.lancerMention.test(content)) return 'lancerMention';
  if (triggers.queenMention.test(content)) return 'queenMention';
  if (triggers.whoMention.test(content)) return 'whoMention';
  if (triggers.insultOld.test(content)) return 'insultOld';
  if (triggers.insultShutUp.test(content)) return 'insultShutUp';
  if (triggers.insult.test(content)) return 'insult';
  if (triggers.loveFans.test(content)) return 'loveFans';
  if (triggers.compliment.test(content)) return 'compliment';
  if (triggers.dontWorry.test(content)) return 'dontWorry';
  if (triggers.youllSee.test(content)) return 'youllSee';
  if (triggers.userVenting.test(content)) return 'userVenting';
  if (triggers.userFeelingGood.test(content)) return 'userFeelingGood';
  if (triggers.userFeelingBad.test(content)) return 'userFeelingBad';
  if (triggers.userDayGood.test(content)) return 'userDayGood';
  if (triggers.userDayBad.test(content)) return 'userDayBad';
  if (triggers.selfQuestionWho.test(content)) return 'selfQuestionWho';
  if (triggers.selfQuestionHow.test(content)) return 'selfQuestionHow';
  if (triggers.selfQuestionWhatsUp.test(content)) return 'selfQuestionWhatsUp';
  if (triggers.selfQuestionWhat.test(content)) return 'selfQuestionWhat';
  if (triggers.selfQuestionLike.test(content)) return 'selfQuestionLike';
  if (triggers.selfQuestionOpinion.test(content)) return 'selfQuestionOpinion';
  if (triggers.tvQuestionTVTime.test(content)) return 'tvQuestionTVTime';
  if (triggers.tvQuestionWhen.test(content)) return 'tvQuestionWhen';
  if (triggers.tvQuestionRating.test(content)) return 'tvQuestionRating';
  if (triggers.tvQuestionWhat.test(content)) return 'tvQuestionWhat';
  if (triggers.tvQuestionHow.test(content)) return 'tvQuestionHow';
  if (triggers.thankYou.test(content)) return 'thankYou';
  if (triggers.goodMorning.test(content)) return 'goodMorning';
  if (triggers.goodnight.test(content)) return 'goodnight';
  if (triggers.goodbye.test(content)) return 'goodbye';
  if (triggers.greeting.test(content)) return 'greeting';
  return 'fallback';
}

function getRandomResponse(intent, name) {
  const pool = responses[intent];
  let line = pool[Math.floor(Math.random() * pool.length)];
  return line.replace('{user}', name);
}

module.exports = { handleDialogue };