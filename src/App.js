import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTicket from './pages/CreateTicket';
import MyTickets from './pages/MyTickets';
import AgentTickets from './pages/AgentTickets';
import TicketDetail from './pages/TicketDetail';
import TicketDetailCustomer from './pages/TicketDetailCustomer';

function Nav({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Ticket System</Link>
        <div className="d-flex">
          {!user && (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-success" to="/register">Register</Link>
            </>
          )}
          {user?.role === 'customer' && (
            <>
              <Link className="btn btn-primary me-2" to="/create">Create Ticket</Link>
              <Link className="btn btn-info me-2" to="/my">My Tickets</Link>
            </>
          )}
          {user?.role === 'agent' && (
            <Link className="btn btn-warning me-2" to="/agent">All Tickets</Link>
          )}
          {user && (
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);
  return (
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<div>Welcome to Ticket System</div>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/my" element={<MyTickets />} />
          <Route path="/agent" element={<AgentTickets />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/mytickets/:id" element={<TicketDetailCustomer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
