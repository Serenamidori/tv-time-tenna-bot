const cron = require('node-cron');
const utils = require("../../utils");

module.exports = async (bot) => {
  let birthdays = [];

  cron.schedule('0 10 * * *', async () => {
    const channel = await bot.channels.fetch(process.env.GENERAL_CHAT);
    const all = await utils.profile.all();
    const today = new Date();
    birthdays = all.filter(profile => profile.birthday != null && sameMonthAndDay(profile.birthday, today));

    if (birthdays.length > 0) {
      await channel.send(happyBirthdayMessage(birthdays));
    }
      
    birthdays = [];
  });

  console.log('📋 birthday job registered (runs daily at 10 AM CST)');
};

function sameMonthAndDay(date1, date2) {
  const month1 = date1.getMonth();
  const day1 = date1.getDate();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  return month1 == month2 && day1 == day2;
}

function happyBirthdayMessage(birthdays) {
  let userIds = birthdays.map(profile => `<@!${profile.id}>`);
  let line = "";

  if (userIds.length > 1) {
    line = linesPlural[utils.random.rand(linesPlural.length)-1]
  } else {
    line = lines[utils.random.rand(lines.length)-1]
  }

  return line.replace('{users}', userIds.join(' '));
}

// dialogue
const lines = [
  `<:breaking1:1443144107777064992><:breaking2:1443144122977484854><:breaking3:1443144140329062401><:breaking4:1443144154183110798> We've got a birthday today! Happy Birthday {users}!`,
  `Hope you have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
  `Hey {users}! Are you having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
  `Oh {users}, I hope you're having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
];

const linesPlural = [
  `<:breaking1:1443144107777064992><:breaking2:1443144122977484854><:breaking3:1443144140329062401><:breaking4:1443144154183110798> We've got some birthdays today! Happy Birthday {users}!`,
  `Hope you all have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
  `Hey {users}! Are you all having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
  `Oh {users}, I hope you're all having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
];