// controllers/task.controller.js

import Task from "../model/task.model.js";

// GET all tasks
export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks.length) {
      return res.status(400).json({ message: "There is no task" });
    }
    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
      numberOfTasks: tasks.length,
    });
  } catch (error) {
    console.error("Problem in getTask controller:", error);
    return res.status(500).json({
      message: "Failed to fetch tasks from database",
      error: error.message,
    });
  }
};

// CREATE a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = new Task({ title, description });
    await newTask.save();
    return res.status(201).json({
      message: "New task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Problem in createTask controller:", error);
    return res.status(500).json({
      message: "Failed to create a new task",
      error: error.message,
    });
  }
};

// UPDATE a task
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Problem in updateTask controller:", error);
    return res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// DELETE a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Problem in deleteTask controller:", error);
    return res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

// COMPLETE a task
export const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.isCompleted) {
      return res.status(400).json({ message: "Task is already completed" });
    }

    task.isCompleted = true;
    await task.save();

    return res.status(200).json({
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    console.error("Problem in completeTask controller:", error);
    return res.status(500).json({
      message: "Failed to complete task",
      error: error.message,
    });
  }
};
