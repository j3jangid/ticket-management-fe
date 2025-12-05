import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function TicketDetailCustomer() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    const load = async () => {
        try {
            const res = await api.get(`/tickets/${id}`);
            setData(res?.data?.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to load ticket');
        }
    };

    const addComment = async () => {
        try {
            await api.post(`/tickets/${id}/comment`, { message });
            setMessage('');
            await load();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add comment');
        }
    };

    useEffect(() => {
        load();
    }, [id]);

    if (!data) return <div className="container mt-5">Loading...</div>;

    const { ticket, comments } = data;

    return (
        <div className="container mt-5">
            <h3 className="mb-3">My Ticket Detail</h3>

            {/* ✅ Ticket Info */}
            <div className="card p-3 mb-3">
                <div><b>Title:</b> {ticket.title}</div>
                <div><b>Status:</b> {ticket.status}</div>
                <div><b>Priority:</b> {ticket.priority}</div>
                <div><b>Category:</b> {ticket.category}</div>

                {/* ✅ Attachments with Inline Image Preview */}
                <div className="mt-2">
                    <b>Attachments:</b>

                    <div className="d-flex flex-wrap mt-2">
                        {ticket.attachments?.length > 0 ? (
                            ticket.attachments.map((a) => {
                                const fileUrl = `${process.env.REACT_APP_API_URL}${a}`;
                                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(a);

                                return (
                                    <div key={a} className="me-2 mb-2">
                                        {isImage ? (
                                            <img
                                                src={fileUrl}
                                                alt="attachment"
                                                width="140"
                                                className="border rounded"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <a
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="d-block"
                                            >
                                                {a}
                                            </a>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-muted">No attachments</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Conversation Section */}
            <h4>Conversation</h4>
            <ul className="list-group mb-3">
                {comments?.map(c => (
                    <li
                        key={c._id}
                        className={`list-group-item ${c.authorRole === 'agent'
                                ? 'list-group-item-light'
                                : 'list-group-item-info'
                            }`}
                    >
                        <b>{c.authorId?.name || c.authorRole}:</b> {c.message}
                        <i className="ms-2">
                            ({new Date(c.createdAt).toLocaleString()})
                        </i>
                    </li>
                ))}
            </ul>

            {/* ✅ Reply Box */}
            <h4>Reply to Agent</h4>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your reply..."
                />
            </div>

            <button className="btn btn-primary" onClick={addComment}>
                Send Reply
            </button>
        </div>
    );
}
