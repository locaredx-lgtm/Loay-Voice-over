import React from 'react';
import { VoicePersona, VoiceStyle } from '../types';
import { VOICES, STYLES } from '../data/dialectsData';
import { Mic, User, Check, Sparkles, Volume2 } from 'lucide-react';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onSelectVoice: (voice: VoicePersona) => void;
  selectedStyleId: string;
  onSelectStyle: (style: VoiceStyle) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onSelectVoice,
  selectedStyleId,
  onSelectStyle,
}) => {
  return (
    <div className="space-y-6">
      {/* Voice Personas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">اختر شخصية الصوت (Voice Persona):</h4>
          </div>
          <span className="text-xs text-slate-400">نبرات صوتية احترافية</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {VOICES.map((v) => {
            const isSelected = v.id === selectedVoiceId;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVoice(v)}
                className={`p-3 rounded-2xl cursor-pointer border transition-all text-right relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${v.avatarColor} flex items-center justify-center text-slate-950 font-bold text-xs shadow-md`}
                    >
                      {v.nameAr.slice(0, 2)}
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <h5 className="text-xs font-bold text-white">{v.nameAr}</h5>
                  <p className="text-[11px] text-amber-300/90 font-medium mt-0.5">{v.toneAr}</p>
                </div>

                <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {v.descriptionAr}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voiceover Styles */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">أسلوب وطابع الإلقاء (Delivery Style):</h4>
          </div>
          <span className="text-xs text-slate-400">يتحكم بطاقة وسرعة النبرة</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STYLES.map((st) => {
            const isSelected = st.id === selectedStyleId;
            return (
              <button
                key={st.id}
                onClick={() => onSelectStyle(st)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="text-xs font-bold mb-1">{st.nameAr}</div>
                <div
                  className={`text-[10px] line-clamp-1 ${
                    isSelected ? 'text-slate-900 font-medium' : 'text-slate-500'
                  }`}
                >
                  {st.nameEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
