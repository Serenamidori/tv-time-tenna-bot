const { SlashCommandBuilder } = require("discord.js");
const { DateTime } = require('luxon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Planning something fun? Give me all the details!")
    .addStringOption(option =>
      option.setName('type')
        .setDescription('What event is it?')
        .setRequired(true)
        .addChoices(
          { name: 'Art Party', value: 'Art Party' },
          { name: 'Gaming Session', value: 'Gaming Session' },
          { name: 'Watch Party', value: 'Watch Party' },
          { name: 'Drawing Sprint', value: 'Drawing Sprint' },
          { name: 'Writing Sprint', value: 'Writing Sprint' },

        )
    )
    .addIntegerOption((option) =>
      option
        .setName("day")
        .setDescription("When is the event?")
        .setRequired(true)
        .addChoices(
          { name: "Today", value: 0 },
          { name: "Tomorrow", value: 1 },
          { name: "In 2 days", value: 2 },
          { name: "In 3 days", value: 3 },
          { name: "In 4 days", value: 4 },
          { name: "In 5 days", value: 5 },
          { name: "In 6 days", value: 6 },
          { name: "In 7 days", value: 7 }
        )
    )
    .addIntegerOption(option =>
      option.setName('time')
        .setDescription('At what time?')
        .setRequired(true)
        .addChoices(
          { name: '12 AM (Midnight)', value: 0 },
          { name: '1 AM', value: 1 },
          { name: '2 AM', value: 2 },
          { name: '3 AM', value: 3 },
          { name: '4 AM', value: 4 },
          { name: '5 AM', value: 5 },
          { name: '6 AM', value: 6 },
          { name: '7 AM', value: 7 },
          { name: '8 AM', value: 8 },
          { name: '9 AM', value: 9 },
          { name: '10 AM', value: 10 },
          { name: '11 AM', value: 11 },
          { name: '12 PM (Noon)', value: 12 },
          { name: '1 PM', value: 13 },
          { name: '2 PM', value: 14 },
          { name: '3 PM', value: 15 },
          { name: '4 PM', value: 16 },
          { name: '5 PM', value: 17 },
          { name: '6 PM', value: 18 },
          { name: '7 PM', value: 19 },
          { name: '8 PM', value: 20 },
          { name: '9 PM', value: 21 },
          { name: '10 PM', value: 22 },
          { name: '11 PM', value: 23 }
        )
    )
    .addStringOption(option =>
      option.setName('timezone')
        .setDescription('What is your timezone?')
        .setRequired(true)
        .addChoices(
          { name: 'Eastern (ET)', value: 'America/New_York' },
          { name: 'Central (CT)', value: 'America/Chicago' },
          { name: 'Mountain (MT)', value: 'America/Denver' },
          { name: 'Pacific (PT)', value: 'America/Los_Angeles' },
          { name: 'Newfoundland (NT)', value: 'America/St_Johns' },
          { name: 'UK (GMT/BST)', value: 'Europe/London' },
          { name: 'Spain (CET)', value: 'Europe/Madrid' },
          { name: 'UTC', value: 'UTC' }
        )
    )
    .addStringOption((option) =>
      option.setName("title")
        .setDescription("What is the event going to be called?")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("description")
        .setDescription("What is the event about?")
        .setRequired(false)
    )
    ,
  async execute(interaction) {
    const day =  interaction.options.getInteger("day");
    const time =  interaction.options.getInteger("time");
    const timezone =  interaction.options.getString("timezone");

    const eventDate = DateTime.now()
      .setZone(timezone)
      .plus({ days: day })
      .set({ hour: time, minute: 0, second: 0, millisecond: 0 });

    if (eventDate < DateTime.now()) {
      await interaction.reply({
        content: `Oops! Looks like that time has already passed. What to try that again?`,
        ephemeral: true
      });
      return;
    }
  
    let name =  interaction.options.getString("type");
    const title =  interaction.options.getString("title");
    if (title) { name += `: ${title}` }
    const description =  interaction.options.getString("description");
    const voiceChannel = await interaction.guild.channels.fetch(process.env.LOUNGE_VOICE_CHAT);

    try {
      await interaction.guild.scheduledEvents.create({
        name: name,
        description: description,
        scheduledStartTime: eventDate.toJSDate(),
        privacyLevel: 2,
        entityType: 2,
        channel: voiceChannel
      });

      await interaction.reply({
        content: `<:breaking1:1446597036601507840><:breaking2:1446597037486375113><:breaking3:1446597038639681628><:breaking4:1446597046290350151><:breaking5:1446597047615754280>\n**${name}** event has been scheduled!\n\nTune in on <t:${Math.floor(eventDate.toSeconds())}:F>! Don't miss it, folks!!\n-# _(Sponsored by TV TIME!)_`
      });
    } catch (error) {
      await interaction.reply({
        content: `Uh, sorry! I couldn't schedule that event for you! Mind trying again?\n-# MIKE! Why didn't the event get made? ..._"${error}"??_ Well figure it out!!`,
        ephemeral: true
      });
    }

  },
};
