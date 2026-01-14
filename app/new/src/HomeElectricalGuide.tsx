import React, { useState } from 'react';
import './HomeElectricalGuide.css';

const guides = [
  {
    id: 1,
    appliance: 'Ceiling Fan',
    steps: [
      'Turn off the power supply at the circuit breaker.',
      'Assemble the fan according to the manual.',
      'Mount the bracket to the ceiling box.',
      'Connect the wires: match colors (black to black, white to white, green to ground).',
      'Secure the fan to the bracket.',
      'Attach blades and light kit if included.',
      'Restore power and test the fan.'
    ]
  },
  {
    id: 2,
    appliance: 'Light Bulb',
    steps: [
      'Turn off the light switch.',
      'Remove the old bulb by unscrewing it counterclockwise.',
      'Insert the new bulb and screw it in clockwise.',
      'Turn on the switch to test.'
    ]
  },
  {
    id: 3,
    appliance: 'Wall Socket',
    steps: [
      'Turn off the power at the circuit breaker.',
      'Unscrew and remove the old socket faceplate.',
      'Disconnect the wires from the old socket.',
      'Connect the wires to the new socket (live, neutral, earth).',
      'Secure the new socket and attach the faceplate.',
      'Restore power and test the socket.'
    ]
  }
];

function HomeElectricalGuide() {
  const [selected, setSelected] = useState<number>(guides[0].id);

  const currentGuide = guides.find(g => g.id === selected);

  return (
    <div className="home-electrical-guide">
      <h2>Home Electrical Installation Guide</h2>
      <div className="appliance-select">
        <label>Select Appliance:</label>
        <select value={selected} onChange={e => setSelected(Number(e.target.value))}>
          {guides.map(g => (
            <option key={g.id} value={g.id}>{g.appliance}</option>
          ))}
        </select>
      </div>
      <div className="steps-section">
        <h3>Installation Steps</h3>
        <ol>
          {currentGuide?.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default HomeElectricalGuide;
