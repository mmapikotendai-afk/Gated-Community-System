import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserPlus, ClipboardList, MessageSquare, Bed } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-700' : '';
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Home className="h-6 w-6" />
                        <span className="font-bold text-xl">GatedCommunity</span>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/')}`}>
                            Dashboard
                        </Link>
                        <Link to="/residents" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/residents')}`}>
                            <Users className="h-4 w-4" />
                            <span>Residents</span>
                        </Link>
                        <Link to="/visitors" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/visitors')}`}>
                            <UserPlus className="h-4 w-4" />
                            <span>Visitors</span>
                        </Link>
                        <Link to="/logs" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/logs')}`}>
                            <ClipboardList className="h-4 w-4" />
                            <span>Logs</span>
                        </Link>
                        <Link to="/complaints" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/complaints')}`}>
                            <MessageSquare className="h-4 w-4" />
                            <span>Complaints</span>
                        </Link>
                        <Link to="/bnb" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/bnb')}`}>
                            <Bed className="h-4 w-4" />
                            <span>BnB</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
