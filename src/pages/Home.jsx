import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <div>
            <h1>Welcome to the GameHub!</h1>
            <p>Click the link below to start playing.</p>
        </div>
        <div className="links">
            <Link to="/numguessrgame" style={{display: 'block'}}>Play NumGuessr</Link>
            <Link to="/dicerollrgame" style={{display: 'block'}}>Start DiceRollr</Link>
        </div>
    </div>
  );
}

export default Home;
