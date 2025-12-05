import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateTicket() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Technical');
    const [priority, setPriority] = useState('low');
    const [autoPriority, setAutoPriority] = useState(true);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const submit = async () => {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        fd.append('category', category);
        if (!autoPriority) fd.append('priority', priority);
        fd.append('autoPriority', autoPriority ? 'true' : 'false');
        for (const f of files) fd.append('attachments', f);

        try {
            const res = await api.post('/tickets', fd, { headers: { "Content-Type": "multipart/form-data" } });
            alert('Ticket created: ' + res?.data?.data?.title);

            // ✅ Reset form fields
            setTitle('');
            setDescription('');
            setCategory('Technical');
            setPriority('low');
            setAutoPriority(true);
            setFiles([]);

            // ✅ Redirect to ticket view page
            navigate(`/mytickets/${res?.data?.data?._id}`);
        } catch (err) {
            alert(err?.response?.data?.message || 'Ticket creation failed');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-3">Create Ticket</h3>
            <div className="card p-3 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option>Billing</option><option>Technical</option><option>Account</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} disabled={autoPriority}>
                        <option>low</option><option>medium</option><option>high</option>
                    </select>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" checked={autoPriority} onChange={(e) => setAutoPriority(e.target.checked)} />
                    <label className="form-check-label">Auto priority</label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Attachments</label>
                    <input className="form-control" type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
                </div>
                <button className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
        </div>
    );
}
