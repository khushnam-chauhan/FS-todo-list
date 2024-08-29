// backend/models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
