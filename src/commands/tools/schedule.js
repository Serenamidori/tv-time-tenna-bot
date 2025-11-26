const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Planning something fun? Give me all the details!"),
  async execute(interaction) {
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
