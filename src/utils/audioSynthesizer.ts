// Web Audio API ambient & background music synthesizer
// Generates copyright-free royalty-free background ambience for voiceover testing

class BackgroundMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private intervalId: any = null;
  private currentTrack = 'none';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      // volume 0 to 1
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public playTrack(trackId: string, volume = 0.25) {
    this.stop();
    if (trackId === 'none') {
      this.currentTrack = 'none';
      return;
    }

    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrack = trackId;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (trackId === 'cinematic') {
      this.playCinematicPad();
    } else if (trackId === 'lofi') {
      this.playLoFiChords();
    } else if (trackId === 'corporate') {
      this.playCorporateGroove();
    } else if (trackId === 'acoustic') {
      this.playAcousticArp();
    }
  }

  private playCinematicPad() {
    if (!this.ctx || !this.masterGain) return;
    const notes = [65.41, 98.0, 130.81, 164.81, 196.0]; // C2, G2, C3, E3, G3
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06 / notes.length, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
    });
  }

  private playLoFiChords() {
    if (!this.ctx || !this.masterGain) return;
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 349.23], // G7
    ];
    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3);
      });
    };

    playChordStep();
    this.intervalId = setInterval(playChordStep, 3000);
  }

  private playCorporateGroove() {
    if (!this.ctx || !this.masterGain) return;
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const noteFreq = scale[step % scale.length];
      step = (step + 1) % scale.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.03, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    };

    playStep();
    this.intervalId = setInterval(playStep, 450);
  }

  private playAcousticArp() {
    if (!this.ctx || !this.masterGain) return;
    const pattern = [220.0, 277.18, 329.63, 440.0, 329.63, 277.18];
    let noteIdx = 0;

    const playNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const freq = pattern[noteIdx % pattern.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.8);
    };

    playNote();
    this.intervalId = setInterval(playNote, 320);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrack = 'none';
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.disconnect();
      } catch {
        // ignore
      }
      this.masterGain = null;
    }
  }

  public getCurrentTrack() {
    return this.currentTrack;
  }
}

export const bgMusic = new BackgroundMusicEngine();
