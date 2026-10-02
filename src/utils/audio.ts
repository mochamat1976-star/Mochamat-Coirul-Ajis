/**
 * Web Audio API synthesized sound generator & Speech Synthesis
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmOsc: OscillatorNode | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [311.13, 277.18]; // Eb4, Db4
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.1, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.2);
      });
    } catch {
      // ignore
    }
  }

  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
      const times = [0, 0.12, 0.24, 0.36, 0.5, 0.7];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + times[idx]);

        gain.gain.setValueAtTime(0.15, now + times[idx]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[idx] + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + times[idx]);
        osc.stop(now + times[idx] + 0.4);
      });
    } catch {
      // ignore
    }
  }

  public playGavel() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Gavel strike 1
      this.createKnock(now, 120);
      // Gavel strike 2
      this.createKnock(now + 0.25, 120);
      // Gavel strike 3
      this.createKnock(now + 0.5, 140);
    } catch {
      // ignore
    }
  }

  private createKnock(time: number, freq: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.12);
  }

  public playDiceRoll() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 7; i++) {
        const time = now + i * 0.05 + Math.random() * 0.02;
        const freq = 180 + Math.random() * 260;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.04);
      }
    } catch {
      // ignore
    }
  }

  public playGroupBuzzer(groupIndex: number) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const baseFreqs = [587.33, 659.25, 739.99, 830.61, 932.33, 1046.5]; // D5, E5, F#5, G#5, A#5, C6
      const freq = baseFreqs[groupIndex % baseFreqs.length];
      const now = this.ctx.currentTime;

      // Two oscillator harmonics for game buzzer feel
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 1.5, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch {
      // ignore
    }
  }

  public playTimerAlert() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [880, 1174.66, 880, 1174.66].forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.15);
        gain.gain.setValueAtTime(0.12, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.12);
      });
    } catch {}
  }

  public playTimerWarning() {
    this.playTimerAlert();
  }

  public playCardFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  public playWheelTick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  public playApplause() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 20; i++) {
        const t = now + Math.random() * 0.8;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150 + Math.random() * 400, t);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);
      }
    } catch {}
  }

  public playClap() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // White noise burst shaped for snappy handclap
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 2.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.08);
    } catch {}
  }

  public playDrumRoll() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 12; i++) {
        const t = now + i * 0.04;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140 + (i % 2) * 20, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.035);
      }
    } catch {}
  }

  public playNoteTone(freq: number, duration: number, time: number, type: OscillatorType = 'triangle', volume: number = 0.15) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(volume, time);
      gain.gain.setValueAtTime(volume * 0.9, time + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
    } catch {}
  }

  public playComfortingChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Warm, soothing acoustic chime (C5, G5, E6)
      const notes = [523.25, 783.99, 1318.51];
      const times = [0, 0.12, 0.24];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + times[idx]);
        gain.gain.setValueAtTime(0.08, now + times[idx]);
        gain.gain.exponentialRampToValueAtTime(0.001, now + times[idx] + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + times[idx]);
        osc.stop(now + times[idx] + 0.5);
      });
    } catch {}
  }

  // Soft, peaceful ambient background piano loop for comfortable learning environment
  private narratorTimer: NodeJS.Timeout | null = null;
  private isNarratorBgmActive: boolean = false;

  public startCozyAmbientBgm() {
    if (this.isMuted || this.isNarratorBgmActive) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.isNarratorBgmActive = true;

      // Relaxing chord progressions (C, Em, F, G)
      const chords = [
        [261.63, 329.63, 392.00], // C
        [329.63, 392.00, 493.88], // Em
        [349.23, 440.00, 523.25], // F
        [392.00, 493.88, 587.33], // G
      ];
      let chordIndex = 0;

      const playChordStep = () => {
        if (!this.isNarratorBgmActive || !this.ctx) return;
        const now = this.ctx.currentTime;
        const chord = chords[chordIndex % chords.length];
        chordIndex++;

        chord.forEach((freq, i) => {
          try {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);

            // Very subtle and peaceful background level
            gain.gain.setValueAtTime(0.018, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + 1.2);
          } catch {}
        });

        if (this.isNarratorBgmActive) {
          this.narratorTimer = setTimeout(playChordStep, 1100);
        }
      };

      playChordStep();
    } catch {}
  }

  public stopNarratorBgm() {
    this.isNarratorBgmActive = false;
    if (this.narratorTimer) {
      clearTimeout(this.narratorTimer);
      this.narratorTimer = null;
    }
  }

  public stopBgm() {
    this.stopNarratorBgm();
    if (this.bgmOsc) {
      try {
        this.bgmOsc.stop();
        this.bgmOsc.disconnect();
      } catch {}
      this.bgmOsc = null;
    }
    this.isBgmPlaying = false;
  }
}

export const sound = new SoundEffects();

export type VoicePersona = 'ramah_hangat' | 'guru';

let activePersona: VoicePersona = 'ramah_hangat'; // Suara ramah, santun, hangat yang bikin betah belajar

export function setVoicePersona(persona: VoicePersona) {
  activePersona = persona;
}

export function getVoicePersona(): VoicePersona {
  return activePersona;
}

// Queue and timer for dynamic sentence-by-sentence anti-monotony speech
let activeSpeechSentences: string[] = [];
let activeSentenceIndex: number = 0;
let isSpeakingActive: boolean = false;
let globalSpeechOnEnd: (() => void) | undefined = undefined;

// Dynamic, expressive speech synthesizer configured for warm, comfortable, and friendly educator voice
export function speakText(
  text: string,
  onEnd?: () => void,
  persona?: VoicePersona,
  playIntroChime: boolean = false
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  stopSpeech(); // Stop any currently ongoing speech & BGM

  if (playIntroChime) {
    sound.playComfortingChime();
  }

  // Start soft, soothing background piano so students feel comfortable and relaxed
  sound.startCozyAmbientBgm();

  const selectedPersona = persona || activePersona;
  globalSpeechOnEnd = onEnd;
  isSpeakingActive = true;

  // Split text into natural conversational chunks by sentence boundaries
  const rawSentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  activeSpeechSentences = rawSentences.length > 0 ? rawSentences : [text];
  activeSentenceIndex = 0;

  playNextSentence(selectedPersona);
}

function playNextSentence(persona: VoicePersona) {
  if (!isSpeakingActive || activeSentenceIndex >= activeSpeechSentences.length) {
    // Finished all sentences
    stopSpeech();
    if (globalSpeechOnEnd) {
      const cb = globalSpeechOnEnd;
      globalSpeechOnEnd = undefined;
      cb();
    }
    return;
  }

  const sentenceText = activeSpeechSentences[activeSentenceIndex];
  activeSentenceIndex++;

  const utterance = new SpeechSynthesisUtterance(sentenceText);
  utterance.lang = 'id-ID';

  // Warm, natural, comforting voice that makes students feel at home in the study space
  const isQuestion = sentenceText.includes('?');
  const isExclamation = sentenceText.includes('!');

  if (isQuestion) {
    // Gentle curious inflection
    utterance.pitch = 1.08;
    utterance.rate = 0.99;
  } else if (isExclamation) {
    // Inspiring warmth and encouragement
    utterance.pitch = 1.06;
    utterance.rate = 1.01;
  } else {
    // Natural, soothing educator tone (neither too high nor monotonous)
    const pitchVariations = [1.02, 1.05, 1.03, 1.04];
    utterance.pitch = pitchVariations[activeSentenceIndex % pitchVariations.length];
    utterance.rate = 0.98;
  }

  // Select best clear, natural Indonesian voice (female/educator tone preferred for comfort)
  const voices = window.speechSynthesis.getVoices();
  const bestVoice =
    voices.find(v => v.lang.startsWith('id') && (v.name.includes('Indonesian Female') || v.name.includes('Google') || v.name.includes('Damayanti') || v.name.includes('Gadis'))) ||
    voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));

  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  utterance.onend = () => {
    // Gentle natural breath pause between sentences (90ms)
    setTimeout(() => {
      playNextSentence(persona);
    }, 90);
  };

  utterance.onerror = () => {
    playNextSentence(persona);
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  isSpeakingActive = false;
  activeSpeechSentences = [];
  activeSentenceIndex = 0;
  sound.stopNarratorBgm();

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export interface SongLine {
  lineIndex: number;
  text: string;
  subtext: string;
  notes: { word: string; noteName: string; freq: number; duration: number }[];
}

export const SABANG_MERAUKE_SONG: SongLine[] = [
  {
    lineIndex: 0,
    text: "Dari Sabang sampai Merauke",
    subtext: "1  1  3  3  5  5  6  5  3",
    notes: [
      { word: "Da-", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "ri", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "Sa-", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "bang", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "sam-", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "pai", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "Me-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "rau-", noteName: "Sol", freq: 392.00, duration: 0.45 },
      { word: "ke", noteName: "Mi", freq: 329.63, duration: 0.8 },
    ]
  },
  {
    lineIndex: 1,
    text: "Berjajar pulau-pulau",
    subtext: "4  4  3  2  1  2  3",
    notes: [
      { word: "Ber-", noteName: "Fa", freq: 349.23, duration: 0.35 },
      { word: "ja-", noteName: "Fa", freq: 349.23, duration: 0.35 },
      { word: "jar", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "pu-", noteName: "Re", freq: 293.66, duration: 0.4 },
      { word: "lau", noteName: "Do", freq: 261.63, duration: 0.4 },
      { word: "pu-", noteName: "Re", freq: 293.66, duration: 0.4 },
      { word: "lau", noteName: "Mi", freq: 329.63, duration: 0.9 },
    ]
  },
  {
    lineIndex: 2,
    text: "Sambung menyambung menjadi satu",
    subtext: "1  1  3  3  5  5  6  5  3",
    notes: [
      { word: "Sam-", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "bung", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "me-", noteName: "Mi", freq: 329.63, duration: 0.35 },
      { word: "nyam-", noteName: "Mi", freq: 329.63, duration: 0.35 },
      { word: "bung", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "men-", noteName: "Sol", freq: 392.00, duration: 0.35 },
      { word: "ja-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "di", noteName: "Sol", freq: 392.00, duration: 0.35 },
      { word: "sa-", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "tu", noteName: "Sol", freq: 392.00, duration: 0.8 },
    ]
  },
  {
    lineIndex: 3,
    text: "Itulah Indonesia!",
    subtext: "4  3  2  5  7  1'",
    notes: [
      { word: "I-", noteName: "Fa", freq: 349.23, duration: 0.35 },
      { word: "tu-", noteName: "Mi", freq: 329.63, duration: 0.35 },
      { word: "lah", noteName: "Re", freq: 293.66, duration: 0.4 },
      { word: "In-", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "do-", noteName: "Si", freq: 493.88, duration: 0.45 },
      { word: "ne-", noteName: "Do'", freq: 523.25, duration: 0.45 },
      { word: "sia!", noteName: "Do'", freq: 523.25, duration: 1.0 },
    ]
  },
  {
    lineIndex: 4,
    text: "Indonesia tanah airku",
    subtext: "6  6  6  5  4  3  5",
    notes: [
      { word: "In-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "do-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "ne-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "sia", noteName: "Sol", freq: 392.00, duration: 0.5 },
      { word: "ta-", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "nah", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "a-", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "ir-", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "ku", noteName: "La", freq: 440.00, duration: 0.9 },
    ]
  },
  {
    lineIndex: 5,
    text: "Aku berjanji padamu",
    subtext: "4  4  4  3  2  1  3",
    notes: [
      { word: "A-", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "ku", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "ber-", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "jan-", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "ji", noteName: "Re", freq: 293.66, duration: 0.45 },
      { word: "pa-", noteName: "Do", freq: 261.63, duration: 0.4 },
      { word: "da-", noteName: "Re", freq: 293.66, duration: 0.4 },
      { word: "mu", noteName: "Mi", freq: 329.63, duration: 0.9 },
    ]
  },
  {
    lineIndex: 6,
    text: "Menjunjung tanah airku",
    subtext: "1  1  3  3  5  5  6  5  3",
    notes: [
      { word: "Men-", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "jung-", noteName: "Do", freq: 261.63, duration: 0.35 },
      { word: "jung", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "ta-", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "nah", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "a-", noteName: "Sol", freq: 392.00, duration: 0.4 },
      { word: "ir-", noteName: "La", freq: 440.00, duration: 0.4 },
      { word: "ku", noteName: "Sol", freq: 392.00, duration: 0.8 },
    ]
  },
  {
    lineIndex: 7,
    text: "Tanah airku Indonesia!",
    subtext: "4  3  2  5  7  1'",
    notes: [
      { word: "Ta-", noteName: "Fa", freq: 349.23, duration: 0.4 },
      { word: "nah", noteName: "Mi", freq: 329.63, duration: 0.4 },
      { word: "a-", noteName: "Re", freq: 293.66, duration: 0.4 },
      { word: "ir-", noteName: "Sol", freq: 392.00, duration: 0.45 },
      { word: "ku", noteName: "Si", freq: 493.88, duration: 0.45 },
      { word: "In-", noteName: "Do'", freq: 523.25, duration: 0.5 },
      { word: "do-", noteName: "Re'", freq: 587.33, duration: 0.5 },
      { word: "ne-", noteName: "Do'", freq: 523.25, duration: 0.5 },
      { word: "sia!", noteName: "Do'", freq: 523.25, duration: 1.4 },
    ]
  }
];

let activeSongTimeouts: NodeJS.Timeout[] = [];
let activeSongAudioNodes: (OscillatorNode | AudioNode)[] = [];
let activeSongCtx: AudioContext | null = null;

export function stopSabangMeraukeSong() {
  activeSongTimeouts.forEach(t => clearTimeout(t));
  activeSongTimeouts = [];
  activeSongAudioNodes.forEach(node => {
    try {
      if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
        (node as OscillatorNode).stop();
      }
      node.disconnect();
    } catch {}
  });
  activeSongAudioNodes = [];
  if (activeSongCtx) {
    try {
      activeSongCtx.close();
    } catch {}
    activeSongCtx = null;
  }
  stopSpeech();
}

// Gentle acoustic piano chord accompaniment for authentic anthem singing
function playAcousticPianoChord(ctx: AudioContext, freqs: number[], time: number, duration: number) {
  freqs.forEach((freq, idx) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + idx * 0.03);

      gain.gain.setValueAtTime(0.09, time + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time + idx * 0.03);
      osc.stop(time + duration);
      activeSongAudioNodes.push(osc);
    } catch {}
  });
}

export function playSabangMeraukeSong(
  speedMultiplier: number = 1.0,
  onWordChange?: (lineIdx: number, wordIdx: number) => void,
  onLineChange?: (lineIdx: number) => void,
  onEnd?: () => void,
  includeVocal: boolean = true
): () => void {
  stopSabangMeraukeSong();
  if (sound.getMuted()) {
    if (onEnd) onEnd();
    return () => {};
  }

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return () => {};
  const ctx = new AudioCtx();
  activeSongCtx = ctx;

  let cumulativeTime = 0.2; // Gentle opening breath

  // Soft piano intro chord (C Major arpeggio)
  playAcousticPianoChord(ctx, [261.63, 329.63, 392.00, 523.25], 0.05, 1.2);

  SABANG_MERAUKE_SONG.forEach((line, lineIdx) => {
    // Notify line change
    const lineTime = cumulativeTime;
    const lineTimer = setTimeout(() => {
      if (onLineChange) onLineChange(lineIdx);

      // In vocal mode, speak/sing the line with the warm comforting voice
      if (includeVocal) {
        speakText(line.text, undefined, 'ramah_hangat');
      }
    }, (lineTime * 1000) / speedMultiplier);
    activeSongTimeouts.push(lineTimer);

    // Play smooth acoustic piano harmony at start of each line
    const rootFreq = line.notes[0]?.freq || 261.63;
    playAcousticPianoChord(ctx, [rootFreq * 0.5, rootFreq * 0.75, rootFreq], cumulativeTime / speedMultiplier, 2.0);

    line.notes.forEach((n, wordIdx) => {
      const startTime = cumulativeTime / speedMultiplier;
      const duration = n.duration / speedMultiplier;

      // Visual callback timer for word highlight
      const wordTimer = setTimeout(() => {
        if (onWordChange) onWordChange(lineIdx, wordIdx);
      }, startTime * 1000);
      activeSongTimeouts.push(wordTimer);

      // 1. MELODIOUS SINGING LEAD (Sweet, expressive flute/choir tone with gentle vibrato)
      try {
        const leadOsc = ctx.createOscillator();
        const leadGain = ctx.createGain();

        // Natural gentle vibrato (4.8 Hz)
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(4.8, ctx.currentTime + startTime);
        vibratoGain.gain.setValueAtTime(2.2, ctx.currentTime + startTime);
        vibrato.connect(leadOsc.frequency);
        vibrato.start(ctx.currentTime + startTime);
        vibrato.stop(ctx.currentTime + startTime + duration);
        activeSongAudioNodes.push(vibrato);

        leadOsc.type = 'sine'; // Pure, sweet, melodious sine wave for authentic singing melody
        leadOsc.frequency.setValueAtTime(n.freq, ctx.currentTime + startTime);

        // Gentle envelope that sounds like a natural singing choir
        leadGain.gain.setValueAtTime(0.16, ctx.currentTime + startTime);
        leadGain.gain.setValueAtTime(0.15, ctx.currentTime + startTime + duration * 0.7);
        leadGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration * 0.98);

        leadOsc.connect(leadGain);
        leadGain.connect(ctx.destination);

        leadOsc.start(ctx.currentTime + startTime);
        leadOsc.stop(ctx.currentTime + startTime + duration);
        activeSongAudioNodes.push(leadOsc);

        // 2. WARM HARMONIC FLUTE OVERTONE
        const overtoneOsc = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtoneOsc.type = 'triangle';
        overtoneOsc.frequency.setValueAtTime(n.freq * 2, ctx.currentTime + startTime);
        overtoneGain.gain.setValueAtTime(0.035, ctx.currentTime + startTime);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration * 0.9);
        overtoneOsc.connect(overtoneGain);
        overtoneGain.connect(ctx.destination);
        overtoneOsc.start(ctx.currentTime + startTime);
        overtoneOsc.stop(ctx.currentTime + startTime + duration * 0.9);
        activeSongAudioNodes.push(overtoneOsc);

        // 3. WARM ACOUSTIC BASS NOTE ON KEY BEATS
        if (wordIdx === 0 || wordIdx === Math.floor(line.notes.length / 2)) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(n.freq * 0.5, ctx.currentTime + startTime);
          bassGain.gain.setValueAtTime(0.10, ctx.currentTime + startTime);
          bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration * 1.6);
          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);
          bassOsc.start(ctx.currentTime + startTime);
          bassOsc.stop(ctx.currentTime + startTime + duration * 1.6);
          activeSongAudioNodes.push(bassOsc);
        }
      } catch {}

      cumulativeTime += n.duration;
    });

    cumulativeTime += 0.4; // Peaceful natural pause between phrases
  });

  // Final warm harmonic piano chord resolution
  const finaleTime = cumulativeTime / speedMultiplier;
  playAcousticPianoChord(ctx, [261.63, 329.63, 392.00, 523.25], finaleTime, 2.5);

  const endTimer = setTimeout(() => {
    stopSabangMeraukeSong();
    if (onEnd) onEnd();
  }, (cumulativeTime * 1000) / speedMultiplier);
  activeSongTimeouts.push(endTimer);

  return stopSabangMeraukeSong;
}
