const { SlashCommandBuilder } = require("discord.js");
const { profileService, mikeService } = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Want to see all the cool things you've collected?"),
  async execute(interaction) {
    const profile = await profileService.find(interaction.user.id);
    const name = profileService.getName(interaction, profile);

    await interaction.reply(`Mike! ${name}, would like to see their inventory!`);
    mikeService.getInventory(interaction, profile, name);
  },
};
