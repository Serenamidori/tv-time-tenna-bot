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
      icon: {
        type: String, 
        required: true
      },
      image: {
        type: String, 
        required: true
      },
      rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'veryRare', 'legendary'],
        default: 'common'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
}, {
  timestamps: true
});

module.exports = model('Profile', Profile);