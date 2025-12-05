import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await api.get('/tickets/my');
                setTickets(res?.data?.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to load tickets');
            }
        };
        fetchTickets();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">My Tickets</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets?.map(t => (
                            <tr key={t._id}>
                                <td>{t.title}</td>
                                <td>{t.status}</td>
                                <td>{t.priority}</td>
                                <td>{t.category}</td>
                                <td>
                                    <Link to={`/mytickets/${t._id}`} className="btn btn-sm btn-outline-primary">
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
