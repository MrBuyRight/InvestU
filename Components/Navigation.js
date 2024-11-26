import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ user }) {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">Financial Advisor</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/documents">Documents</Link>
        <Link to="/calculators">Financial Tools</Link>
        {user ? (
          <div className="user-menu">
            <span>Welcome, {user.full_name}</span>
            <button className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
