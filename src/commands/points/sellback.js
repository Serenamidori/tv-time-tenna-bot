const { SlashCommandBuilder, MessageFlags, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { profileService, pointsService, randomizer } = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sellback")
    .setDescription("I'll give you points for your extra junk!"),
  async execute(interaction) {
    const profile = await profileService.find(interaction.user.id);

    if (profile.inventory.length === 0) {
      await interaction.reply({
        content: `Sorry! You don't seem to have any items to sell!`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    const itemOptions = profile.inventory.map((item, index) => {
      return {
        label: `${item.name}`,
        value: `${index}`,
        description: `Sellback: ${pointsPerRarity(item.rarity)} points`,
        emoji: `${item.icon} `
      };
    });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('sell_item_menu')
      .setPlaceholder('Select from your inventory')
      .addOptions(itemOptions);
        
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

		const sentInventory = await interaction.reply({
      content: 'Which item would you like to sell back to me?',
			components: [actionRow],
      flags: MessageFlags.Ephemeral
		});

    try {
      const selectedInventory = await sentInventory.awaitMessageComponent({
        componentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === interaction.user.id
      });

      const itemIndex = parseInt(selectedInventory.values[0], 10);
      const item = profile.inventory.at(itemIndex);
      const itemPoints = pointsPerRarity(item.rarity);

      const confirm = new ButtonBuilder()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle(ButtonStyle.Success);
      
      const cancel = new ButtonBuilder()
        .setCustomId('no')
        .setLabel('No')
        .setStyle(ButtonStyle.Danger);
      
      const buttonRow = new ActionRowBuilder().addComponents(confirm, cancel);

      await selectedInventory.update({
        content: `Are you sure you want to sell your **${item.icon} ${item.name}** for **${itemPoints} points**?`,
        components: [buttonRow]
      });

      const selectedAnswer = await sentInventory.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter: (i) => i.user.id === interaction.user.id
      });

      if (selectedAnswer.customId === "yes") {
        await selectedAnswer.update({
          content: `You got it! Here's **${itemPoints} points** for your **${item.icon} ${item.name}**!\n-# _(${quip()})_`,
          components: []
        });

        profile.inventory.splice(itemIndex, 1);
        profile.save();
        pointsService.give(profile.id, itemPoints);
      } else {
        await selectedAnswer.update({
          content: 'No sale, then! Have a TV-tastic day!',
          components: []
        });
      }

    } catch (error) {
      console.error('Interaction timed out or error occurred:', error);
      await interaction.editReply({
        content: "Whoops! Something went wrong! I may have misplaced some things... Just tell Gab if anything is missing!!",
        components: []
      });
    }
  },
};

function pointsPerRarity(rarity) {
  switch(rarity){
    case 'common':
      return 20;
    case 'uncommon':
      return 40;
    case 'rare':
      return 60;
    case 'veryRare':
      return 80;
    case 'legendary':
      return 100;
    default:
      return 0;
  }
}

function quip() {
  const lines = [
    'Pleasure doing business with ya!',
    'MIKE! Put this back in the Gacha Machine!!',
    'I might keep this one for myself... maybe.',
    'I eagerly await getting those points back later!',
    `Guess you didn't like that one, huh...?`,
    'Here, Mike! A bonus item for you!!'
  ]
  return lines[randomizer.random(lines.length)-1];
}
