const fs = require('fs');
const path = require('path');

class PrizeManager {
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

  // getRandomPrize() {
  //   this.prizes
  // }

  // getPrizes(name = null, rarity = null) {
  // }
}

module.exports = PrizeManager;