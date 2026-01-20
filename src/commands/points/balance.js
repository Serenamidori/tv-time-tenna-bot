const { SlashCommandBuilder } = require("discord.js");
const { profileService, mikeService } = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Ready to see how many points you've racked up?"),
  async execute(interaction) {
    const profile = await profileService.find(interaction.user.id);
    const name = profileService.getName(interaction, profile);

    await interaction.reply(`Mike! Fetch ${name}'s points, please!`);
    mikeService.getPoints(interaction, profile, name);
  },
};
