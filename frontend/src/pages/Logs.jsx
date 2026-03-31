import { useState, useEffect } from 'react';
import { getActiveLogs, checkIn, checkOut, getVisitors } from '../services/api';
import { LogIn, LogOut, Clock } from 'lucide-react';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState('');

    useEffect(() => {
        fetchLogs();
        fetchVisitors();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await getActiveLogs();
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVisitors = async () => {
        try {
            const response = await getVisitors();
            setVisitors(response.data);
        } catch (error) {
            console.error('Error fetching visitors:', error);
        }
    };

    const handleCheckIn = async (e) => {
        e.preventDefault();
        if (!selectedVisitor) return;

        try {
            await checkIn({ visitor_id: parseInt(selectedVisitor) });
            setShowCheckIn(false);
            setSelectedVisitor('');
            fetchLogs();
        } catch (error) {
            console.error('Error checking in visitor:', error);
        }
    };

    const handleCheckOut = async (logId) => {
        try {
            await checkOut(logId);
            fetchLogs();
        } catch (error) {
            console.error('Error checking out visitor:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Entry/Exit Logs</h1>
                <button
                    onClick={() => setShowCheckIn(!showCheckIn)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <LogIn size={20} />
                    Check In Visitor
                </button>
            </div>

            {showCheckIn && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4">Check In Visitor</h2>
                    <form onSubmit={handleCheckIn} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Visitor</label>
                            <select
                                value={selectedVisitor}
                                onChange={(e) => setSelectedVisitor(e.target.value)}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                required
                            >
                                <option value="">-- Select a Visitor --</option>
                                {visitors.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.name} ({v.contact_number})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            disabled={!selectedVisitor}
                        >
                            Confirm Check In
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Visitor Name</th>
                                <th className="p-4 font-semibold text-gray-600">Entry Time</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">No active visitors on site.</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium">
                                            {log.visitor ? log.visitor.name : `Visitor ID: ${log.visitor_id}`}
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Clock size={16} className="text-gray-400" />
                                            {new Date(log.entry_time).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                On Site
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleCheckOut(log.id)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 flex items-center gap-1 text-sm font-medium transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Check Out
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Logs;
