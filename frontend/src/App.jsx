import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Residents from './pages/Residents';
import Visitors from './pages/Visitors';
import Logs from './pages/Logs';
import Complaints from './pages/Complaints';
import BnBBooking from './pages/BnBBooking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/bnb" element={<BnBBooking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
