const { SlashCommandBuilder } = require("discord.js");
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
    const profile = await profileService.find(interaction.user.id);
    const points = interaction.options.getInteger('points');

    // TODO: Verify (points >= 100) else return

    // TODO: Verify (profile.points >= points) else return

    // TODO: Calculate item rarity based on points
    // const rarity = calculateRarity(); 
    const rarity = 'common'; // REMOVE LATER

    const prizeService = new PrizeService();
    prizeService.getRandomPrize(rarity);

    // TODO: Format response with embed usage to show prize.image, name, description, etc.

    profile.points - points;
    profile.inventory.push(prize);
    profile.save();
  },
};
