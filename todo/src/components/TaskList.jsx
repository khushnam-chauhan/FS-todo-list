
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, deleteTask, editTask, toggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
