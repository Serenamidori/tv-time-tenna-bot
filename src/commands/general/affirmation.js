const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affirmation")
    .setDescription("Feeling a bit glooby? I've got some top-tier encouragement for you!"),
  async execute(interaction) {
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
