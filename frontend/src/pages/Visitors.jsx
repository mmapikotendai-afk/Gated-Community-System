import { useState, useEffect } from 'react';
import { getVisitors, createVisitor, deleteVisitor } from '../services/api';
import { Plus, Trash2 } from 'lucide-react';

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact_number: '',
        vehicle_number: '',
        purpose: ''
    });

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        try {
            const response = await getVisitors();
            setVisitors(response.data);
        } catch (error) {
            console.error('Error fetching visitors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVisitor(formData);
            setShowForm(false);
            setFormData({ name: '', contact_number: '', vehicle_number: '', purpose: '' });
            fetchVisitors();
        } catch (error) {
            console.error('Error creating visitor:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this visitor?')) {
            try {
                await deleteVisitor(id);
                fetchVisitors();
            } catch (error) {
                console.error('Error deleting visitor:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Visitor Registration</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Register Visitor
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4">Register New Visitor</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="text"
                                name="contact_number"
                                value={formData.contact_number}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number (Optional)</label>
                            <input
                                type="text"
                                name="vehicle_number"
                                value={formData.vehicle_number}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                            <input
                                type="text"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Register Visitor
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Name</th>
                                <th className="p-4 font-semibold text-gray-600">Contact</th>
                                <th className="p-4 font-semibold text-gray-600">Vehicle</th>
                                <th className="p-4 font-semibold text-gray-600">Purpose</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : visitors.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No visitors found.</td>
                                </tr>
                            ) : (
                                visitors.map((visitor) => (
                                    <tr key={visitor.id} className="hover:bg-gray-50">
                                        <td className="p-4">{visitor.name}</td>
                                        <td className="p-4">{visitor.contact_number}</td>
                                        <td className="p-4">{visitor.vehicle_number || '-'}</td>
                                        <td className="p-4">{visitor.purpose || '-'}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(visitor.id)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                title="Delete Visitor"
                                            >
                                                <Trash2 size={18} />
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

export default Visitors;
