const fs = require('fs');
const path = require('path');
const randomizer = require('./randomizer');
const rarityEnum = ['common', 'uncommon', 'rare', 'very rare', 'legendary'];

class PrizeService {
  constructor() {
    this.filePath = path.join(__dirname, 'prizes.json');
    this.prizes = this.loadPrizes();
  }

  loadPrizes() {
    try {
      const prizePath = path.resolve(this.filePath);
      const data = fs.readFileSync(prizePath, 'utf8');
      return JSON.parse(data).prizes;
    } catch(e) {
      console.error('Error loading prizes:', e);
      return [];
    }
  }

  getRandomPrize(rarity = 'common') {
    rarityValidated = rarityEnum.includes(rarity) ? rarity : 'common';
    const filteredPrizes = this.getPrizesByRarity(rarityValidated);
    const randomPrizeIndex = randomizer.random(filteredPrizes.length)-1
    return filteredPrizes[randomPrizeIndex];
  }

  getPrizesByRarity(rarity) {
    return this.prizes.filter(prize => prize.rarity.toLowerCase() === rarity.toLowerCase());
  }
}

module.exports = PrizeService;