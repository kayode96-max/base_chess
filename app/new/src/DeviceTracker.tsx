import React, { useState } from 'react';
import './DeviceTracker.css';

interface Device {
  id: number;
  name: string;
  lastLocation: string;
  status: 'lost' | 'found';
}

function DeviceTracker() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [name, setName] = useState('');
  const [lastLocation, setLastLocation] = useState('');

  const addDevice = () => {
    if (!name.trim() || !lastLocation.trim()) return;
    setDevices([
      ...devices,
      { id: devices.length + 1, name, lastLocation, status: 'lost' }
    ]);
    setName('');
    setLastLocation('');
  };

  const markFound = (id: number) => {
    setDevices(devices.map(d => d.id === id ? { ...d, status: 'found' } : d));
  };

  return (
    <div className="device-tracker">
      <h2>Lost Device Tracker</h2>
      <div className="device-form">
        <input
          type="text"
          placeholder="Device Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Known Location"
          value={lastLocation}
          onChange={e => setLastLocation(e.target.value)}
        />
        <button onClick={addDevice}>Report Lost Device</button>
      </div>
      <div className="devices-list">
        <h3>Tracked Devices</h3>
        {devices.length === 0 && <p>No lost devices reported yet.</p>}
        <ul>
          {devices.map(device => (
            <li key={device.id} className={device.status}>
              <span>{device.name} - Last seen at: {device.lastLocation}</span>
              <span>Status: {device.status}</span>
              {device.status === 'lost' && (
                <button onClick={() => markFound(device.id)}>Mark as Found</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeviceTracker;
