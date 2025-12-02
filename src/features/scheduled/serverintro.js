// cron job is TEMPORARY, to be removed Sunday, Dec. 7th
const { setTimeout } = require('timers/promises');
const cron = require('node-cron');
const utils = require("../../utils");

module.exports = async (bot) => {
  cron.schedule('0 14 6 12 *', async () => { //'0 14 6 12 *'
    const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
    const typingDelay = 9000 // 30 seconds of Tenna typing

    await channel.sendTyping();
    await setTimeout(typingDelay);
    await channel.send(tennaIntro);

    await setTimeout(2000);
    mikeMessage = utils.mike.getMikeMessage(0, mikeTitle, mikeIntro);
    await channel.send(mikeMessage);
  });

  console.log('📋 serverintro job registered (will run at 2pm CST on Saturday, Dec. 6th)');
};

const tennaIntro = `### GREETINGS EVERYONE!
It's wonderful to meet you all! I'm the one and only Mr. (Ant) Tenna, host of <:show1:1445469367654416435><:show2:1445469370494222549><:show3:1445469372884979764>!!
-# _(But I'm sure you knew that already!)_

I was invited to this server to meet and talk with fans! I've been told you're all <:stars1:1445470913641316502><:stars2:1445470915356917881><:stars3:1445470916992569494> here, so one more wouldn't hurt, right? Especially a **TV STAR** like myself!!

Mike's helping me figure out this 'Discord' thing! According to him, I'm only allowed in the <:greenroom1:1444090419364364330><:greenroom2:1444090420102697083><:greenroom3:1444090421163589737><:greenroom4:1444090422040465639><:greenroom5:1444090422820606033>... But hey!! I'm gonna get the hang of it, don't you worry!! I'm still hip and new!! And I'm ready to host quiz games, award points, and just "hang out"!!!

Sincerely.
Tenna 8>[^D]
-# _(Look! It's a little me!)_`;

const mikeTitle = `Motormouth Mike here! Listen up!`;

const mikeIntro = `I don't want to see anyone treating Tenna badly!
No pestering, no pressuring, no teasing, no ribbing, no cussing, no fussing!

I've seen what some of you say in this server! And some things you haven't said! So just treat Tenna with respect, got it??

Good! Now uh, have fun!!`;