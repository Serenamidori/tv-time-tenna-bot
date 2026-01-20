const PrizeManager = require('../../src/utils/prizeManager.js');

describe('PrizeManager', () => {
  let prizeManager;

  beforeEach(() => {
    prizeManager = new PrizeManager();
  });

  test('should load prizes successfully', () => {
    expect(prizeManager.prizes).toBeInstanceOf(Array);
    expect(prizeManager.prizes.length).toBeGreaterThan(0);
  });

  
});