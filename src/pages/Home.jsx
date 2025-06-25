import React, { useState } from 'react';
import spotifyLogo from '../assets/Spotify_Logo.png';
import './Home.css';
import uyireImage from '../assets/image.jpeg';
import uyireAudio from '../assets/Uyire.mp3';
import { useNavigate } from 'react-router-dom';

const tamilSong = {
  title: 'Uyire',
  artist: 'Yuvan Shankar Raja',
  cover: uyireImage,
  audio: uyireAudio
};

const albumSections = [
  { title: 'Popular Albums', key: 'popular' },
  { title: 'Trending Albums', key: 'trending' },
  { title: 'Tamil Songs', key: 'tamil' },
];

const placeholderAlbums = [
  { title: 'Album 1', artist: 'Artist 1', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 2', artist: 'Artist 2', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 3', artist: 'Artist 3', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 4', artist: 'Artist 4', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 5', artist: 'Artist 5', cover: 'https://via.placeholder.com/150' },
];

const Home = () => {
  const [theme, setTheme] = useState('dark');
  const [currentSong, setCurrentSong] = useState(null);
  const navigate = useNavigate();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handlePlayTamilSong = () => {
    setCurrentSong(tamilSong);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`spotify-app-container expanded-height ${theme}-theme`}>
      {/* Sidebar */}
      <aside className="spotify-sidebar">
        <div className="sidebar-logo-row">
          <img src={spotifyLogo} alt="Spotify Logo" className="sidebar-logo" />
          <span className="sidebar-home-emoji" title="Home">🏠</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="spotify-main-content">
        {/* Top Bar */}
        <header className="spotify-topbar improved-topbar">
          <div className="topbar-section topbar-left">
            <input className="spotify-search" type="text" placeholder="What do you want to play?" />
          </div>
          <div className="topbar-section topbar-center">
            <img src={spotifyLogo} alt="Spotify Logo" className="topbar-logo" />
          </div>
          <div className="topbar-section topbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            <button className="logout-btn" onClick={handleLogout} title="Logout">Logout</button>
          </div>
        </header>

        {/* Album Sections */}
        <div className="album-sections">
          {/* Popular Albums - only one Tamil album */}
          <div className="album-section" key="popular">
            <h2>Popular Albums</h2>
            <div className="album-cards">
              <div className="album-card" onClick={handlePlayTamilSong} style={{ cursor: 'pointer' }}>
                <img src={tamilSong.cover} alt={tamilSong.title} className="album-cover" />
                <div className="album-info">
                  <div className="album-title">{tamilSong.title}</div>
                  <div className="album-artist">{tamilSong.artist}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Other sections remain as placeholders */}
          {albumSections.filter(section => section.key !== 'popular').map(section => (
            <div className="album-section" key={section.key}>
              <h2>{section.title}</h2>
              <div className="album-cards">
                {placeholderAlbums.map((album, idx) => (
                  <div className="album-card" key={idx}>
                    <img src={album.cover} alt={album.title} className="album-cover" />
                    <div className="album-info">
                      <div className="album-title">{album.title}</div>
                      <div className="album-artist">{album.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Player */}
      {currentSong && (
        <footer className={`footer-player ${theme}-theme`}>
          <img src={currentSong.cover} alt={currentSong.title} />
          <div className="footer-song-info">
            <div className="footer-song-title">{currentSong.title}</div>
            <div className="footer-song-artist">{currentSong.artist}</div>
          </div>
          <audio src={currentSong.audio} controls autoPlay />
        </footer>
      )}
    </div>
  );
};

export default Home; 