import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => {
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
        No tasks yet. Add one!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
