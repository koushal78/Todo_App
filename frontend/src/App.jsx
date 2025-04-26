import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const API = axios.create({
  baseURL: "http://localhost:8000/api/task"
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/");
      setTasks(res.data.tasks || res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (data) => {
    try {
      if (editingTask) {
        const response = await API.put(`/update/${editingTask._id}`, data);
        setTasks(tasks.map(task =>
          task._id === editingTask._id ? response.data.updatedTask || response.data : task
        ));
        setEditingTask(null);
      } else {
        const response = await API.post("/create", data);
        setTasks([...tasks, response.data.newTask || response.data]);
      }
    } catch (err) {
      console.error("Failed to add/update task", err);
      setError("Failed to save task. Please try again.");
    }
  };

  const handleComplete = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/delete/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            📝 TODO App
          </h1>
          <button
            onClick={toggleDarkMode}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              className="float-right font-bold" 
              onClick={() => setError(null)}
            >
              &times;
            </button>
          </div>
        )}

        <TaskForm 
          onAdd={handleAddTask} 
          editingTask={editingTask} 
          darkMode={darkMode}
        />

        {loading && !tasks.length ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : (
          <TaskList 
            tasks={tasks} 
            onComplete={handleComplete} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default App;
