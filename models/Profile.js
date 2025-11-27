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
    lastQuizAt: Date
});

module.exports = model('Profile', Profile);