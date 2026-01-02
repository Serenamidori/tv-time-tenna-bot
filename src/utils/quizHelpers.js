function quizCount(profile) {
  if (profile.quizCount != null) {
    if (profile.lastQuizAt != null && isToday(profile.lastQuizAt)) {
      return profile.quizCount;
    }
  }
  return 0;
}

function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
}

function getWaitMessage(name, lastQuizAt) {
  const today = new Date();
  const target = new Date(lastQuizAt);
  target.setDate(target.getDate() + 1);

  const timeDifference = target.getTime() - today.getTime();
  const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
  const minsLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
  let timeStr;
  if (hoursLeft > 0) {
    timeStr = `${hoursLeft} ${hoursLeft == 1 ? 'hour' : 'hours'}`;
  } else if (minsLeft > 0) {
    timeStr = `${minsLeft} ${minsLeft == 1 ? 'minute' : 'minutes'}`;
  } else {
    timeStr = 'less than a minute';
  }

  return `Whoops! Sorry ${name}, but you've already done your 6 quizzes today! Try again in ${timeStr}, superstar!`;
}

function answersTooLong(question) {
  return (
    question.correctAnswer.length > 80 ||
    question.incorrectAnswers[0].length > 80 ||
    question.incorrectAnswers[1].length > 80 ||
    question.incorrectAnswers[2].length > 80
  );
}

function randomCorrectLine() {
  const correctLines = [
    `That's exactly right!`,
    `That's correct!`,
    `Haha, that's right!`,
  ];
  return correctLines[Math.floor(Math.random() * correctLines.length)];
}

function randomIncorrectLine() {
  const incorrectLines = [
    `Aaand that's the wrong answer. Let's hear some boo's, folks!\n-# _(Just kidding! Force of habit!)_`,
    `Sorry, that's the wrong answer. Try again next time!`,
    `Seems you've chosen the wrong answer. You'll get 'em next time!`
  ];
  return incorrectLines[Math.floor(Math.random() * incorrectLines.length)];
}

module.exports = {
  quizCount,
  isToday,
  getWaitMessage,
  answersTooLong,
  randomCorrectLine,
  randomIncorrectLine
};