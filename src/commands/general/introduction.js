const { SlashCommandBuilder } = require("discord.js");
const { profileService } = require("../../utils");

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
    )
    .addStringOption((option) =>
      option.setName("timezone")
        .setDescription("What timezone are you in?")
        .setRequired(false)
        .addChoices(
          { name: "ET (America/New_York)", value: "America/New_York" },
          { name: "CT (America/Chicago)", value: "America/Chicago" },
          { name: "MT (America/Denver)", value: "America/Denver" },
          { name: "PT (America/Los_Angeles)", value: "America/Los_Angeles" },
          { name: "AKT (America/Anchorage)", value: "America/Anchorage" },
          { name: "HT (America/Honolulu)", value: "America/Honolulu" },
          { name: "Eastern Canada (America/Toronto)", value: "America/Toronto" },
          { name: "Pacific Canada (America/Vancouver)", value: "America/Vancouver" },
          { name: "Brazil (America/Sao_Paulo)", value: "America/Sao_Paulo" },
          { name: "Mexico (America/Mexico_City)", value: "America/Mexico_City" },
          { name: "GMT/BST (Europe/London)", value: "Europe/London" },
          { name: "CET (Europe/Paris)", value: "Europe/Paris" },
          { name: "EET (Europe/Helsinki)", value: "Europe/Helsinki" },
          { name: "Moscow (Europe/Moscow)", value: "Europe/Moscow" },
          { name: "JST (Asia/Tokyo)", value: "Asia/Tokyo" },
          { name: "KST (Asia/Seoul)", value: "Asia/Seoul" },
          { name: "CST (Asia/Shanghai)", value: "Asia/Shanghai" },
          { name: "IST (Asia/Kolkata)", value: "Asia/Kolkata" },
          { name: "GST (Asia/Dubai)", value: "Asia/Dubai" },
          { name: "AEDT/AEST (Australia/Sydney)", value: "Australia/Sydney" },
          { name: "NZST (Pacific/Auckland)", value: "Pacific/Auckland" },
          { name: "UTC", value: "UTC" },
        )
    ),
  async execute(interaction) {
    try {
      const profile = await profileService.find(interaction.user.id);
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

const anyOptions = (options) => !!(options.getString("nickname") || options.getString("pronouns") || options.getString("birthday") || options.getString("timezone"));
const validBirthday = (options) => !!(isValidBirthday(options.getString("birthday")))

function isValidBirthday(birthdayStr) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
  return regex.test(birthdayStr);
};

async function setPreferences(profile, options) {
  const fields = ["nickname", "pronouns", "timezone"];
  for (const field of fields) {
    const value = options.getString(field);
    if (value) profile[field] = value;
  }

  const birthdayStr = options.getString("birthday");
  if (birthdayStr && isValidBirthday(birthdayStr)) {
    profile.birthday = new Date(birthdayStr);
  }

  await profile.save();
};
