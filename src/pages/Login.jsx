import React, { useState } from 'react';
import './Login.css';
import spotifyLogo from '../assets/Spotify_Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
        setIsSuccess(true);
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/home'), 500); // Redirect after short delay
      } else {
        setMessage(data.message || 'Login failed');
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('Server error');
      setIsSuccess(false);
    }
  };

  return (
    <div className="spotify-login-container">
      <form className="spotify-login-form" onSubmit={handleSubmit}>
        <img
          src={spotifyLogo}
          alt="Spotify Logo"
          className="spotify-logo"
        />
        <h2>Log in to Spotify</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="login-btn">Log In</button>
        {message && <div style={{ marginTop: 10, color: isSuccess ? 'green' : 'red' }}>{message}</div>}
        <div className="login-links">
          <a href="#">Forgot your password?</a>
        </div>
        <div className="divider"><span>or</span></div>
        <Link to="/signup" className="signup-btn">Sign up for Spotify</Link>
      </form>
    </div>
  );
};

export default Login; 