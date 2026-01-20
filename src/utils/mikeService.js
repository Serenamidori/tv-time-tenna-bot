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

function randomMikeIndex() {
  return randomizer.random(quotes.length) - 1;
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
  randomMikeIndex, getPoints, getMikeMessage
}