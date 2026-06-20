import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const createTask = (taskData) => axios.post(API_URL, taskData);
export const updateTaskStatus = (id, status) => axios.put(`${API_URL}/${id}`, { status });
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);