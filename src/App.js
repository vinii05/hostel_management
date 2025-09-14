import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RoomsManagement from './RoomsManagement';
import StudentsManagement from './StudentsManagement';
import RoomAllocation from './RoomAllocation';
import FeesManagement from './FeesManagement';
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/manage-rooms">🏠 Rooms</Link>
                <Link to="/manage-students">🎓 Students</Link>
                <Link to="/allocate-room">🔐 Allocate Room</Link>
                <Link to="/manage-fees">💸 Fees</Link>
            </nav>
            <Routes>
                <Route path="/manage-rooms" element={<RoomsManagement />} />
                <Route path="/manage-students" element={<StudentsManagement />} />
                <Route path="/allocate-room" element={<RoomAllocation />} />
                <Route path="/manage-fees" element={<FeesManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
