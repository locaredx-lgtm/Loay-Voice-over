import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, ZoomIn, ZoomOut, FlipHorizontal } from 'lucide-react';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  dialectTitle: string;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  text,
  dialectTitle,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(36); // px
  const [isMirrored, setIsMirrored] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;

    const scrollStep = () => {
      if (isScrolling && containerRef.current) {
        containerRef.current.scrollTop += scrollSpeed * 0.7;
      }
      if (isScrolling) {
        animId = requestAnimationFrame(scrollStep);
      }
    };

    if (isScrolling) {
      animId = requestAnimationFrame(scrollStep);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isScrolling, scrollSpeed]);

  const handleReset = () => {
    setIsScrolling(false);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col backdrop-blur-xl animate-in fade-in">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 text-white">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
            تيليبرومبتر القراءة الذاتي
          </span>
          <span className="text-sm font-semibold text-slate-300 hidden sm:inline">
            {dialectTitle}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Play/Pause Scroll */}
          <button
            onClick={() => setIsScrolling(!isScrolling)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isScrolling
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            {isScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 mr-0.5" />}
            <span>{isScrolling ? 'إيقاف التمرير' : 'بدء التمرير'}</span>
          </button>

          <button
            onClick={handleReset}
            title="إعادة للأعلى"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Control */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">السرعة:</span>
            {[1, 2, 3, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setScrollSpeed(spd)}
                className={`w-6 h-6 rounded-lg font-bold ${
                  scrollSpeed === spd
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setFontSize((f) => Math.max(20, f - 4))}
              className="p-1 hover:text-amber-400"
              title="تصغير الخط"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize((f) => Math.min(64, f + 4))}
              className="p-1 hover:text-amber-400"
              title="تكبير الخط"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Mirror Mode Toggle */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            title="عكس النص (لشاشات العاكس الزجاجي)"
            className={`p-2 rounded-xl border transition-colors ${
              isMirrored
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Reading Focus Bar Indicator */}
      <div className="absolute top-1/2 left-0 right-0 h-24 -translate-y-1/2 pointer-events-none border-y border-amber-500/20 bg-amber-500/5">
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-500/50">
          ▶ خط القراءة
        </span>
      </div>

      {/* Prompter Scrolling Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 sm:px-20 py-48 text-center scroll-smooth selection:bg-amber-500 selection:text-black"
        style={{
          transform: isMirrored ? 'scaleX(-1)' : 'none',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="font-bold text-slate-100 leading-[1.8] whitespace-pre-wrap transition-all tracking-wide"
            style={{ fontSize: `${fontSize}px` }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
