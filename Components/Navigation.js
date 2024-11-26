import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ user }) {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
          InvestU
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user ? (
          <span style={{ color: '#007bff' }}>Welcome, {user.full_name}</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
