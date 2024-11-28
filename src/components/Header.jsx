// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/userDashBoard">Home</Link></li>
        <li><Link to="/create-property">Register Property</Link></li>
        <li><Link to="/manage-properties">Manage Properties</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
