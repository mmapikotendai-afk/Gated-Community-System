import { useState, useEffect } from 'react';
import { getResidents, getVisitors, getActiveLogs, getComplaints } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalResidents: 0,
        activeVisitors: 0,
        totalVisitors: 0,
        pendingComplaints: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [residentsRes, visitorsRes, logsRes, complaintsRes] = await Promise.all([
                getResidents(),
                getVisitors(),
                getActiveLogs(),
                getComplaints()
            ]);

            const pendingComplaints = complaintsRes.data.filter(c => c.status !== 'Resolved').length;

            setStats({
                totalResidents: residentsRes.data.length,
                activeVisitors: logsRes.data.length,
                totalVisitors: visitorsRes.data.length,
                pendingComplaints: pendingComplaints
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Residents</h2>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalResidents}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Active Visitors</h2>
                    <p className="text-3xl font-bold text-green-600">{stats.activeVisitors}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Visitors</h2>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalVisitors}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Pending Complaints</h2>
                    <p className="text-3xl font-bold text-red-600">{stats.pendingComplaints}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
