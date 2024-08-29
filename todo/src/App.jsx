
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:3001/tasks', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task._id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const editTask = (taskId, updatedTask) => {
    axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask)
      .then(response => setTasks(tasks.map(task => task._id === taskId ? response.data : task)))
      .catch(error => console.error('Error editing task:', error));
  };

  const toggleComplete = (taskId) => {
    const task = tasks.find(task => task._id === taskId);
    if (task) {
      editTask(taskId, { ...task, completed: !task.completed });
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        editTask={editTask} 
        toggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;
