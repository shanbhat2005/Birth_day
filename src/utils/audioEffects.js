// Web Audio API Synthesizer - 100% self-contained audio effects
let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Cute balloon or button pop sound
export const playPopSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    
    // Quick pitch drop creates a popping effect
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Graceful fallback
  }
};

// Sparkle / magical chime
export const playSparkleSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.05);

      gain.gain.setValueAtTime(0, now + index * 0.05);
      gain.gain.linearRampToValueAtTime(0.15, now + index * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.05);
      osc.stop(now + index * 0.05 + 0.45);
    });
  } catch {
    // Fallback
  }
};

// Party popper / horn burst
export const playPartyHorn = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Fanfare chord
    const freqs = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.linearRampToValueAtTime(f * 1.05, now + 0.3);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      // Lowpass filter for smooth festive brass tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  } catch {
    // Fallback
  }
};

// Candle blow sound (wind-like swoosh + chime)
export const playBlowCandleSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Gentle noise burst
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);

    // Followed by celebratory magical chime
    setTimeout(() => {
      playSparkleSound();
    }, 250);
  } catch {
    // Fallback
  }
};

// Happy Birthday Melody Synthesizer (Music Box / Marimba Tone)
let currentMelodyTimeouts = [];
let isMelodyPlaying = false;

// Note frequencies (in Hz)
const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
  C6: 1046.50
};

// Happy Birthday sequence: [note, duration in beats]
const HAPPY_BIRTHDAY_SCORE = [
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1.5],
  ['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2.5]
];

const playNote = (ctx, freq, startTime, duration) => {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Bell / Celeste-like timbre
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, startTime); // Octave overtone

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.9);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
};

export const startHappyBirthdayMusic = (onEndedCallback) => {
  stopHappyBirthdayMusic();
  const ctx = getAudioContext();
  if (!ctx) return;

  isMelodyPlaying = true;
  const tempo = 125; // BPM
  const beatLength = 60 / tempo;
  let totalTime = 0.1;

  HAPPY_BIRTHDAY_SCORE.forEach(([noteName, beats]) => {
    const freq = NOTES[noteName];
    const duration = beats * beatLength;
    const timeout = setTimeout(() => {
      if (isMelodyPlaying && ctx) {
        playNote(ctx, freq, ctx.currentTime, duration);
      }
    }, totalTime * 1000);
    currentMelodyTimeouts.push(timeout);
    totalTime += duration;
  });

  // Loop or trigger callback when finished
  const endTimeout = setTimeout(() => {
    if (isMelodyPlaying) {
      if (onEndedCallback) {
        onEndedCallback();
      } else {
        startHappyBirthdayMusic(); // loop smoothly
      }
    }
  }, totalTime * 1000 + 400);
  currentMelodyTimeouts.push(endTimeout);
};

export const stopHappyBirthdayMusic = () => {
  isMelodyPlaying = false;
  currentMelodyTimeouts.forEach(clearTimeout);
  currentMelodyTimeouts = [];
};

export const isMusicActive = () => isMelodyPlaying;
