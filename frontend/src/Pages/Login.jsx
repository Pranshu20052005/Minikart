import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'user') {
      navigate('/');
    } else if (role === 'admin') {
      navigate('/admin/');
    } else {
      setError('Please type "user" or "admin"');
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: 300, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Simple Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type 'user' or 'admin'"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>Login</button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;