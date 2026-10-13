import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCcw, Download, Copy, Check, Star,
  Volume2, VolumeX, Music, Gauge, Eye, Sparkles
} from 'lucide-react';
import { bgMusic } from '../utils/audioSynthesizer';
import { BACKGROUND_MUSIC_TRACKS } from '../data/dialectsData';

interface AudioPlayerProps {
  audioBase64: string;
  scriptText: string;
  dialectName: string;
  voiceName: string;
  styleName: string;
  onOpenTeleprompter: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioBase64,
  scriptText,
  dialectName,
  voiceName,
  styleName,
  onOpenTeleprompter,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [selectedBgMusic, setSelectedBgMusic] = useState('none');
  const [bgVolume, setBgVolume] = useState(0.2);
  const [voiceVolume, setVoiceVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Audio source URL
  const audioSrc = `data:audio/wav;base64,${audioBase64}`;

  useEffect(() => {
    // Reset state on new audio
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = speed;
      audioRef.current.load();
    }
    bgMusic.stop();
  }, [audioBase64]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : voiceVolume;
    }
  }, [voiceVolume, isMuted]);

  // Handle Background music volume change
  useEffect(() => {
    bgMusic.setVolume(bgVolume);
  }, [bgVolume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      bgMusic.stop();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if (selectedBgMusic !== 'none') {
          bgMusic.playTrack(selectedBgMusic, bgVolume);
        }
      }).catch(err => {
        console.error('Audio play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    bgMusic.stop();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play();
        if (selectedBgMusic !== 'none') {
          bgMusic.playTrack(selectedBgMusic, bgVolume);
        }
      }
    }
  };

  const handleBgMusicChange = (trackId: string) => {
    setSelectedBgMusic(trackId);
    if (isPlaying) {
      if (trackId === 'none') {
        bgMusic.stop();
      } else {
        bgMusic.playTrack(trackId, bgVolume);
      }
    }
  };

  const handleDownload = () => {
    try {
      const byteCharacters = atob(audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      const cleanDialect = dialectName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
      a.download = `Sawtek_${cleanDialect}_${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Canvas waveform visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const barCount = 48;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        const progress = currentTime / (duration || 1);
        const barPos = i / barCount;
        const isPast = barPos <= progress;

        // Dynamic height based on playing state
        let barHeight = 6;
        if (isPlaying) {
          const waveFactor = Math.sin(Date.now() * 0.008 + i * 0.3) * 0.5 + 0.5;
          const randomFactor = Math.sin(i * 1.5) * 0.3 + 0.7;
          barHeight = 10 + waveFactor * (height - 18) * randomFactor;
        } else {
          // Static simulated waveform
          const pseudoRandom = Math.abs(Math.sin(i * 2.3 + 1)) * 0.6 + 0.2;
          barHeight = pseudoRandom * (height * 0.65);
        }

        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = isPast
          ? 'rgb(245, 158, 11)' // Amber-500
          : 'rgba(71, 85, 105, 0.45)'; // Slate-600

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Top Header with Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dialectName}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {voiceName}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-amber-300 border border-amber-500/20">
            {styleName}
          </span>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-1.5">
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              className={`p-2 rounded-xl transition-all ${
                isFavorite
                  ? 'text-amber-400 bg-amber-500/15'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          )}

          <button
            onClick={onOpenTeleprompter}
            title="وضع التيليبرومبتر للقراءة والتسجيل"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">تيليبرومبتر</span>
          </button>

          <button
            onClick={handleCopy}
            title="نسخ النص"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل WAV</span>
          </button>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 mb-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={68}
          className="w-full h-16 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            if (audioRef.current && duration) {
              const seekTo = (1 - pos) * duration; // RTL adjustment
              audioRef.current.currentTime = seekTo;
              setCurrentTime(seekTo);
            }
          }}
        />

        {/* Progress Bar & Timing */}
        <div className="mt-2 space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-800/80">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={togglePlay}
            className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 hover:scale-105 shadow-lg shadow-amber-500/25'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-slate-950" />
            ) : (
              <Play className="w-6 h-6 fill-slate-950 mr-0.5" />
            )}
          </button>

          <button
            onClick={handleRestart}
            title="إعادة من البداية"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Switcher */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60">
            <Gauge className="w-3.5 h-3.5 text-amber-400 mx-1.5" />
            {[0.8, 1.0, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  speed === spd
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Background Music Mixer */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-2xl border border-slate-800">
            <Music className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300 font-medium">موسيقى خلفية:</span>
            <select
              value={selectedBgMusic}
              onChange={(e) => handleBgMusicChange(e.target.value)}
              className="bg-slate-800 text-xs text-amber-300 rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-amber-500"
            >
              {BACKGROUND_MUSIC_TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameAr}
                </option>
              ))}
            </select>
          </div>

          {selectedBgMusic !== 'none' && (
            <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400">مستوى الموسيقى:</span>
              <input
                type="range"
                min={0}
                max={0.5}
                step={0.02}
                value={bgVolume}
                onChange={(e) => setBgVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          )}
        </div>

      </div>

      {/* Script Preview Box */}
      <div className="mt-4 p-3.5 bg-slate-950/50 rounded-2xl border border-slate-800/80">
        <p className="text-xs text-slate-400 font-medium mb-1">نص الفويس أوفر المسجل:</p>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">{scriptText}</p>
      </div>
    </div>
  );
};
