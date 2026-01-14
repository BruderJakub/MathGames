import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NumGuessrGame from './pages/NumGuessrGame.jsx';
import './App.css';
import DiceRollerGame from "./pages/DiceRollerGame.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
        <> {/* Use a React Fragment to return multiple elements */}

            {/* HEADER: This is now the outermost container for your nav */}
            <header>
                <nav className="navbar">
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <li>
                            {/* Use a function in onClick to close menu *after* navigating */}
                            <Link to="/" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/numguessrgame" onClick={toggleMenu}>NumGuessr</Link>
                        </li>
                        <li>
                            <Link to="/dicerollrgame" onClick={toggleMenu}>DiceRoller</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* MAIN CONTENT: This wrapper now only holds your page content */}
            <main className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/numguessrgame" element={<NumGuessrGame />} />
                    <Route path="/dicerollrgame" element={<DiceRollerGame />} />
                </Routes>
            </main>

        </>
    );
}

export default App;