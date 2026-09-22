import React, { useState } from 'react';
import { Sparkles, Heart, Star, Edit3, Check, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playPartyHorn, playSparkleSound } from '../utils/audioEffects';

export default function CelebrationHero({ birthdayName, onUpdateName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(birthdayName);

  // Floating balloons that users can interactively pop
  const [balloons, setBalloons] = useState([
    { id: 1, color: '#ff3366', left: '4%', delay: '0s', size: 46, text: '🎈' },
    { id: 2, color: '#00f2fe', left: '24%', delay: '2s', size: 48, text: '🎉' },
    { id: 3, color: '#ffd166', left: '72%', delay: '1s', size: 44, text: '⭐' },
    { id: 4, color: '#a855f7', left: '88%', delay: '3s', size: 46, text: '💖' },
  ]);

  const handleNameSave = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditing(false);
    playSparkleSound();
  };

  const popBalloon = (id, event) => {
    playPopSound();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#ff3366', '#ffd166', '#00f2fe', '#a855f7']
    });

    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  const launchConfettiCannon = (type) => {
    playPartyHorn();
    if (type === 'stars') {
      confetti({
        particleCount: 50,
        spread: 360,
        shapes: ['star'],
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C'],
        origin: { y: 0.5 }
      });
    } else if (type === 'hearts') {
      confetti({
        particleCount: 45,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#ff3366', '#ff758c', '#ff7eb3']
      });
    } else {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div style={{
      position: 'relative',
      padding: 'clamp(24px, 5vw, 40px) clamp(12px, 3vw, 20px) 16px',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Interactive Poppable Floating Balloons */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '160px',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        {balloons.map((b) => (
          <button
            key={b.id}
            onClick={(e) => popBalloon(b.id, e)}
            className="balloon animate-float"
            title="Click to pop!"
            style={{
              position: 'absolute',
              left: b.left,
              top: '10px',
              animationDelay: b.delay,
              background: 'transparent',
              border: 'none',
              fontSize: `${b.size}px`,
              cursor: 'pointer',
              pointerEvents: 'auto',
              filter: `drop-shadow(0 8px 16px ${b.color}88)`
            }}
          >
            {b.text}
          </button>
        ))}
      </div>

      {/* Main Hero Header */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        
        {/* Decorative Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '9999px',
          marginBottom: '16px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
        }}>
          <Sparkles size={16} color="#ffd166" />
          <span style={{
            fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-gold)'
          }}>
            Today is All About You!
          </span>
          <Sparkles size={16} color="#ffd166" />
        </div>

        {/* Big Happy Birthday Typography */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.3rem, 7.5vw, 5.2rem)',
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          marginBottom: '12px',
          textShadow: '0 10px 40px rgba(255, 51, 102, 0.4)'
        }}>
          HAPPY <span className="text-gradient-festive">BIRTHDAY!</span> 🎂
        </h1>

        {/* Name Customization Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          {isEditing ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                placeholder="Enter Name..."
                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  width: '200px'
                }}
              />
              <button
                onClick={handleNameSave}
                style={{
                  background: '#10b981',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => setIsEditing(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '8px 24px',
                background: 'linear-gradient(135deg, rgba(255,51,102,0.2) 0%, rgba(121,40,202,0.2) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '9999px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
              title="Click to change name"
            >
              <h2 style={{
                fontFamily: 'var(--font-cursive)',
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                color: '#fff',
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: 1
              }}>
                Dearest {birthdayName} ✨
              </h2>
              <Edit3 size={18} color="rgba(255,255,255,0.7)" />
            </div>
          )}
        </div>

        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-muted)',
          maxWidth: '620px',
          margin: '0 auto 30px auto',
          lineHeight: 1.6
        }}>
          Wishing you a magnificent year filled with boundless joy, glorious adventures, endless laughter, and all your biggest dreams fulfilled! 🌟
        </p>

        {/* Quick Celebration Interactive Cannons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => launchConfettiCannon('standard')}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              borderRadius: '9999px'
            }}
          >
            <PartyPopper size={18} color="#ff3366" />
            <span>Confetti Blast</span>
          </button>

          <button
            onClick={() => launchConfettiCannon('stars')}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              borderRadius: '9999px'
            }}
          >
            <Star size={18} color="#ffd166" fill="#ffd166" />
            <span>Golden Stars</span>
          </button>

          <button
            onClick={() => launchConfettiCannon('hearts')}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              borderRadius: '9999px'
            }}
          >
            <Heart size={18} color="#ff3366" fill="#ff3366" />
            <span>Love Burst</span>
          </button>
        </div>

      </div>
    </div>
  );
}
