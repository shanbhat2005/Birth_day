import React, { useState } from 'react';
import GiftBoxIntro from './components/GiftBoxIntro';
import CelebrationHero from './components/CelebrationHero';
import BirthdayCake from './components/BirthdayCake';
import LetterCard from './components/LetterCard';
import MusicPlayer from './components/MusicPlayer';
import { RotateCcw, Heart } from 'lucide-react';
import { startHappyBirthdayMusic, stopHappyBirthdayMusic, playSparkleSound } from './utils/audioEffects';

export default function App() {
  const [view, setView] = useState('intro'); // 'intro' | 'celebration'
  const [birthdayName, setBirthdayName] = useState('Muskan');

  const handleOpenGift = () => {
    setView('celebration');
    // Start background music smoothly on unboxing
    setTimeout(() => {
      startHappyBirthdayMusic();
    }, 400);
  };

  const handleResetToGift = () => {
    stopHappyBirthdayMusic();
    playSparkleSound();
    setView('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {view === 'intro' ? (
        <GiftBoxIntro onOpenGift={handleOpenGift} />
      ) : (
        <div style={{ paddingBottom: '80px', animation: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {/* Main Celebration Content */}
          <CelebrationHero 
            birthdayName={birthdayName} 
            onUpdateName={setBirthdayName} 
          />

          {/* Interactive Birthday Cake with Candle Blowout */}
          <BirthdayCake />

          {/* Wax-Sealed Unfolding Letter */}
          <LetterCard birthdayName={birthdayName} />

          {/* Floating Melodic Music Player */}
          <MusicPlayer />

          {/* Footer with Replay & Cheer */}
          <footer style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '24px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                onClick={handleResetToGift}
                className="glass-panel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <RotateCcw size={16} />
                <span>Replay Gift Unboxing 🎁</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Crafted with</span>
                <Heart size={16} fill="#ff3366" color="#ff3366" />
                <span>for the ultimate birthday celebration! ✨</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
