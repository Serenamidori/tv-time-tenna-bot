const mongoose = require('mongoose');

const dailyTask = new mongoose.Schema({
  taskType: {
    type: String,
    required: true,
    enum: ['birthday', 'ilovetv']
  },
  lastExecuted: {
    type: Date,
    default: null
  },
  executionDay: {
    type: String,
    default: null
  },
  messageId:  {
    type: String,
    default: null
  }
}, { timestamps: true });

// Ensure unique index on taskType to prevent duplicates
dailyTask.index({ taskType: 1 }, { unique: true });

module.exports = mongoose.model('DailyTask', dailyTask);