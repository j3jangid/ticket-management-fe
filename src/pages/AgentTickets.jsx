import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function AgentTickets() {
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({ status: '', priority: '', category: '', q: '' });

    const load = async () => {
        try {
            const qs = Object.entries(filters)
                .filter(([_, v]) => v)
                .map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
            const res = await api.get(`/tickets${qs ? '?' + qs : ''}`);
            setTickets(res?.data?.data);
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to load tickets');
        }
    };

    useEffect(() => { load(); }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">All Tickets (Agent)</h3>

            <div className="row mb-3">
                <div className="col-md-3">
                    <select className="form-select" value={filters.status} onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}>
                        <option value="">Status</option><option>open</option><option>in_progress</option><option>closed</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={filters.priority} onChange={(e) => setFilters(f => ({ ...f, priority: e.target.value }))}>
                        <option value="">Priority</option><option>low</option><option>medium</option><option>high</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={filters.category} onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}>
                        <option value="">Category</option><option>Billing</option><option>Technical</option><option>Account</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input className="form-control" placeholder="Search title" value={filters.q} onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))} />
                </div>
            </div>

            <button onClick={load} className="btn btn-secondary mb-3">Apply Filters</button>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Customer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(t => (
                            <tr key={t._id}>
                                <td>{t.title}</td>
                                <td>{t.status}</td>
                                <td>{t.priority}</td>
                                <td>{t.category}</td>
                                <td>{t.customerId?.name || '--'}</td>
                                <td>
                                    <Link to={`/tickets/${t._id}`} className="btn btn-sm btn-outline-primary">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
