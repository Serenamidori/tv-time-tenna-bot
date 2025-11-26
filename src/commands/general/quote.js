const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Wanna hear one of my hit lines?"),
  async execute(interaction) {
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
