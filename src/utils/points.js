const profile = require('./profile');

async function give(id, amount) {
  if (id == null || amount == null) return;
  const user = await profile.find(id);
  user.points = user.points + amount;
  user.save();
}

module.exports = {
  give
}