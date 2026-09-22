import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { startHappyBirthdayMusic, stopHappyBirthdayMusic } from '../utils/audioEffects';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      stopHappyBirthdayMusic();
      setIsPlaying(false);
    } else {
      startHappyBirthdayMusic();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopHappyBirthdayMusic();
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(14px, 3vh, 24px)',
      right: 'clamp(12px, 3vw, 24px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <button
        onClick={toggleMusic}
        className="glass-panel"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: 'clamp(8px, 2vw, 12px) clamp(14px, 3.5vw, 20px)',
          background: isPlaying 
            ? 'linear-gradient(135deg, rgba(255,51,102,0.9) 0%, rgba(121,40,202,0.9) 100%)'
            : 'rgba(15, 23, 42, 0.9)',
          border: isPlaying ? '1px solid #ff3366' : '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          borderRadius: '9999px',
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 0 25px rgba(255,51,102,0.5)' : '0 10px 25px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(16px)',
          transition: 'all 0.3s ease',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
        }}
        title={isPlaying ? "Mute Music" : "Play Happy Birthday Melody"}
      >
        {isPlaying ? (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
              <span style={{ width: '3px', height: '100%', background: '#fff', borderRadius: '2px', animation: 'flicker 0.6s infinite' }} />
              <span style={{ width: '3px', height: '60%', background: '#fff', borderRadius: '2px', animation: 'flicker 0.8s infinite 0.2s' }} />
              <span style={{ width: '3px', height: '80%', background: '#fff', borderRadius: '2px', animation: 'flicker 0.5s infinite 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Birthday Music: ON</span>
            <Volume2 size={18} />
          </>
        ) : (
          <>
            <Music size={18} color="#ffd166" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Play Birthday Tune 🎵</span>
            <VolumeX size={16} color="var(--text-muted)" />
          </>
        )}
      </button>
    </div>
  );
}
