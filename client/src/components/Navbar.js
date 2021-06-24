// white navbar
import React from 'react';
import { Link } from 'react-router-dom';
import LogInOutButton from './LogInOutButton';

function Navbar({ children }) {
    return (
        <div className="navbar">
            <nav className="navbar__nav">
                <ul className="navbar__navlist">
                    <li>
                        <Link to="/" className="navbar__navitem">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="navbar__navitem">
                            Profile
                        </Link>
                    </li>
                </ul>
            </nav>
            <LogInOutButton />
        </div>
    );
}

export default Navbar;
