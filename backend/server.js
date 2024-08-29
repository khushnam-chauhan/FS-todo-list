const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const Task = require('./models/Task');

const app = express();
const port = 3001;

app.use(cors()); 
app.use(express.json());

mongoose.connect(`mongodb://127.0.0.1:27017/todo-list`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text });
  
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
