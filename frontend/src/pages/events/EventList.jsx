import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function EventList() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchEvents(); }, []);

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(Array.isArray(res.data) ? res.data : []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus event ini?')) return;
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter(e => e.id !== id));
        } catch (e) { alert('Gagal menghapus event'); }
    };

    const statusColor = (status) => {
        if (status === 'open') return '#10b981';
        if (status === 'closed') return '#ef4444';
        return '#f59e0b';
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🎪 Daftar Event</h1>
                {(user.role === 'admin' || user.role === 'organizer') && (
                    <Link to="/events/create" style={styles.btnAdd}>+ Tambah Event</Link>
                )}
            </div>
            {events.length === 0 ? (
                <div style={styles.empty}>Belum ada event.</div>
            ) : (
                <div style={styles.grid}>
                    {events.map(event => (
                        <div key={event.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.cardTitle}>{event.name}</h3>
                                <span style={{...styles.badge, backgroundColor: statusColor(event.status)}}>
                                    {event.status}
                                </span>
                            </div>
                            <p style={styles.cardDesc}>{event.description?.substring(0, 100)}...</p>
                            <div style={styles.cardMeta}>
                                <span>📅 {new Date(event.event_date).toLocaleDateString('id-ID')}</span>
                                <span>👥 Kuota: {event.quota}</span>
                            </div>
                            <div style={styles.cardActions}>
                                <Link to={`/events/${event.id}`} style={styles.btnDetail}>Detail</Link>
                                {(user.role === 'admin' || user.role === 'organizer') && (
                                    <Link to={`/events/${event.id}/edit`} style={styles.btnEdit}>Edit</Link>
                                )}
                                {user.role === 'admin' && (
                                    <button onClick={() => handleDelete(event.id)} style={styles.btnDelete}>Hapus</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
    btnAdd: { padding: '10px 20px', backgroundColor: '#1e40af', color: 'white', borderRadius: '6px', textDecoration: 'none' },
    loading: { textAlign: 'center', padding: '60px', color: '#64748b' },
    empty: { textAlign: 'center', padding: '60px', color: '#64748b' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
    card: { backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
    cardTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b', margin: 0, flex: 1 },
    badge: { color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', marginLeft: '8px', whiteSpace: 'nowrap' },
    cardDesc: { color: '#64748b', fontSize: '14px', marginBottom: '12px' },
    cardMeta: { display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '16px' },
    cardActions: { display: 'flex', gap: '8px' },
    btnDetail: { padding: '6px 14px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' },
    btnEdit: { padding: '6px 14px', backgroundColor: '#f59e0b', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' },
    btnDelete: { padding: '6px 14px', backgroundColor: '#ef4444', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px' },
};

export default EventList;