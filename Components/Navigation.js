import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{
      background: 'white',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          textDecoration: 'none', 
          color: '#333' 
        }}>
          InvestU
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
