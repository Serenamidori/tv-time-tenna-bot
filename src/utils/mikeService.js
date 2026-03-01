const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const path = require('path');
const randomizer = require('./randomizer');
const quotes = [
  "You got it, Tenna!!",
  "Comin' right up!!",
  "Sure thing! Right away!!",
  "Yous got it, boss.",
  "...",
  "...",
  "..."
]

async function getPoints(interaction, profile, name) {
  const mikeIndex = randomMikeIndex();
  const fields = { name: `${name.toUpperCase()}'S BALANCE`, value: `${profile.points} POINTS` }
  await interaction.channel.send(getMikeMessage(mikeIndex, null, null, fields));
}

async function getInventory(interaction, profile, name) {
  const mikeIndex = randomMikeIndex();
  const inventory = profile.inventory;
  const inventoryCount = inventory.length;

  if (inventoryCount == 0) {
    const fields = { name: `${name.toUpperCase()}'S INVENTORY`, value: "You have nothing in your inventory yet!" }
    await interaction.channel.send(getMikeMessage(mikeIndex, null, null, fields));
  } else {
    let pages = Math.ceil(inventoryCount / 15);
    let inventoryList = formatInventory(inventory);

    for (let i = 0; i < pages; i++) {
      const pageStr = pages > 1 ? ` (${i+1})` : '';
      const fields = { name: `${name.toUpperCase()}'S INVENTORY${pageStr}`, value: inventoryList[i] }
      const title = i == 0 ? `"${quotes[mikeIndex]}"` : ' ';
      await interaction.channel.send(getMikeMessage(mikeIndex, title, null, fields));
    }
  }
}

function randomMikeIndex() {
  return randomizer.random(quotes.length) - 1;
}

function formatInventory(inventory) {
  const lines = inventory.map(item => `${item.icon} ~ ${item.name} \`${starsPerRarity(item.rarity)}\``);
  const pages = [];
  for (let i = 0; i < lines.length; i += 15) {
    pages.push(lines.slice(i, i + 15).join('\n'));
  }
  return pages;
}

function starsPerRarity(rarity) {
  switch(rarity){
    case 'common':
      return `★`;
    case 'uncommon':
      return `★★`;
    case 'rare':
      return `★★★`;
    case 'veryRare':
      return `★★★★`;
    case 'legendary':
      return `★★★★★`;
    default:
      return '';
  }
}

function getMikeMessage(i, title = null, description = null, fields = null) {
  if (title == null) title = `"${quotes[i]}"`;
  const imagePath = path.resolve(__dirname, `../assets/mike/${i}.png`);
  const attachment = new AttachmentBuilder(imagePath, { name: 'Mike.png' });

  const embed = new EmbedBuilder()
    .setColor(0xFF362C)
    .setTitle(title)
    .setDescription(description)
    .setThumbnail(`attachment://${attachment.name}`);

  if (fields) embed.addFields(fields);

  return { embeds: [embed], files: [attachment] }
}

module.exports = {
  randomMikeIndex, getPoints, getInventory, getMikeMessage
}