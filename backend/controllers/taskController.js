const Task = require('../models/Task');


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ created_at: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new task
exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    
    // Validation
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description || description.length < 20) {
        return res.status(400).json({ message: "Description must be at least 20 characters long" });
    }

    try {
        const newTask = new Task({ title, description, status });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT (Update status)
exports.updateTaskStatus = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};