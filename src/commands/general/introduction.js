const { SlashCommandBuilder } = require("discord.js");
const utils = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("introduction")
    .setDescription("Why don't you tell me a little about yourself?")
    .addStringOption((option) =>
      option.setName("nickname")
        .setDescription("Got a cool nickname you go by?")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("pronouns")
        .setDescription("What pronouns should I use when we chat?")
        .setRequired(false)
        .addChoices(
          { name: "He/Him", value: "he" },
          { name: "She/Her", value: "she" },
          { name: "They/Them", value: "they" }
        )
    )
    .addStringOption((option) =>
      option.setName("birthday")
        .setDescription("When's your birthday? I wanna mark it down! (MM/DD/YYYY)")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const profile = await utils.profile.getProfile(interaction.user.id);
      if (anyOptions(interaction.options)) {
        if (interaction.options.getString("birthday") && !validBirthday(interaction.options)) {
          await interaction.reply(`Sorry, didn't quite catch that birthday! Want to give it another go?`);
        } else {
          await setPreferences(profile, interaction.options);
          await interaction.reply(`I'll be sure to remember that! Thanks, ${profile.nickname || "superstar"}!`);
        }
      } else {
        await interaction.reply(`Nice to meet you, ${profile.nickname || "superstar"}!`);
      }
    } catch (error) {
      console.error('Profile retrieval failed:', error.message);
      await interaction.reply("Whoops! I seem to have lost my notes, please stand by!");
    }
  },
};

const anyOptions = (options) => !!(options.getString("nickname") || options.getString("pronouns") || options.getString("birthday"));
const validBirthday = (options) => !!(isValidBirthday(options.getString("birthday")))

function isValidBirthday(birthdayStr) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
  return regex.test(birthdayStr);
};

async function setPreferences(profile, options) {
  const nickname = options.getString("nickname");
  const pronouns = options.getString("pronouns");
  const birthdayStr = options.getString("birthday");

  if (nickname) {
    profile.nickname = nickname;
  }

  if (pronouns) {
    profile.pronouns = pronouns;
  }

  if (birthdayStr && isValidBirthday(birthdayStr)) {
    profile.birthday = new Date(birthdayStr);
  }

  profile.save();
};
