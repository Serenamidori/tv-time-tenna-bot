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
    throwError(error);
  }
};

async function all() {
   try {
    const allProfiles = Profile.find({});
    return await allProfiles;
  } catch (error) {
    console.error(`Error retrieving all profiles`, error);
    throwError(error);
  }
}

function throwError(error) {
  if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    throw new Error('Database connection failed');
  } else if (error.name === 'ValidationError') {
    throw new Error('Invalid profile data');
  } else {
    throw new Error('Failed to retrieve or create profile');
  }
};

function getName(interaction, profile = null) {
  return (
    profile?.nickname || 
    interaction.member?.nickname || 
    interaction.member?.user?.globalName || 
    interaction.member?.user?.username ||
    'superstar'
  );
}

module.exports = {
  find, all, getName
}