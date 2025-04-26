import { useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/task"
});

const TaskItem = ({ task, onComplete, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplete = async () => {
    if (task.completed) {
      console.log("Task is already completed. No action needed.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await API.put(`/complete/${task._id}`);
      onComplete({ ...task, completed: true });
    } catch (err) {
      console.error("Failed to mark task as completed:", err);
      setError(err.response?.data?.message || "Error completing task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/delete/${task._id}`);
        onDelete(task._id);
      } catch (err) {
        console.error("Failed to delete task", err);
        setError("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <div className="border dark:border-gray-600 p-4 rounded-xl shadow hover:shadow-lg mb-4 transition bg-white dark:bg-gray-800">
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

      <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-green-500" : "text-gray-900 dark:text-white"}`}>
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>

      <div className="mt-4 flex gap-2">
        <button
          className={`py-1 px-4 rounded-full font-semibold ${
            task.completed 
              ? "bg-gray-400 cursor-not-allowed" 
              : isLoading 
                ? "bg-green-300" 
                : "bg-green-500 hover:bg-green-600 text-white"
          } transition`}
          onClick={handleComplete}
          disabled={task.completed || isLoading}
        >
          {task.completed ? "Completed" : isLoading ? "Processing..." : "Mark Done"}
        </button>

        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-4 rounded-full transition font-semibold"
          onClick={() => onEdit(task)}
          disabled={isLoading}
        >
          Edit
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition font-semibold"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
