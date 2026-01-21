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
  const i = randomMikeIndex();
  const fields = { name: `${name.toUpperCase()}'S BALANCE`, value: `${profile.points} POINTS` }
  await interaction.channel.send(getMikeMessage(i, null, null, fields));
}

async function getInventory(interaction, profile, name) {
  const i = randomMikeIndex();
  const inventory = profile.inventory;
  let inventoryList;

  if (inventory.length == 0) {
    inventoryList = "You have nothing in your inventory yet!"
  } else {
    inventoryList = formatInventory(inventory);
  }

  const fields = { name: `${name.toUpperCase()}'S INVENTORY`, value: inventoryList }
  await interaction.channel.send(getMikeMessage(i, null, null, fields));
}

function randomMikeIndex() {
  return randomizer.random(quotes.length) - 1;
}

function formatInventory(inventory) {
  return inventory.map(item => `* ${item.name}`).join('\n');
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