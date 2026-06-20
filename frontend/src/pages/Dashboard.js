import React, { useState } from 'react';

export default function Dashboard({ tasks, onUpdateStatus, onDeleteTask, loading }) {
    const [filter, setFilter] = useState('All');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    if (loading) return <div style={{textAlign: 'center', marginTop: '40px'}}><h2>Loading tasks...</h2></div>;

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0'}}>
                <h3>Task List ({filteredTasks.length})</h3>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-control" style={{width: '150px'}}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {filteredTasks.length === 0 ? (
                <div style={{textAlign: 'center', color: '#888', padding: '40px'}}>No tasks found. Create one!</div>
            ) : (
                <div className="task-grid">
                    {filteredTasks.map(task => (
                        <div key={task._id} className="task-card">
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p><small>Created: {new Date(task.created_at).toLocaleDateString()}</small></p>
                            <div style={{marginBottom: '15px'}}>
                                <span className={`status-badge ${task.status.replace(" ", "-")}`}>{task.status}</span>
                            </div>
                            <div style={{display: 'flex', gap: '10px'}}>
                                {task.status !== 'Completed' && (
                                    <button className="btn btn-success" onClick={() => onUpdateStatus(task._id, 'Completed')}>Complete</button>
                                )}
                                <button className="btn btn-danger" onClick={() => onDeleteTask(task._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}