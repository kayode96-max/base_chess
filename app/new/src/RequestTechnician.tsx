import React, { useState } from 'react';
import { useNotification } from './NotificationContext';
import './RequestTechnician.css';

interface Request {
  id: number;
  name: string;
  issue: string;
  technician: string;
  status: 'pending' | 'accepted' | 'completed';
}

const technicians = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'AC Repair',
  'General Maintenance'
];

function RequestTechnician() {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [technician, setTechnician] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const { showNotification } = useNotification();

  const submitRequest = () => {
    if (!name.trim() || !issue.trim() || !technician.trim()) return;
    setRequests([
      ...requests,
      {
        id: requests.length + 1,
        name,
        issue,
        technician,
        status: 'pending'
      }
    ]);
    setName('');
    setIssue('');
    setTechnician('');
    showNotification('Technician request submitted!');
  };

  const acceptRequest = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  };

  const completeRequest = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'completed' } : r));
  };

  return (
    <div className="request-technician-app">
      <h2>Request a Technician</h2>
      <div className="request-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Describe the Issue"
          value={issue}
          onChange={e => setIssue(e.target.value)}
        />
        <select value={technician} onChange={e => setTechnician(e.target.value)}>
          <option value="">Select Technician</option>
          {technicians.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button onClick={submitRequest}>Request</button>
      </div>
      <div className="requests-list">
        <h3>Requests</h3>
        {requests.length === 0 && <p>No requests yet.</p>}
        {requests.map(req => (
          <div key={req.id} className={`request ${req.status}`}>
            <span>{req.name} - {req.technician} for: {req.issue}</span>
            <span>Status: {req.status}</span>
            {req.status === 'pending' && (
              <button onClick={() => acceptRequest(req.id)}>Accept</button>
            )}
            {req.status === 'accepted' && (
              <button onClick={() => completeRequest(req.id)}>Complete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestTechnician;
