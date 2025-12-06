const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, } = require("discord.js");
const utils = require("../../utils");
const api = require("../../api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Quiz Time! Think you can handle it?")
    .addStringOption((option) =>
      option
        .setName("difficulty")
        .setDescription("Want a real challenge?")
        .setRequired(true)
        .addChoices(
          { name: "Easy", value: "easy" },
          { name: "Medium", value: "medium" },
          { name: "Hard", value: "hard" }
        )
    ),
  async execute(interaction) {
    const profile = await utils.profile.find(interaction.user.id);
    const name = utils.profile.getName(interaction, profile);
    const count = quizCount(profile);
    if (count >= 3) {
      await interaction.reply(`Whoops! Sorry ${name}, but you've already done 3 quizzes today! Try again tomorrow, superstar!`);
    } else {
      const difficulty = interaction.options.getString("difficulty") || 2;
      const question = await getQuestion(difficulty);
      if (question == null) {
        await interaction.reply(`...Uh, looks like we're experiencing some technical difficulties! Why don't you try again in just a sec?\n-# _(Mike, where did the trivia go!? ... Well, go find some more! And hurry!!)_`);
      } else {
        const answers = formatAnswers(question);
        let points = 5;
        if (difficulty == "medium") {
          points = points * 2;
        } else if (difficulty == "hard") {
          points = points * 3;
        }

        const embed = new EmbedBuilder()
          .setColor(0x00a7fe)
          .setTitle(`QUIZ #${count + 1} FOR ${name.toUpperCase()} [${points} POINTS]`)
          .setDescription(question.question.text);

        const buttonA = new ButtonBuilder()
          .setCustomId(answers[0].correct)
          .setLabel(answers[0].text)
          .setStyle(ButtonStyle.Secondary);

        const buttonB = new ButtonBuilder()
          .setCustomId(answers[1].correct)
          .setLabel(answers[1].text)
          .setStyle(ButtonStyle.Secondary);

        const buttonC = new ButtonBuilder()
          .setCustomId(answers[2].correct)
          .setLabel(answers[2].text)
          .setStyle(ButtonStyle.Secondary);

        const buttonD = new ButtonBuilder()
          .setCustomId(answers[3].correct)
          .setLabel(answers[3].text)
          .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(buttonA, buttonB, buttonC, buttonD);

        const sentQuiz = await interaction.reply({
          embeds: [embed],
          components: [row],
        });

        const collector = sentQuiz.createMessageComponentCollector({
          componentType: ComponentType.Button,
          filter: (i) => i.user.id === interaction.user.id,
        });

        collector.on("collect", async (selection) => {
          if (selection.customId == "correct") {
            await selection.reply(randomCorrectLine() + ` [+${points} POINTS]`);
            utils.points.give(selection.user.id, points);
          } else {
            await selection.reply(randomIncorrectLine());
          }

          profile.quizCount = count + 1;
          profile.lastQuizAt = new Date();
          profile.save();

          const disabledRow = new ActionRowBuilder().addComponents(
            buttonA.setDisabled(true).setStyle(answers[0].correct === "correct" ? ButtonStyle.Success : ButtonStyle.Secondary),
            buttonB.setDisabled(true).setStyle(answers[1].correct === "correct" ? ButtonStyle.Success : ButtonStyle.Secondary),
            buttonC.setDisabled(true).setStyle(answers[2].correct === "correct" ? ButtonStyle.Success : ButtonStyle.Secondary),
            buttonD.setDisabled(true).setStyle(answers[3].correct === "correct" ? ButtonStyle.Success : ButtonStyle.Secondary)
          );

          await sentQuiz.edit({
            embeds: [embed],
            components: [disabledRow],
          });

          collector.stop();
        });
      }
    }
  },
};

async function getQuestion(difficulty) {
  let questions = await api.trivia.getQuestion(difficulty);

  if (answersTooLong(questions[0])) {
    for (let i = 0; i < 3; i++) {
      questions = await api.trivia.getQuestion(difficulty);
      if (!answersTooLong(questions[0])) {
        return questions[0];
      }
    }
    return null;
  } else {
    return questions[0];
  }
}

function formatAnswers(question) {
  let answers = [
    { text: question.correctAnswer, correct: "correct" },
    { text: question.incorrectAnswers[0], correct: "incorrect0" },
    { text: question.incorrectAnswers[1], correct: "incorrect1" },
    { text: question.incorrectAnswers[2], correct: "incorrect2" },
  ];

  return utils.random.shuffle(answers);
}

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

function answersTooLong(question) {
  return (
    question.correctAnswer.length > 80 ||
    question.incorrectAnswers[0].length > 80 ||
    question.incorrectAnswers[1].length > 80 ||
    question.incorrectAnswers[2].length > 80
  );
}

function randomCorrectLine() {
  return correctLines[utils.random.rand(correctLines.length)-1];
}

function randomIncorrectLine() {
  return incorrectLines[utils.random.rand(incorrectLines.length)-1];
}

// dialogue
const correctLines = [
  `That's exactly right!`,
  `That's correct!`,
  `Haha, that's right!`,
];

const incorrectLines = [
  `Aaand that's the wrong answer. Let's hear some boo's, folks!\n-# _(Just kidding! Force of habit!)_`,
  `Sorry, that's the wrong answer. Try again next time!`,
  `Seems you've chosen the wrong answer. You'll get 'em next time!`
];