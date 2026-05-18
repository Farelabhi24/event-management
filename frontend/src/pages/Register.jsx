import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', role: 'participant' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(', '));
            } else {
                setError(err.response?.data?.message || 'Register gagal');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🎪 Event Management</h2>
                <h3 style={styles.subtitle}>Register</h3>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nama</label>
                        <input name="name" value={form.name} onChange={handleChange}
                            style={styles.input} placeholder="Nama lengkap" required />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                            style={styles.input} placeholder="email@example.com" required />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input name="password" type="password" value={form.password} onChange={handleChange}
                            style={styles.input} placeholder="Min. 6 karakter" required />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Konfirmasi Password</label>
                        <input name="password_confirmation" type="password" value={form.password_confirmation}
                            onChange={handleChange} style={styles.input} placeholder="Ulangi password" required />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Role</label>
                        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
                            <option value="participant">Participant</option>
                            <option value="organizer">Organizer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.btn} disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                <p style={styles.footer}>
                    Sudah punya akun? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    title: { textAlign: 'center', color: '#1e40af', marginBottom: '4px' },
    subtitle: { textAlign: 'center', color: '#64748b', marginBottom: '24px', fontWeight: 'normal' },
    error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' },
    field: { marginBottom: '16px' },
    label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', marginTop: '8px' },
    footer: { textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px' },
};

export default Register;