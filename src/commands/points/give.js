const { SlashCommandBuilder, MessageFlags, ButtonBuilder, ButtonStyle, ComponentType, ActionRowBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } = require("discord.js");
const { profileService, randomizer } = require("../../utils");
const Profile = require("../../../models/Profile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("Want to give an item to a fellow user?"),
  async execute(interaction) {
    const profile = await profileService.find(interaction.user.id);

    if (profile.inventory.length === 0) {
      await interaction.reply({
        content: `Sorry! You don't seem to have any items to give!`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    const itemOptions = profile.inventory.map((item, index) => {
      return {
        label: `${item.name}`,
        value: `${index}`,
        emoji: `${item.icon} `
      };
    });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('give_item_menu')
      .setPlaceholder('Select from your inventory')
      .addOptions(itemOptions);
        
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

		const sentInventory = await interaction.reply({
      content: 'Which item would you like to give?',
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

      const userSelectMenu = new UserSelectMenuBuilder()
        .setCustomId('server_user_menu')
        .setPlaceholder('Select who to your item give to');
          
      const userRow = new ActionRowBuilder().addComponents(userSelectMenu);

      await selectedInventory.update({
        content: `Who do you want to give your **${item.icon} ${item.name}** to?`,
        components: [userRow],
        flags: MessageFlags.Ephemeral
      });

      const selectedUser = await sentInventory.awaitMessageComponent({
        componentType: ComponentType.UserSelect,
        filter: (i) => i.user.id === interaction.user.id
      });

      const recipientUser = selectedUser.users.values().next().value;

      if (recipientUser.bot) {
          await selectedUser.update({
          content: `Whoops! You can't give these items to me or Mike! Try only sending gifts to _other_ users!`,
          components: []
        });
        return true;
      }

      const recipient = await profileService.find(selectedUser.values[0]);
      const recipientName = profileService.getName(sentInventory, recipient);

      const confirm = new ButtonBuilder()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle(ButtonStyle.Success);
      
      const cancel = new ButtonBuilder()
        .setCustomId('no')
        .setLabel('No')
        .setStyle(ButtonStyle.Danger);
      
      const buttonRow = new ActionRowBuilder().addComponents(confirm, cancel);

      await selectedUser.update({
        content: `Are you sure you want to give your **${item.icon} ${item.name}** to **${recipientName}**?`,
        components: [buttonRow]
      });

      const selectedAnswer = await sentInventory.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter: (i) => i.user.id === interaction.user.id
      });

      if (selectedAnswer.customId === "yes") {
        await selectedAnswer.update({
          content: `Hooray! You've just given **${recipientName}** your **${item.icon} ${item.name}**!\n-# _(${quip()})_`,
          components: []
        });

        const gift = profile.inventory.splice(itemIndex, 1);
        recipient.inventory.push(gift[0]);
        recipient.save();
        profile.save();

        selectedAnswer.followUp(`<@${recipient.id}>, you've been given a **${item.icon} ${item.name}** from <@${profile.id}>!`);
      } else {
        await selectedAnswer.update({
          content: 'No gifting, then! Have a TV-tastic day!',
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

function quip() {
  const lines = [
    'Happy to help!!',
    'Everyone in this server is so nice!',
    'I wish someone would give ME a gift... But nothing from the Gacha Machine though!!',
    'Sharing is caring!',
    `I wonder if they'll give you something back?`,
    'How lovely!!'
  ]
  return lines[randomizer.random(lines.length)-1];
}
