import React, { useState } from 'react';
import "./test.css"
const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`overlay-navbar ${isOpen ? 'open' : ''}`}>
      <div className="overlay-navbar__toggle" onClick={handleToggle}>
        <span className="overlay-navbar__toggle-icon"></span>
      </div>
      {isOpen && (
      <ul className="overlay-navbar__menu">
        <li className="overlay-navbar__menu-item">Home</li>
        <li className="overlay-navbar__menu-item">About</li>
        <li className="overlay-navbar__menu-item">Services</li>
        <li className="overlay-navbar__menu-item">Contact</li>
      </ul>
      )}
    </nav>
  );
};

export default Test;
