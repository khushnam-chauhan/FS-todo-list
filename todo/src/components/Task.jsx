
import React, { useState } from 'react';

const Task = ({ task, deleteTask, editTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task._id, { ...task, text: newText });
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span onClick={() => toggleComplete(task._id)}>{task.text}</span>
      )}
      <div className="task-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
