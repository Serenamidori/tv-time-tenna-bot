const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { profileService, PrizeService } = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gacha')
    .setDescription('Welcome to BALL MACHINE. Insert points to gain PRIZES.')
    .addIntegerOption(option =>
      option
          .setName('points')
          .setDescription('How many points will you insert?')
          .setRequired(true)
          .setMinValue(100)
    ),
  async execute(interaction) {
    const points = interaction.options.getInteger('points');
    const profile = await profileService.find(interaction.user.id);

    if (points < 100) {
      await interaction.reply(`Whoops! Not sure how you did that, but you have to insert at least 100 points!`);
      return;
    } else if (profile.points < points) {
      await interaction.reply(`Uh oh! Looks like you don't have enough points for that!\n-# _(Have you done your quizzes today?)_`);
      return;
    }

    const prizeService = new PrizeService();
    const probabilities = calculateProbabilities(points); 
    const rarity = selectRarity(probabilities);
    const prize = prizeService.getRandomPrize(rarity);
    const prizeText = rarity == 'legendary' ? '<:grandprize1:1446237435007733841><:grandprize2:1446237435481686198><:grandprize3:1446237437515923476><:grandprize4:1446237438589796455><:grandprize5:1446237439747297462><:grandprize6:1446237440523239495>' : '<:prize1:1464292019974308018><:prize2:1464292021958217923><:prize3:1464292024130867393>';

    const imagePath = path.resolve(__dirname, `../../assets/gacha/${prize.image}`);
    const attachment = new AttachmentBuilder(imagePath, { name: `${prize.image}` });
    const embed = new EmbedBuilder()
      .setColor(0xFF362C)
      .setDescription(`## Your ${prizeText} is "${prize.name}"!\n-# ${prize.description}`)
      .setImage(`attachment://${attachment.name}`);
    
    await interaction.reply({ embeds: [embed], files: [attachment] });

    profile.points = profile.points - points;
    profile.inventory.push(prize);
    profile.save();
  },
};

function calculateProbabilities(points) {
  const rarity = {
    common: 0.5,
    uncommon: 0.3,
    rare: 0.15,
    veryRare: 0.04,
    legendary: 0.01
  };

  const scaleFactor = Math.min(1, points / 500);

  const rawProbabilities = {
    common: rarity.common * (1 - scaleFactor),
    uncommon: rarity.uncommon * (1 - scaleFactor),
    rare: rarity.rare + (rarity.rare * scaleFactor),
    veryRare: rarity.veryRare + (rarity.veryRare * scaleFactor * 2),
    legendary: rarity.legendary + (rarity.legendary * scaleFactor * 3)
  };

  const total = Object.values(rawProbabilities).reduce((sum, prob) => sum + prob, 0);
  let normalizedProbabilities = {};
  for (const [key, value] of Object.entries(rawProbabilities)) {
    normalizedProbabilities[key] = value / total;
  }

  return normalizedProbabilities;
}

function selectRarity(probabilities) {
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (const [rarity, probability] of Object.entries(probabilities)) {
    cumulativeProbability += probability;
    if (randomNumber <= cumulativeProbability) {
      return rarity;
    }
  }
  return Object.keys(probabilities)[Object.keys(probabilities).length - 1];
}
