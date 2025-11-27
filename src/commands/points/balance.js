const { SlashCommandBuilder } = require("discord.js");
const utils = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Ready to see how many points you've racked up?"),
  async execute(interaction) {
    const profile = await utils.profile.find(interaction.user.id);
    const name = utils.profile.getName(interaction, profile);

    await interaction.reply(`Mike! Fetch ${name}'s points, please!`);
    utils.mike.getPoints(interaction, profile, name);
  },
};
