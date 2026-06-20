import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import * as api from './services/api';

export default function App() {
    const [page, setPage] = useState('dashboard');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.getTasks();
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (taskData) => {
        try {
            await api.createTask(taskData);
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create task");
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.updateTaskStatus(id, status);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (id) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <header className="navbar">
                <h1>Task Portal</h1>
                <div className="nav-buttons">
                    <button onClick={() => setDarkMode(!darkMode)} className="btn">
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                    <button onClick={() => setPage('dashboard')} className="btn btn-primary">Dashboard</button>
                    <button onClick={() => setPage('add-task')} className="btn btn-success">+ Add Task</button>
                </div>
            </header>

            {page === 'dashboard' ? (
                <Dashboard tasks={tasks} onUpdateStatus={handleUpdateStatus} onDeleteTask={handleDeleteTask} loading={loading} />
            ) : (
                <AddTask onAddTask={handleAddTask} setPage={setPage} />
            )}
        </div>
    );
}