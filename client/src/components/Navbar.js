// white navbar
import React from 'react';
import { Link } from 'react-router-dom';
import LogInOutButton from './LogInOutButton';

function Navbar({ children }) {
    return (
        <div className="navbar">
            <nav className="navbar__nav">
                <div className="navbar__navitem">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar__navitem">
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>
            <LogInOutButton />
        </div>
    );
}

export default Navbar;
