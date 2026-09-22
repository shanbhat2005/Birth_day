import React, { useState } from 'react';
import { Flame, Sparkles, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlowCandleSound, playSparkleSound } from '../utils/audioEffects';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);

  const blowCandles = () => {
    if (candlesBlown) return;
    playBlowCandleSound();
    setCandlesBlown(true);
    setSmokeActive(true);

    setTimeout(() => {
      setSmokeActive(false);
      
      // Joyous fireworks burst
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd166', '#ff3366', '#00f2fe', '#a855f7']
      });
    }, 1200);
  };

  const relightCandles = () => {
    playSparkleSound();
    setCandlesBlown(false);
  };

  return (
    <div className="glass-panel" style={{
      width: '100%',
      maxWidth: '680px',
      margin: '28px auto',
      padding: '28px 16px',
      position: 'relative',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Section Title */}
      <div style={{ marginBottom: '24px' }}>
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
          <Sparkles size={16} />
          <span>The Birthday Tradition</span>
          <Sparkles size={16} />
        </div>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          fontWeight: 800,
          color: '#fff'
        }}>
          Make a Secret Wish! 🕯️
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', marginTop: '6px', maxWidth: '420px', margin: '6px auto 0 auto' }}>
          {candlesBlown
            ? "Your wish has been whispered to the universe! ✨"
            : "Close your eyes, make the deepest wish in your heart, and blow out the candles."}
        </p>
      </div>

      {/* Birthday Cake Illustration & Candles */}
      <div style={{
        position: 'relative',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '28px',
        maxWidth: '100%',
        overflow: 'visible'
      }}>

        {/* Candles Group (3 candles) */}
        <div style={{
          position: 'absolute',
          top: '15px',
          display: 'flex',
          gap: 'clamp(20px, 6vw, 36px)',
          zIndex: 10
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              onClick={blowCandles}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: candlesBlown ? 'default' : 'pointer',
                transform: `translateY(${i === 1 ? '-6px' : '0px'})`,
                padding: '4px'
              }}
              title={candlesBlown ? "Candle is blown" : "Click to blow"}
            >
              {/* Flame or Smoke */}
              {!candlesBlown ? (
                <div className="flame" style={{ animationDelay: `${i * 0.25}s` }} />
              ) : smokeActive ? (
                <div className="smoke-particle" />
              ) : (
                <div style={{ height: '28px', width: '14px' }} />
              )}

              {/* Candle Wick */}
              <div style={{
                width: '2px',
                height: '8px',
                background: '#475569',
                margin: '2px 0 0 0'
              }} />

              {/* Candle Body */}
              <div style={{
                width: '12px',
                height: '42px',
                background: i % 2 === 0
                  ? 'repeating-linear-gradient(45deg, #ff3366, #ff3366 6px, #ffffff 6px, #ffffff 12px)'
                  : 'repeating-linear-gradient(45deg, #00f2fe, #00f2fe 6px, #ffffff 6px, #ffffff 12px)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }} />
            </div>
          ))}
        </div>

        {/* Tier 1 (Top Layer) */}
        <div style={{
          position: 'relative',
          width: 'clamp(140px, 45vw, 180px)',
          height: '55px',
          background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
          borderRadius: '14px 14px 0 0',
          boxShadow: '0 6px 15px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.4)',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          paddingTop: '6px'
        }}>
          {/* Frosting drips */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: 0,
            right: 0,
            height: '10px',
            background: '#ffffff',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }} />
          <span style={{ fontSize: '12px' }}>🍓</span>
          <span style={{ fontSize: '12px' }}>✨</span>
          <span style={{ fontSize: '12px' }}>🍓</span>
        </div>

        {/* Tier 2 (Middle Layer) */}
        <div style={{
          position: 'relative',
          width: 'clamp(190px, 62vw, 240px)',
          height: '58px',
          background: 'linear-gradient(135deg, #7928ca 0%, #b800e6 100%)',
          borderRadius: '14px 14px 0 0',
          boxShadow: '0 8px 20px rgba(0,0,0,0.35), inset 0 3px 6px rgba(255,255,255,0.3)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          {/* Decorative frosting balls */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: 0,
            right: 0,
            height: '10px',
            background: '#fffdf0',
            borderRadius: '0 0 10px 10px'
          }} />
          <span style={{ fontSize: '14px' }}>⭐</span>
          <span style={{ fontSize: '14px' }}>🍫</span>
          <span style={{ fontSize: '14px' }}>⭐</span>
        </div>

        {/* Tier 3 (Base Layer) */}
        <div style={{
          position: 'relative',
          width: 'clamp(240px, 78vw, 300px)',
          height: '65px',
          background: 'linear-gradient(135deg, #ff3366 0%, #d90429 100%)',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.3)',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '16px' }}>🎉</span>
          <span style={{ fontSize: '16px' }}>💖</span>
          <span style={{ fontSize: '16px' }}>🍒</span>
          <span style={{ fontSize: '16px' }}>💖</span>
          <span style={{ fontSize: '16px' }}>🎉</span>
        </div>

        {/* Cake Stand / Plate */}
        <div style={{
          width: 'clamp(260px, 86vw, 350px)',
          height: '16px',
          background: 'linear-gradient(to bottom, #e2e8f0, #94a3b8)',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 0
        }} />

      </div>

      {/* Action Buttons & Message */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
        {!candlesBlown ? (
          <button
            id="blow-candles-btn"
            onClick={blowCandles}
            className="btn-festive"
            style={{
              background: 'linear-gradient(135deg, #ff7518 0%, #ff3366 100%)',
              width: '100%',
              maxWidth: '340px'
            }}
          >
            <Flame size={20} />
            <span>Make a Wish & Blow Candles! 🌬️</span>
          </button>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            animation: 'fadeIn 0.5s ease'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 22px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '9999px',
              color: '#34d399',
              fontWeight: 700,
              fontSize: '1.05rem'
            }}>
              <Heart size={20} fill="#34d399" />
              <span>May all your wishes come true! ✨</span>
            </div>

            <button
              onClick={relightCandles}
              className="glass-panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '9999px'
              }}
            >
              <RotateCcw size={16} />
              <span>Relight Candles</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
