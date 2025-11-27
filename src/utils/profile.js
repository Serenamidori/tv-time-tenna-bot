const Profile = require('../../models/Profile');

async function find(id) {
  try {
    const profile = await Profile.findOneAndUpdate(
      { id: id },
      { $setOnInsert: { id: id, createdAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return profile;
  } catch (error) {
    console.error(`Error creating/retrieving profile'${id}':`, error);

    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      throw new Error('Database connection failed');
    } else if (error.name === 'ValidationError') {
      throw new Error('Invalid profile data');
    } else {
      throw new Error('Failed to retrieve or create profile');
    }
  }
};

function getName(interaction, profile = null) {
  return (
    profile?.nickname || 
    interaction.member?.nickname || 
    interaction.user.globalName || 
    interaction.user.username
  );
}

module.exports = {
  find, getName
}