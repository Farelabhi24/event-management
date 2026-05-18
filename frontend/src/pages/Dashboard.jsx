import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [stats, setStats] = useState({ events: 0, organizers: 0, venues: 0, registrations: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [events, organizers, venues, registrations] = await Promise.all([
                    api.get('/events'),
                    api.get('/organizers'),
                    api.get('/venues'),
                    api.get('/registrations'),
                ]);
                setStats({
                    events: Array.isArray(events.data) ? events.data.length : 0,
                    organizers: Array.isArray(organizers.data) ? organizers.data.length : 0,
                    venues: Array.isArray(venues.data) ? venues.data.length : 0,
                    registrations: Array.isArray(registrations.data) ? registrations.data.length : 0,
                });
            } catch (e) {
                console.error('Stats error:', e);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Dashboard</h1>
                <p style={styles.welcome}>Selamat datang, <strong>{user.name}</strong>! Role: <span style={styles.role}>{user.role}</span></p>
            </div>

            <div style={styles.grid}>
                <div style={{...styles.card, borderTop: '4px solid #3b82f6'}}>
                    <div style={styles.cardIcon}>🎪</div>
                    <div style={styles.cardNum}>{stats.events}</div>
                    <div style={styles.cardLabel}>Total Events</div>
                    <Link to="/events" style={styles.cardLink}>Lihat semua →</Link>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #10b981'}}>
                    <div style={styles.cardIcon}>🏢</div>
                    <div style={styles.cardNum}>{stats.organizers}</div>
                    <div style={styles.cardLabel}>Total Organizers</div>
                    {(user.role === 'admin' || user.role === 'organizer') && (
                        <Link to="/organizers" style={styles.cardLink}>Lihat semua →</Link>
                    )}
                </div>
                <div style={{...styles.card, borderTop: '4px solid #f59e0b'}}>
                    <div style={styles.cardIcon}>📍</div>
                    <div style={styles.cardNum}>{stats.venues}</div>
                    <div style={styles.cardLabel}>Total Venues</div>
                    {user.role === 'admin' && (
                        <Link to="/venues" style={styles.cardLink}>Lihat semua →</Link>
                    )}
                </div>
                <div style={{...styles.card, borderTop: '4px solid #ef4444'}}>
                    <div style={styles.cardIcon}>👥</div>
                    <div style={styles.cardNum}>{stats.registrations}</div>
                    <div style={styles.cardLabel}>Total Registrations</div>
                </div>
            </div>

            <div style={styles.actions}>
                <h2 style={styles.actionTitle}>Quick Actions</h2>
                <div style={styles.actionBtns}>
                    <Link to="/events" style={{...styles.actionBtn, backgroundColor: '#3b82f6'}}>🎪 Lihat Events</Link>
                    {(user.role === 'admin' || user.role === 'organizer') && (
                        <Link to="/events/create" style={{...styles.actionBtn, backgroundColor: '#10b981'}}>+ Tambah Event</Link>
                    )}
                    {user.role === 'admin' && (
                        <>
                            <Link to="/organizers" style={{...styles.actionBtn, backgroundColor: '#8b5cf6'}}>🏢 Organizers</Link>
                            <Link to="/venues" style={{...styles.actionBtn, backgroundColor: '#f59e0b'}}>📍 Venues</Link>
                            <Link to="/participants" style={{...styles.actionBtn, backgroundColor: '#ef4444'}}>👤 Participants</Link>
                            <Link to="/tags" style={{...styles.actionBtn, backgroundColor: '#06b6d4'}}>🏷️ Tags</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
    header: { marginBottom: '32px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
    welcome: { color: '#64748b', marginTop: '8px' },
    role: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 10px', borderRadius: '12px', fontSize: '13px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' },
    card: { backgroundColor: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' },
    cardIcon: { fontSize: '32px', marginBottom: '8px' },
    cardNum: { fontSize: '36px', fontWeight: 'bold', color: '#1e293b' },
    cardLabel: { color: '#64748b', fontSize: '14px', marginTop: '4px' },
    cardLink: { display: 'inline-block', marginTop: '12px', color: '#3b82f6', fontSize: '13px' },
    actions: { backgroundColor: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    actionTitle: { margin: '0 0 16px', color: '#1e293b' },
    actionBtns: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    actionBtn: { display: 'inline-block', padding: '10px 20px', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px' },
};

export default Dashboard;