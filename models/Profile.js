const { Schema, model } = require('mongoose');

const Profile = new Schema({
    id: {
      type: String, 
      required: true,
      unique: true
    },
    points: {
      type: Number, 
      default: 0
    },
    nickname: String,
    pronouns: String,
    birthday: Date,
    quizCount: Number,
    lastQuizAt: Date,
    inventory: [{
      name: {
        type: String, 
        required: true
      },
      description: String,
      thumbnail: String,
      image: String,
      rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'very rare', 'legendary'],
        default: 'common'
      }
    }]
});

module.exports = model('Profile', Profile);