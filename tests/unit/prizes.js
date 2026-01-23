const PrizeService = require('../../src/utils/prizeService.js');

describe('PrizeService', () => {
  let prizeService;

  beforeEach(() => {
    prizeService = new PrizeService();
  });

  it('should load prizes successfully', () => {
    expect(prizeService.prizes).toBeInstanceOf(Array);
    expect(prizeService.prizes.length).toBeGreaterThan(0);
  });

  it('should returns expected number of entries per rarity', () => {
    expect(prizeService.getPrizesByRarity('common').length).toEqual(8);
    expect(prizeService.getPrizesByRarity('uncommon').length).toEqual(6);
    expect(prizeService.getPrizesByRarity('rare').length).toEqual(6);
    expect(prizeService.getPrizesByRarity('veryRare').length).toEqual(4);
    expect(prizeService.getPrizesByRarity('legendary').length).toEqual(9);
    expect(prizeService.getPrizesByRarity('not used').length).toEqual(0);
  });

  it('should return a random prize for a given rarity, defaulting to common', () => {
    const randomPrize = prizeService.getRandomPrize('not used');
    expect(randomPrize).not.toBeNull();
    expect(randomPrize.rarity).toBe('common');
  });
});