const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Quiz Time! Think you can handle it?"),
  async execute(interaction) {
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
