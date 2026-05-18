import { useState, useEffect } from 'react';
import api from '../../api/axios';

function VenueList() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({ name: '', city: '', address: '', capacity: '', status: 'available' });
    const [error, setError] = useState('');

    useEffect(() => { fetchVenues(); }, []);

    const fetchVenues = async () => {
        try {
            const res = await api.get('/venues');
            setVenues(Array.isArray(res.data) ? res.data : []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editData) {
                await api.put(`/venues/${editData.id}`, form);
            } else {
                await api.post('/venues', form);
            }
            setShowForm(false);
            setEditData(null);
            setForm({ name: '', city: '', address: '', capacity: '', status: 'available' });
            fetchVenues();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan');
        }
    };

    const handleEdit = (v) => {
        setEditData(v);
        setForm({ name: v.name, city: v.city || '', address: v.address || '', capacity: v.capacity || '', status: v.status || 'available' });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin hapus venue ini?')) return;
        try {
            await api.delete(`/venues/${id}`);
            fetchVenues();
        } catch (e) { alert('Gagal menghapus'); }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>📍 Manajemen Venue</h1>
                {user.role === 'admin' && (
                    <button onClick={() => { setShowForm(true); setEditData(null); setForm({ name: '', city: '', address: '', capacity: '', status: 'available' }); }} style={styles.btnAdd}>
                        + Tambah Venue
                    </button>
                )}
            </div>

            {showForm && (
                <div style={styles.formCard}>
                    <h2 style={styles.formTitle}>{editData ? 'Edit Venue' : 'Tambah Venue'}</h2>
                    {error && <div style={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGrid}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nama Venue</label>
                                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={styles.input} required />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Kota</label>
                                <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} style={styles.input} required />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Alamat</label>
                                <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={styles.input} />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Kapasitas</label>
                                <input type="number" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} style={styles.input} required />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Status</label>
                                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={styles.input}>
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                        <div style={styles.btnRow}>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.btnCancel}>Batal</button>
                            <button type="submit" style={styles.btnSubmit}>Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.tableWrap}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}>No</th>
                            <th style={styles.th}>Nama</th>
                            <th style={styles.th}>Kota</th>
                            <th style={styles.th}>Kapasitas</th>
                            <th style={styles.th}>Status</th>
                            {user.role === 'admin' && <th style={styles.th}>Aksi</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {venues.length === 0 ? (
                            <tr><td colSpan="6" style={styles.empty}>Belum ada data venue</td></tr>
                        ) : venues.map((v, i) => (
                            <tr key={v.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                                <td style={styles.td}>{i + 1}</td>
                                <td style={styles.td}>{v.name}</td>
                                <td style={styles.td}>{v.city}</td>
                                <td style={styles.td}>{v.capacity} orang</td>
                                <td style={styles.td}>
                                    <span style={{...styles.badge, backgroundColor: v.status === 'available' ? '#10b981' : '#94a3b8'}}>
                                        {v.status}
                                    </span>
                                </td>
                                {user.role === 'admin' && (
                                    <td style={styles.td}>
                                        <button onClick={() => handleEdit(v)} style={styles.btnEdit}>Edit</button>
                                        <button onClick={() => handleDelete(v.id)} style={styles.btnDelete}>Hapus</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
    btnAdd: { padding: '10px 20px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    loading: { textAlign: 'center', padding: '60px', color: '#64748b' },
    formCard: { backgroundColor: 'white', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px' },
    formTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    field: { marginBottom: '8px' },
    label: { display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151', fontSize: '14px' },
    input: { width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
    btnRow: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' },
    btnCancel: { padding: '8px 20px', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    btnSubmit: { padding: '8px 20px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    tableWrap: { backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thead: { backgroundColor: '#1e40af' },
    th: { padding: '12px 16px', textAlign: 'left', color: 'white', fontSize: '14px', fontWeight: '600' },
    td: { padding: '12px 16px', fontSize: '14px', color: '#1e293b' },
    trEven: { backgroundColor: 'white' },
    trOdd: { backgroundColor: '#f8fafc' },
    empty: { padding: '32px', textAlign: 'center', color: '#64748b' },
    badge: { color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' },
    btnEdit: { padding: '4px 12px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', fontSize: '13px' },
    btnDelete: { padding: '4px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' },
};

export default VenueList;