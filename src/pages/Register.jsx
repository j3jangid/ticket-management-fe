import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { name, email, password, role });
            alert('Registered successfully. Now login.');
            setName('')
            setEmail('')
            setPassword('')
            setRole('customer')
            navigate('/login')
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-3">Register</h3>
            <form onSubmit={submit} className="card p-3 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
}
