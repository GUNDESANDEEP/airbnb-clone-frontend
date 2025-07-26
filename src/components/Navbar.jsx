import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderBottom: '1px solid #ccc'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#333',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1em'
  };
  
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      {user ? (
        <>
          <Link to="/create-property" style={linkStyle}>Create Listing</Link>
          <span style={{ marginLeft: 'auto' }}>Welcome, {user.name}</span>
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{...linkStyle, marginLeft: 'auto'}}>Login</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link to="/dashboard" style={linkStyle}>My Dashboard</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;