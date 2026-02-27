const BASE_URL = 'https://the-trivia-api.com/v2';
const { randomizer } = require("../utils");

async function getQuestion(difficulty) {
  try {
    const response = await fetch(`${BASE_URL}/questions?limit=1&difficulties=${difficulty}&categories=${getCategory()}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    return await response.json();
  } catch(error) {
    console.error('Error fetching Trivia API response:', error);
  }
}

function getCategory() {
  categories = ['general_knowledge', 'food_and_drink', 'arts_and_literature', 'music', 'film_and_tv'];
  return categories[randomizer.random(categories.length)-1];
}

module.exports = {
  getQuestion
};