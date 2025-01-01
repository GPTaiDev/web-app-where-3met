const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  goal: { type: String, required: true },
  streak: { type: Number, default: 0 },
  logs: [{ date: Date, status: Boolean }],
  strengthScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Habit', habitSchema);
