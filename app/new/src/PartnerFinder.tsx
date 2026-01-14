import React, { useState } from 'react';
import './PartnerFinder.css';

interface Profile {
  id: number;
  name: string;
  age: number;
  interests: string;
  lookingFor: string;
}

function PartnerFinder() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const addProfile = () => {
    if (!name.trim() || !age.trim() || !interests.trim() || !lookingFor.trim()) return;
    setProfiles([
      ...profiles,
      {
        id: profiles.length + 1,
        name,
        age: Number(age),
        interests,
        lookingFor
      }
    ]);
    setName('');
    setAge('');
    setInterests('');
    setLookingFor('');
  };

  return (
    <div className="partner-finder">
      <h2>Partner Finder</h2>
      <div className="profile-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Your Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Interests (comma separated)"
          value={interests}
          onChange={e => setInterests(e.target.value)}
        />
        <input
          type="text"
          placeholder="Looking for (e.g. friendship, relationship)"
          value={lookingFor}
          onChange={e => setLookingFor(e.target.value)}
        />
        <button onClick={addProfile}>Add Profile</button>
      </div>
      <div className="profiles-list">
        <h3>Available Profiles</h3>
        {profiles.length === 0 && <p>No profiles yet.</p>}
        <ul>
          {profiles.map(profile => (
            <li key={profile.id}>
              <b>{profile.name}</b> ({profile.age})<br />
              Interests: {profile.interests}<br />
              Looking for: {profile.lookingFor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PartnerFinder;
