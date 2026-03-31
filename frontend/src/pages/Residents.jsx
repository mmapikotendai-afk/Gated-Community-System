import { useState, useEffect } from 'react';
import { getResidents, createResident, deleteResident } from '../services/api';
import { Trash2, Plus, Search } from 'lucide-react';

const Residents = () => {
    const [residents, setResidents] = useState([]);
    const [filteredResidents, setFilteredResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        house_number: '',
        contact_number: '',
        email: ''
    });

    useEffect(() => {
        fetchResidents();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = residents.filter(resident =>
                (resident.house_number || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResidents(filtered);
        } else {
            setFilteredResidents(residents);
        }
    }, [searchQuery, residents]);

    const fetchResidents = async () => {
        try {
            const response = await getResidents();
            setResidents(response.data);
            setFilteredResidents(response.data);
        } catch (error) {
            console.error('Error fetching residents:', error);
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
            await createResident(formData);
            setShowForm(false);
            setFormData({ name: '', house_number: '', contact_number: '', email: '' });
            fetchResidents();
        } catch (error) {
            console.error('Error creating resident:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resident?')) {
            try {
                await deleteResident(id);
                fetchResidents();
            } catch (error) {
                console.error('Error deleting resident:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Resident Management</h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by House Number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        <Plus size={20} />
                        Add Resident
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4">Add New Resident</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">House Number</label>
                            <input
                                type="text"
                                name="house_number"
                                value={formData.house_number}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save Resident
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
                                <th className="p-4 font-semibold text-gray-600">House No.</th>
                                <th className="p-4 font-semibold text-gray-600">Contact</th>
                                <th className="p-4 font-semibold text-gray-600">Email</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Loading...</td>
                                </tr>
                            ) : filteredResidents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        {searchQuery ? 'No residents found matching this house number.' : 'No residents found.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredResidents.map((resident) => (
                                    <tr key={resident.id} className="hover:bg-gray-50">
                                        <td className="p-4">{resident.name}</td>
                                        <td className="p-4">{resident.house_number}</td>
                                        <td className="p-4">{resident.contact_number}</td>
                                        <td className="p-4">{resident.email || '-'}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(resident.id)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                title="Delete Resident"
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

export default Residents;
