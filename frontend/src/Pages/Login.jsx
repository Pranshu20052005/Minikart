import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.toLowerCase() === 'user') {
      navigate('/user');
    } else if (username.toLowerCase() === 'admin') {
      navigate('/admin/');
    } else {
      setError('Please enter "user" or "admin"');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Minikart</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Enter username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter 'user' or 'admin'"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="login-info">
          <p><strong>For User Access:</strong> Enter "user"</p>
          <p><strong>For Admin Access:</strong> Enter "admin"</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 