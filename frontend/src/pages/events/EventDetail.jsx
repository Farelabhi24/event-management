import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMsg, setRegisterMsg] = useState('');
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchEvent();
        if (user.role === 'participant') fetchParticipants();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
        } catch (e) {
            console.error(e);
            navigate('/events');
        } finally {
            setLoading(false);
        }
    };

    const fetchParticipants = async () => {
        try {
            const res = await api.get('/participants');
            setParticipants(Array.isArray(res.data) ? res.data : []);
        } catch (e) {}
    };

    const handleDelete = async () => {
        if (!window.confirm('Yakin ingin menghapus event ini?')) return;
        try {
            await api.delete(`/events/${id}`);
            navigate('/events');
        } catch (e) {
            alert('Gagal menghapus event');
        }
    };

    const handleRegister = async () => {
        setRegisterLoading(true);
        setRegisterMsg('');
        try {
            // Cari participant berdasarkan email user
            const myParticipant = participants.find(p => p.email === user.email);
            if (!myParticipant) {
                // Auto-create participant jika belum ada
                const newP = await api.post('/participants', {
                    name: user.name,
                    email: user.email,
                    phone: '-',
                });
                await api.post('/registrations', {
                    event_id: id,
                    participant_id: newP.data.id,
                });
            } else {
                await api.post('/registrations', {
                    event_id: id,
                    participant_id: myParticipant.id,
                });
            }
            setRegisterMsg('✅ Berhasil mendaftar event!');
            fetchEvent();
        } catch (e) {
            setRegisterMsg('❌ ' + (e.response?.data?.message || 'Gagal mendaftar'));
        } finally {
            setRegisterLoading(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (!event) return null;

    return (
        <div style={styles.container}>
            <div style={styles.backRow}>
                <Link to="/events" style={styles.back}>← Kembali ke Daftar Event</Link>
            </div>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h1 style={styles.title}>{event.name}</h1>
                    <span style={{...styles.badge, backgroundColor: event.status === 'open' ? '#10b981' : '#ef4444'}}>
                        {event.status}
                    </span>
                </div>

                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>📅 Tanggal</span>
                        <span style={styles.infoValue}>{new Date(event.event_date).toLocaleString('id-ID')}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>👥 Kuota</span>
                        <span style={styles.infoValue}>{event.quota} orang</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>🏢 Organizer</span>
                        <span style={styles.infoValue}>{event.organizer?.name || '-'}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>📍 Venue</span>
                        <span style={styles.infoValue}>
                            {event.venue?.name || '-'} {event.venue?.city ? `(${event.venue.city})` : ''}
                        </span>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Deskripsi</h3>
                    <p style={styles.desc}>{event.description || '-'}</p>
                </div>

                {event.tags?.length > 0 && (
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Tags</h3>
                        <div style={styles.tags}>
                            {event.tags.map(tag => (
                                <span key={tag.id} style={styles.tag}>{tag.name}</span>
                            ))}
                        </div>
                    </div>
                )}

                {event.registrations?.length > 0 && (
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Peserta Terdaftar ({event.registrations.length})</h3>
                    </div>
                )}

                {/* Tombol aksi berdasarkan role */}
                <div style={styles.actions}>
                    {user.role === 'participant' && event.status === 'open' && (
                        <div>
                            <button onClick={handleRegister} style={styles.btnRegister} disabled={registerLoading}>
                                {registerLoading ? 'Mendaftar...' : '📝 Daftar Event Ini'}
                            </button>
                            {registerMsg && (
                                <p style={{ marginTop: '8px', fontSize: '14px', color: registerMsg.startsWith('✅') ? '#10b981' : '#ef4444' }}>
                                    {registerMsg}
                                </p>
                            )}
                        </div>
                    )}
                    {(user.role === 'admin' || user.role === 'organizer') && (
                        <Link to={`/events/${event.id}/edit`} style={styles.btnEdit}>Edit Event</Link>
                    )}
                    {user.role === 'admin' && (
                        <button onClick={handleDelete} style={styles.btnDelete}>Hapus Event</button>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '800px', margin: '0 auto' },
    backRow: { marginBottom: '16px' },
    back: { color: '#3b82f6', textDecoration: 'none', fontSize: '14px' },
    loading: { textAlign: 'center', padding: '60px', color: '#64748b' },
    card: { backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
    badge: { color: 'white', padding: '4px 14px', borderRadius: '12px', fontSize: '13px', whiteSpace: 'nowrap' },
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px' },
    infoItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
    infoLabel: { fontSize: '12px', color: '#64748b' },
    infoValue: { fontSize: '15px', fontWeight: '500', color: '#1e293b' },
    section: { marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' },
    desc: { color: '#64748b', lineHeight: '1.6' },
    tags: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    tag: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '12px', fontSize: '13px' },
    actions: { display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', alignItems: 'center' },
    btnRegister: { padding: '10px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
    btnEdit: { padding: '10px 20px', backgroundColor: '#f59e0b', color: 'white', borderRadius: '6px', textDecoration: 'none' },
    btnDelete: { padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' },
};

export default EventDetail;