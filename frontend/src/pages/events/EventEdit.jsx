import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

function EventEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', description: '', event_date: '',
        quota: '', status: 'open', organizer_id: '', venue_id: '',
    });
    const [organizers, setOrganizers] = useState([]);
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, orgRes, venRes] = await Promise.all([
                    api.get(`/events/${id}`),
                    api.get('/organizers'),
                    api.get('/venues'),
                ]);
                const event = eventRes.data;
                setForm({
                    name: event.name || '',
                    description: event.description || '',
                    event_date: event.event_date ? event.event_date.slice(0, 16) : '',
                    quota: event.quota || '',
                    status: event.status || 'open',
                    organizer_id: event.organizer_id || '',
                    venue_id: event.venue_id || '',
                });
                setOrganizers(Array.isArray(orgRes.data) ? orgRes.data : []);
                setVenues(Array.isArray(venRes.data) ? venRes.data : []);
            } catch (e) {
                console.error(e);
                alert('Gagal memuat data event');
                navigate('/events');
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.put(`/events/${id}`, form);
            navigate(`/events/${id}`);
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(', '));
            } else {
                setError(err.response?.data?.message || 'Gagal mengupdate event');
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.backRow}>
                <Link to={`/events/${id}`} style={styles.back}>← Kembali ke Detail Event</Link>
            </div>
            <div style={styles.card}>
                <h1 style={styles.title}>Edit Event</h1>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Judul Event</label>
                        <input name="name" value={form.name} onChange={handleChange}
                            style={styles.input} placeholder="Judul event" required />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Deskripsi</label>
                        <textarea name="description" value={form.description} onChange={handleChange}
                            style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                            placeholder="Deskripsi event" />
                    </div>
                    <div style={styles.row}>
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>Tanggal Event</label>
                            <input name="event_date" type="datetime-local" value={form.event_date}
                                onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>Kuota</label>
                            <input name="quota" type="number" value={form.quota}
                                onChange={handleChange} style={styles.input}
                                placeholder="Jumlah peserta" required />
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>Organizer</label>
                            <select name="organizer_id" value={form.organizer_id}
                                onChange={handleChange} style={styles.input} required>
                                <option value="">-- Pilih Organizer --</option>
                                {organizers.map(o => (
                                    <option key={o.id} value={o.id}>{o.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>Venue</label>
                            <select name="venue_id" value={form.venue_id}
                                onChange={handleChange} style={styles.input} required>
                                <option value="">-- Pilih Venue --</option>
                                {venues.map(v => (
                                    <option key={v.id} value={v.id}>{v.name} ({v.city})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Status</label>
                        <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div style={styles.btnRow}>
                        <Link to={`/events/${id}`} style={styles.btnCancel}>Batal</Link>
                        <button type="submit" style={styles.btnSubmit} disabled={loading}>
                            {loading ? 'Menyimpan...' : 'Update Event'}
                        </button>
                    </div>
                </form>
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
    title: { fontSize: '22px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' },
    field: { marginBottom: '16px' },
    label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151', fontSize: '14px' },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: 'white' },
    row: { display: 'flex', gap: '16px' },
    btnRow: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' },
    btnCancel: { padding: '10px 24px', backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '6px', textDecoration: 'none' },
    btnSubmit: { padding: '10px 24px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
};

export default EventEdit;