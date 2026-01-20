const profileService = require('./profileService');

async function give(id, amount) {
  if (id == null || amount == null) return;
  const profile = await profileService.find(id);
  profile.points = profile.points + amount;
  profile.save();
}

module.exports = {
  give
}