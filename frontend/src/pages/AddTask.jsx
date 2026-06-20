import React, { useState } from 'react';

export default function AddTask({ onAddTask, setPage }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!title.trim()) validationErrors.title = "Title is required.";
        if (description.length < 20) validationErrors.description = "Description must be at least 20 characters long.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onAddTask({ title, description, status });
        setPage('dashboard');
    };

    return (
        <div style={{maxWidth: '500px', margin: '40px auto', background: 'var(--card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>
                <div className="form-group">
                    <label>Initial Status</label>
                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>Save Task</button>
            </form>
        </div>
    );
}