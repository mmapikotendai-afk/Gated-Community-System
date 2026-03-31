import { useState, useEffect } from 'react';
import { getComplaints, createComplaint, getResidents, deleteComplaint } from '../services/api';
import { Plus, Trash2 } from 'lucide-react';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        resident_id: ''
    });

    useEffect(() => {
        fetchComplaints();
        fetchResidents();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await getComplaints();
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchResidents = async () => {
        try {
            const response = await getResidents();
            setResidents(response.data);
        } catch (error) {
            console.error('Error fetching residents:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createComplaint({ ...formData, resident_id: parseInt(formData.resident_id) });
            setShowForm(false);
            setFormData({ title: '', description: '', resident_id: '' });
            fetchComplaints();
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                await deleteComplaint(id);
                fetchComplaints();
            } catch (error) {
                console.error('Error deleting complaint:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Complaints & Queries</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
                >
                    <Plus size={20} />
                    New Complaint
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4">Submit New Complaint</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resident</label>
                            <select
                                name="resident_id"
                                value={formData.resident_id}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            >
                                <option value="">-- Select Resident --</option>
                                {residents.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.name} (House {r.house_number || 'N/A'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Submit Complaint
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="text-gray-500 col-span-full text-center p-8">Loading complaints...</p>
                ) : complaints.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center p-8">No complaints found.</p>
                ) : (
                    complaints.map((complaint) => (
                        <div key={complaint.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 relative group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-800">{complaint.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {complaint.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm">{complaint.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t">
                                <span>Resident ID: {complaint.resident_id}</span>
                                <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(complaint.id)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Complaint"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Complaints;
