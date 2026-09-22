import React, { useState } from 'react';
import { Heart, Sparkles, Edit, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSparkleSound } from '../utils/audioEffects';

export default function LetterCard({ birthdayName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState(
    `Dearest Muskan,\n\nToday is a celebration of the wonderful, extraordinary, and inspiring person that you are.\n\nThank you for bringing so much warmth, laughter, and light into our lives. May this special year be overflowing with boundless happiness, unforgettable adventures, peace of mind, great health, and all the immense success you truly deserve.\n\nKeep shining brighter than the stars! Always cheering for you.`
  );

  const toggleOpen = () => {
    if (!isOpen) {
      playSparkleSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd166', '#ff3366', '#ff7eb3']
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '680px',
      margin: '28px auto',
      padding: '0 clamp(8px, 3vw, 20px)'
    }}>
      <div className="glass-panel" style={{
        padding: 'clamp(24px, 5vw, 36px) clamp(16px, 4vw, 24px)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-gold)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            <Heart size={16} fill="#ffd166" color="#ffd166" />
            <span>Special Message</span>
            <Heart size={16} fill="#ffd166" color="#ffd166" />
          </div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
            fontWeight: 800,
            color: '#fff'
          }}>
            A Letter From the Heart 💌
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)' }}>
            Click the envelope to read what we have to say!
          </p>
        </div>

        {/* Envelope & Unfolded Card */}
        {!isOpen ? (
          <div
            onClick={toggleOpen}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              height: '220px',
              margin: '20px auto',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            {/* Envelope flap aesthetic */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '110px',
              background: 'linear-gradient(to bottom, #2e1065, #1e1b4b)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }} />

            {/* Wax Seal */}
            <div style={{
              position: 'relative',
              zIndex: 5,
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              boxShadow: '0 6px 15px rgba(220, 38, 38, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              border: '2px solid #ef4444'
            }}>
              <Heart size={26} fill="#fff" />
            </div>

            <div style={{
              position: 'relative',
              zIndex: 5,
              marginTop: '16px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Click to Break Seal</span>
              <Sparkles size={16} color="#ffd166" />
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Letter */
          <div style={{
            position: 'relative',
            background: '#fffdf5',
            color: '#1e293b',
            padding: '32px 28px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            textAlign: 'left',
            animation: 'fadeIn 0.5s ease'
          }}>
            {/* Stamp decoration */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '6px 10px',
              border: '2px dashed #dc2626',
              borderRadius: '4px',
              color: '#dc2626',
              fontSize: '0.75rem',
              fontWeight: 800,
              transform: 'rotate(8deg)'
            }}>
              🎂 VIP SPECIAL
            </div>

            {/* Salutation */}
            <h4 style={{
              fontFamily: 'var(--font-cursive)',
              fontSize: '2rem',
              color: '#b91c1c',
              marginBottom: '12px'
            }}>
              Dear {birthdayName},
            </h4>

            {/* Letter Body */}
            {isEditing ? (
              <div>
                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  rows={6}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1.4rem',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    lineHeight: 1.4,
                    color: '#334155',
                    background: '#f8fafc'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#10b981',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Check size={16} />
                    <span>Done Editing</span>
                  </button>
                </div>
              </div>
            ) : (
              <p style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem',
                lineHeight: 1.45,
                color: '#334155',
                whiteSpace: 'pre-line'
              }}>
                {letterText}
              </p>
            )}

            {/* Sign-off */}
            <div style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{
                fontFamily: 'var(--font-cursive)',
                fontSize: 'clamp(1.4rem, 4.5vw, 1.8rem)',
                color: '#b91c1c'
              }}>
                With love & best wishes ❤️
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Customize letter"
                >
                  <Edit size={14} />
                  <span>{isEditing ? 'Cancel' : 'Edit Note'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: '#e2e8f0',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    color: '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
