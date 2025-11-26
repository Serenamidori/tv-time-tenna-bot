const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Ready to see how many points you've racked up?"),
  async execute(interaction) {
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
