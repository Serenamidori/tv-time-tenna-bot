const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const path = require('path');
const random = require('./random');
const quotes = ["Sure thing, boss!", "Yous got it, boss.", "..."]

function getMike() {
  const i = random.rand(3);
  const mike = {
    "image": `${i}.png`,
    "quote": quotes[i]
  };

  return mike;
};

async function getPoints(interaction, profile, name) {
  const i = random.rand(3)-1;
  const imagePath = path.resolve(__dirname, `../assets/mike/${i}.png`);
  const attachment = new AttachmentBuilder(imagePath, { name: 'Mike.png' });

  const pointsEmbed = new EmbedBuilder()
    .setColor(0xFF362C)
    .setTitle(`"${quotes[i]}"`)
    .addFields({ name: `${name.toUpperCase()}'S BALANCE`, value: `${profile.points} points` })
    .setThumbnail(`attachment://${attachment.name}`);

  await interaction.channel.send({ embeds: [pointsEmbed], files: [attachment]});
}

module.exports = {
  getMike, getPoints
}