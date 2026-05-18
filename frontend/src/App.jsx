import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventList from './pages/events/EventList';
import EventDetail from './pages/events/EventDetail';
import EventCreate from './pages/events/EventCreate';
import EventEdit from './pages/events/EventEdit';
import OrganizerList from './pages/organizers/OrganizerList';
import VenueList from './pages/venues/VenueList';
import ParticipantList from './pages/participants/ParticipantList';
import TagList from './pages/tags/TagList';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return !token ? children : <Navigate to="/dashboard" />;
};

const Layout = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

function App() {
    return (
        <Routes>
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />

            {/* Events - urutan penting: create sebelum :id */}
            <Route path="/events/create" element={<PrivateRoute><Layout><EventCreate /></Layout></PrivateRoute>} />
            <Route path="/events/:id/edit" element={<PrivateRoute><Layout><EventEdit /></Layout></PrivateRoute>} />
            <Route path="/events/:id" element={<PrivateRoute><Layout><EventDetail /></Layout></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><Layout><EventList /></Layout></PrivateRoute>} />

            {/* Other modules */}
            <Route path="/organizers/*" element={<PrivateRoute><Layout><OrganizerList /></Layout></PrivateRoute>} />
            <Route path="/venues/*" element={<PrivateRoute><Layout><VenueList /></Layout></PrivateRoute>} />
            <Route path="/participants/*" element={<PrivateRoute><Layout><ParticipantList /></Layout></PrivateRoute>} />
            <Route path="/tags/*" element={<PrivateRoute><Layout><TagList /></Layout></PrivateRoute>} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;