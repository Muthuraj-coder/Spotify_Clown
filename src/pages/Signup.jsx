import React, { useState } from 'react';
import './Login.css';
import spotifyLogo from '../assets/Spotify_Logo.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! You can now log in.');
        setIsSuccess(true);
        setName(''); setEmail(''); setPassword('');
      } else {
        setMessage(data.message || 'Signup failed');
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
        <h2>Sign up for Spotify</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
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
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="login-btn">Sign Up</button>
        {message && <div style={{ marginTop: 10, color: isSuccess ? 'green' : 'red' }}>{message}</div>}
        <div className="login-links">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup; 