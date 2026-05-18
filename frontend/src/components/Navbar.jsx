import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = async () => {
        try { await api.post('/auth/logout'); } catch (e) {}
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname.startsWith(path);

    const navLinkStyle = (path) => ({
        color: 'white',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '14px',
        padding: '6px 2px',
        borderBottom: isActive(path) ? '2px solid white' : '2px solid transparent',
        transition: 'border-color 0.2s',
    });

    return (
        <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.brand}>🎪 Event Management</Link>
            <div style={styles.menu}>
                <Link to="/dashboard" style={navLinkStyle('/dashboard')}
                    onMouseEnter={e => { if (!isActive('/dashboard')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                    onMouseLeave={e => { if (!isActive('/dashboard')) e.target.style.borderBottomColor = 'transparent'; }}>
                    Dashboard
                </Link>
                <Link to="/events" style={navLinkStyle('/events')}
                    onMouseEnter={e => { if (!isActive('/events')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                    onMouseLeave={e => { if (!isActive('/events')) e.target.style.borderBottomColor = 'transparent'; }}>
                    Events
                </Link>
                {(user.role === 'admin' || user.role === 'organizer') && (
                    <Link to="/organizers" style={navLinkStyle('/organizers')}
                        onMouseEnter={e => { if (!isActive('/organizers')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                        onMouseLeave={e => { if (!isActive('/organizers')) e.target.style.borderBottomColor = 'transparent'; }}>
                        Organizers
                    </Link>
                )}
                {user.role === 'admin' && (
                    <>
                        <Link to="/venues" style={navLinkStyle('/venues')}
                            onMouseEnter={e => { if (!isActive('/venues')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                            onMouseLeave={e => { if (!isActive('/venues')) e.target.style.borderBottomColor = 'transparent'; }}>
                            Venues
                        </Link>
                        <Link to="/participants" style={navLinkStyle('/participants')}
                            onMouseEnter={e => { if (!isActive('/participants')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                            onMouseLeave={e => { if (!isActive('/participants')) e.target.style.borderBottomColor = 'transparent'; }}>
                            Participants
                        </Link>
                        <Link to="/tags" style={navLinkStyle('/tags')}
                            onMouseEnter={e => { if (!isActive('/tags')) e.target.style.borderBottomColor = 'rgba(255,255,255,0.5)'; }}
                            onMouseLeave={e => { if (!isActive('/tags')) e.target.style.borderBottomColor = 'transparent'; }}>
                            Tags
                        </Link>
                    </>
                )}
            </div>
            <div style={styles.right}>
                <span style={styles.userInfo}>
                    👤 {user.name}
                    <span style={styles.role}>[{user.role}]</span>
                </span>
                <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', backgroundColor: '#1e40af', color: 'white', position: 'sticky', top: 0, zIndex: 100 },
    brand: { fontWeight: 'bold', fontSize: '18px', color: 'white', textDecoration: 'none', whiteSpace: 'nowrap' },
    menu: { display: 'flex', gap: '20px', alignItems: 'center' },
    right: { display: 'flex', alignItems: 'center', gap: '16px', whiteSpace: 'nowrap' },
    userInfo: { fontSize: '14px' },
    role: { marginLeft: '6px', backgroundColor: '#3b82f6', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' },
    btn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' },
};

export default Navbar;