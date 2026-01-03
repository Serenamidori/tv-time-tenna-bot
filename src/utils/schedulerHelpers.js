function iLoveTVMessage() {
  const lines = [
    'Hey folks! Just popping in to ask, do you _love_ TV?',
    'At Everyone! Do _you_ love TV?\n-# _(... did I do that right??)_',
    'Quick! Someone reply with "I Love TV!"\n-# _(... please?)_',
    `"I Love TV". That's all you gotta say.`,
    'Hey, friends and fans! Who here loves TV??',
    `Got some points with _your_ name on them if you reply with "I Love TV"!`,
    '-# _...does anyone love TV...?_',
    'Do _you_ love TV? I bet you do! Reply with "I Love TV"!!',
    `Let's all shout "I Love TV"! Don't be shy now!`
  ];

  return lines[utils.random.rand(lines.length)-1];
}

function tennaThankYouMessage() {
  const lines = [
    `Yes, you _do_ love TV, don't you?`,
    `That's CORRECT!`,
    'I could hear that 99 more times!',
    `Haha, that's right!`,
    '<:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360>',
    'You really <:love1:1443452223387340984><:love2:1443452224029065276> TV? I knew it!'
  ];

  return lines[utils.random.rand(lines.length)-1];
}

function tennaNopeMessage() {
  const lines = [
    `That's the wrong answer!`,
    `Hmm, that doesn't sound quite right...`,
    `Sorry, what was that?! Couldn't hear you!`,
    'I must not have heard you right. You meant to say "I love TV" right?',
    'Ooh, so close. But, not really. Try again!'
  ];

  return lines[utils.random.rand(lines.length)-1];
}

function happyBirthdayMessage(birthdays) {
  const lines = [
    `<:breaking1:1446597036601507840><:breaking2:1446597037486375113><:breaking3:1446597038639681628><:breaking4:1446597046290350151><:breaking5:1446597047615754280> We've got a birthday today! Happy Birthday {users}!`,
    `Hope you have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
    `Hey {users}! Are you having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
    `Oh {users}, I hope you're having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
  ];
  const linesPlural = [
    `<:breaking1:1446597036601507840><:breaking2:1446597037486375113><:breaking3:1446597038639681628><:breaking4:1446597046290350151><:breaking5:1446597047615754280> We've got some birthdays today! Happy Birthday {users}!`,
    `Hope you all have an <:amazing1:1443408304779952139><:amazing2:1443408305971138611><:amazing3:1443408306767921313><:amazing4:1443408307514511360> birthday {users}!`,
    `Hey {users}! Are you all having <:fun1:1444090417078341723><:fun2:1444090418127048734> on your birthday? I hope you are!`,
    `Oh {users}, I hope you're all having a <:lovely1:1444089294154109049><:lovely2:1444089295521710231> birthday today!`
  ];

  let userIds = birthdays.map(profile => `<@!${profile.id}>`);
  let line = "";

  if (userIds.length > 1) {
    line = linesPlural[utils.random.rand(linesPlural.length)-1]
  } else {
    line = lines[utils.random.rand(lines.length)-1]
  }

  return line.replace('{users}', userIds.join(' '));
}

function toCST(today) {
  return today.toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
}

async function getTodaysBirthdays(today) {
  const all = await utils.profile.all();
  return all.filter(profile => profile.birthday != null && this.sameMonthAndDay(profile.birthday, today));
}

function sameMonthAndDay(date1, date2) {
  const month1 = date1.getMonth();
  const day1 = date1.getDate();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  return month1 == month2 && day1 == day2;
}

module.exports = {
  iLoveTVMessage,
  tennaThankYouMessage,
  tennaNopeMessage,
  happyBirthdayMessage,
  getTodaysBirthdays,
  sameMonthAndDay,
  toCST
};