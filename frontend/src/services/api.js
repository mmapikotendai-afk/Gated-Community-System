import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

// Residents
export const getResidents = () => api.get('/residents/');
export const createResident = (resident) => api.post('/residents/', resident);
export const deleteResident = (id) => api.delete(`/residents/${id}`);

// Visitors
export const getVisitors = () => api.get('/visitors/');
export const createVisitor = (visitor) => api.post('/visitors/', visitor);
export const deleteVisitor = (id) => api.delete(`/visitors/${id}`);

// Logs
export const checkIn = (log) => api.post('/logs/checkin', log);
export const checkOut = (logId) => api.put(`/logs/checkout/${logId}`);
export const getActiveLogs = () => api.get('/logs/active');

// Complaints
export const getComplaints = () => api.get('/complaints/');
export const createComplaint = (complaint) => api.post('/complaints/', complaint);
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);

export default api;
