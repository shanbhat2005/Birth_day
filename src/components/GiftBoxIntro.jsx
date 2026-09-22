import React, { useState } from 'react';
import { Sparkles, Gift, Heart, ArrowRight, Stars, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playPartyHorn, playSparkleSound } from '../utils/audioEffects';

export default function GiftBoxIntro({ onOpenGift }) {
  // stage: 0 = "Click", 1 = "Are you sure?", 2 = "Opening animation"
  const [stage, setStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleButtonClick = () => {
    if (stage === 0) {
      playPopSound();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setStage(1);
    } else if (stage === 1) {
      playPartyHorn();
      setStage(2);
      
      // Grand confetti explosion
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#ff3366', '#ffd166', '#00f2fe', '#7928ca', '#ff7518']
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#ff3366', '#ffd166', '#00f2fe', '#7928ca', '#ff7518']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Big center burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 }
      });

      // Allow lid fly-off animation before switching screen
      setTimeout(() => {
        onOpenGift();
      }, 900);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glowing particles/decor */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(255,51,102,0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(121,40,202,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Intro Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(20px, 5vh, 40px)',
        zIndex: 2,
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '9999px',
          fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
          fontWeight: 600,
          color: 'var(--text-gold)',
          marginBottom: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <Sparkles size={14} color="#ffd166" />
          <span>Surprise Delivery For You</span>
          <Sparkles size={14} color="#ffd166" />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 8vw, 3.8rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '10px'
        }}>
          Open Your <span className="text-gradient-festive">Gift</span> 🎁
        </h1>

        <p style={{
          fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)',
          color: 'var(--text-muted)',
          maxWidth: '440px',
          margin: '0 auto',
          lineHeight: 1.45,
          padding: '0 8px'
        }}>
          {stage === 0 
            ? "A little something special is waiting inside. Tap the button below to see what it is!"
            : "Wait a second... Are you absolutely prepared for this surprise?"}
        </p>
      </div>

      {/* 3D Animated Gift Box Presentation */}
      <div 
        className={`${stage === 2 ? 'gift-exploding' : isShaking ? 'shake-prompt' : 'animate-float'}`}
        onMouseEnter={() => {
          setIsHovered(true);
          playSparkleSound();
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          marginBottom: '45px',
          cursor: 'pointer',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isHovered && stage !== 2 ? 'scale(1.08) translateY(-6px)' : undefined,
          zIndex: 2
        }}
        onClick={handleButtonClick}
      >
        {/* Glowing Aura Behind Box */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          background: stage === 1 
            ? 'radial-gradient(circle, rgba(247, 37, 133, 0.45) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 209, 102, 0.35) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: 0
        }} />

        {/* Gift Box Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          zIndex: 1
        }}>
          
          {/* Big Bow on Top */}
          <div style={{
            position: 'absolute',
            top: stage === 2 ? '-100px' : '15px',
            opacity: stage === 2 ? 0 : 1,
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Bow ribbons */}
            <div style={{
              width: '42px',
              height: '42px',
              border: '8px solid #ffd166',
              borderRadius: '50% 50% 10% 50%',
              transform: 'rotate(-35deg)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              marginRight: '-10px',
              background: 'linear-gradient(135deg, #ffe259, #ffa751)'
            }} />
            <div style={{
              width: '42px',
              height: '42px',
              border: '8px solid #ffd166',
              borderRadius: '50% 50% 50% 10%',
              transform: 'rotate(35deg)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              marginLeft: '-10px',
              background: 'linear-gradient(135deg, #ffe259, #ffa751)'
            }} />
            {/* Center knot */}
            <div style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              background: '#ffd166',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }} />
          </div>

          {/* Gift Box Lid */}
          <div style={{
            position: 'relative',
            width: '184px',
            height: '42px',
            background: 'linear-gradient(135deg, #ff3366 0%, #d90429 100%)',
            borderRadius: '12px 12px 6px 6px',
            boxShadow: '0 8px 20px rgba(217, 4, 41, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
            zIndex: 4,
            transform: stage === 2 ? 'translateY(-80px) rotate(-15deg) scale(0.9)' : 'none',
            opacity: stage === 2 ? 0 : 1,
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            {/* Vertical ribbon on lid */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              width: '32px',
              height: '100%',
              background: 'linear-gradient(to right, #f7b733, #ffd166, #f7b733)',
              boxShadow: '0 0 10px rgba(255, 209, 102, 0.5)'
            }} />
          </div>

          {/* Gift Box Body */}
          <div style={{
            position: 'relative',
            width: '168px',
            height: '140px',
            background: 'linear-gradient(135deg, #e60039 0%, #b80028 100%)',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), inset 0 -4px 10px rgba(0,0,0,0.3)',
            zIndex: 3,
            overflow: 'hidden'
          }}>
            {/* Vertical ribbon */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              transform: 'translateX(-50%)',
              width: '32px',
              background: 'linear-gradient(to right, #f7b733, #ffd166, #f7b733)',
              boxShadow: '0 0 12px rgba(255, 209, 102, 0.6)'
            }} />
            
            {/* Horizontal ribbon */}
            <div style={{
              position: 'absolute',
              top: '45%',
              left: 0,
              right: 0,
              transform: 'translateY(-50%)',
              height: '28px',
              background: 'linear-gradient(to bottom, #f7b733, #ffd166, #f7b733)',
              boxShadow: '0 0 12px rgba(255, 209, 102, 0.6)'
            }} />

            {/* Subtle glossy overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Cute hanging gift tag */}
          <div style={{
            position: 'absolute',
            right: '18px',
            top: '75px',
            background: '#fffdf0',
            color: '#991b1b',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 800,
            transform: 'rotate(12deg)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            zIndex: 6,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Heart size={12} fill="#ef4444" color="#ef4444" />
            <span>FOR YOU</span>
          </div>

        </div>
      </div>

      {/* Dynamic Multi-Step Button */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          id="gift-action-btn"
          className={`btn-festive ${stage === 1 ? 'shake-prompt' : ''}`}
          onClick={handleButtonClick}
          style={{
            fontSize: '1.25rem',
            padding: stage === 1 ? '18px 42px' : '16px 38px',
            minWidth: '240px'
          }}
        >
          {stage === 0 && (
            <>
              <Gift size={24} />
              <span>Click Me</span>
              <ArrowRight size={20} />
            </>
          )}

          {stage === 1 && (
            <>
              <AlertCircle size={24} />
              <span>Are you sure? 👀</span>
              <Sparkles size={20} />
            </>
          )}

          {stage === 2 && (
            <>
              <Stars size={24} />
              <span>Opening... ✨</span>
            </>
          )}
        </button>

        {stage === 1 && (
          <p style={{
            fontSize: '0.9rem',
            color: '#f43f5e',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>Click again to unlock the magic! 🪄</span>
          </p>
        )}
      </div>

      {/* Floating hints */}
      <div style={{
        marginTop: '36px',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.7
      }}>
        <span>💡 Tip: Turn on your sound for the best celebratory vibe!</span>
      </div>
    </div>
  );
}
