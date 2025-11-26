const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("introduction")
    .setDescription("Why don't you tell me a little about yourself?")
    .addStringOption((option) =>
      option.setName("nickname")
        .setDescription("Got a cool nickname you go by?")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("pronouns")
        .setDescription("What pronouns should I use when we chat?")
        .setRequired(false)
        .addChoices(
          { name: "He/Him", value: 0 },
          { name: "She/Her", value: 1 },
          { name: "They/Them", value: 2 }
        )
    )
    .addStringOption((option) =>
      option.setName("birthday")
        .setDescription("When's your birthday? I wanna mark it down! (MM/DD/YYYY)")
        .setRequired(false)
    ),
  async execute(interaction) {
    const nickname = interaction.options.getString("nickname");
    const pronouns = interaction.options.getInteger("pronouns");
    const birthday = interaction.options.getString("birthday");
    console.log(nickname)
    console.log(pronouns)
    console.log(birthday)
    await interaction.reply("Whoops! I don't know how to do that yet! Sorry!");
  },
};
