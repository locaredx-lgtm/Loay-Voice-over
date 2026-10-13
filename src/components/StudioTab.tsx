import React, { useState } from 'react';
import { Dialect, VoicePersona, VoiceStyle, ScriptTemplate } from '../types';
import { DIALECTS, VOICES, STYLES, SAMPLE_SCRIPTS } from '../data/dialectsData';
import { DialectSelector } from './DialectSelector';
import { VoiceSelector } from './VoiceSelector';
import { AudioPlayer } from './AudioPlayer';
import {
  Sparkles, Wand2, FileText, Loader2, Volume2, AlertCircle, RefreshCw,
  Clock, Hash, Lightbulb, Play
} from 'lucide-react';

interface StudioTabProps {
  onOpenTeleprompter: (text: string, title: string) => void;
  onSaveToLibrary: (item: any) => void;
  initialScript?: string;
  initialDialectId?: string;
}

export const StudioTab: React.FC<StudioTabProps> = ({
  onOpenTeleprompter,
  onSaveToLibrary,
  initialScript = '',
  initialDialectId = 'egyptian',
}) => {
  const [selectedDialect, setSelectedDialect] = useState<Dialect>(
    () => DIALECTS.find((d) => d.id === initialDialectId) || DIALECTS[0]
  );
  const [selectedVoice, setSelectedVoice] = useState<VoicePersona>(VOICES[0]);
  const [selectedStyle, setSelectedStyle] = useState<VoiceStyle>(STYLES[0]);
  const [scriptText, setScriptText] = useState(
    initialScript || selectedDialect.samplePhrases[0]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<{
    audioBase64: string;
    dialectName: string;
    voiceName: string;
    styleName: string;
    scriptText: string;
  } | null>(null);

  // Sync script when selecting another dialect if text is still a default sample phrase
  const handleDialectChange = (dialect: Dialect) => {
    setSelectedDialect(dialect);
    const isCurrentTextSample = DIALECTS.some((d) =>
      d.samplePhrases.includes(scriptText)
    );
    if (!scriptText.trim() || isCurrentTextSample) {
      setScriptText(dialect.samplePhrases[0]);
    }
  };

  // Word and character count & estimated reading duration
  const wordsCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const charsCount = scriptText.length;
  // Average speaking rate in Arabic voiceover: ~130 words per minute (2.16 words/sec)
  const estimatedSeconds = Math.max(1, Math.round(wordsCount / 2.16));

  const handleGenerateVoiceover = async () => {
    if (!scriptText.trim()) {
      setError('يرجى كتابة أو لصق نص الاسكريبت أولاً.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: scriptText.trim(),
          voice: selectedVoice.id,
          dialect: selectedDialect.id,
          dialectName: selectedDialect.nameAr,
          style: selectedStyle.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'فشل توليد الفويس أوفر من الخادم');
      }

      const result = {
        audioBase64: data.audioBase64,
        dialectName: selectedDialect.nameAr,
        voiceName: selectedVoice.nameAr,
        styleName: selectedStyle.nameAr,
        scriptText: scriptText.trim(),
      };

      setGeneratedAudio(result);

      // Automatically add to library
      onSaveToLibrary({
        id: 'rec_' + Date.now(),
        text: scriptText.trim(),
        dialectId: selectedDialect.id,
        dialectName: selectedDialect.nameAr,
        voiceId: selectedVoice.id,
        voiceName: selectedVoice.nameAr,
        styleId: selectedStyle.id,
        styleName: selectedStyle.nameAr,
        audioBase64: data.audioBase64,
        mimeType: 'audio/wav',
        createdAt: Date.now(),
        durationSeconds: estimatedSeconds,
      });
    } catch (err: any) {
      console.error('Error generating voiceover:', err);
      setError(err?.message || 'حدث خطأ أثناء الاتصال بالخادم. تأكد من تفعيل مفتاح Gemini API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTemplate = (tmpl: ScriptTemplate) => {
    setScriptText(tmpl.text);
    const targetDialect = DIALECTS.find((d) => d.id === tmpl.dialectId);
    if (targetDialect) {
      setSelectedDialect(targetDialect);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Studio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نظام الذكاء الصوتي المتقدم Gemini 3.8 Flash TTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            استوديو الفويس أوفر الاحترافي بكل اللهجات
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            اختر أي لهجة عربية (مصرية، خليجية، شامية، مغاربية، عراقية، فصحى...) أو لغات عالمية،
            واحصل على تسجيل صوتي إذاعي نقي وفوري مع المؤثرات والتحكم الكامل بالأسلوب.
          </p>
        </div>
      </div>

      {/* Generated Audio Player (if exists) */}
      {generatedAudio && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              التسجيل الصوتي الجاهز:
            </h3>
            <button
              onClick={() => setGeneratedAudio(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              إخفاء المشغل
            </button>
          </div>
          <AudioPlayer
            audioBase64={generatedAudio.audioBase64}
            scriptText={generatedAudio.scriptText}
            dialectName={generatedAudio.dialectName}
            voiceName={generatedAudio.voiceName}
            styleName={generatedAudio.styleName}
            onOpenTeleprompter={() =>
              onOpenTeleprompter(generatedAudio.scriptText, generatedAudio.dialectName)
            }
          />
        </div>
      )}

      {/* Step 1: Dialect Selection */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7">
        <DialectSelector
          selectedDialectId={selectedDialect.id}
          onSelectDialect={handleDialectChange}
        />
      </section>

      {/* Step 2: Voice Persona & Style */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7">
        <VoiceSelector
          selectedVoiceId={selectedVoice.id}
          onSelectVoice={setSelectedVoice}
          selectedStyleId={selectedStyle.id}
          onSelectStyle={setSelectedStyle}
        />
      </section>

      {/* Step 3: Script Studio Editor */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">نص الاسكريبت (Script Text):</h3>
          </div>

          {/* Quick presets & helpers */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">نماذج جاهزة:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md">
              {SAMPLE_SCRIPTS.slice(0, 4).map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors"
                >
                  {tmpl.categoryAr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={5}
            dir="rtl"
            placeholder={`اكتب هنا النص المراد تحويله إلى فويس أوفر بـ ${selectedDialect.nameAr}...`}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 text-slate-100 text-base leading-relaxed placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
          />

          {/* Dialect specific sample chips below textarea */}
          <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-800/50">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> عبارات مقترحة للهجة {selectedDialect.nameAr}:
            </span>
            {selectedDialect.samplePhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => setScriptText(phrase)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/50 transition-colors"
              >
                "{phrase.slice(0, 32)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Counters & Teleprompter shortcut */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-amber-400" />
              <span>{wordsCount} كلمة</span>
            </span>
            <span>{charsCount} حرف</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>المدة التقديرية: ~{estimatedSeconds} ثانية</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenTeleprompter(scriptText, selectedDialect.nameAr)}
              disabled={!scriptText.trim()}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans disabled:opacity-50 transition-colors"
            >
              تجربة القراءة بالتيليبرومبتر
            </button>
            <button
              onClick={() => setScriptText('')}
              className="text-slate-500 hover:text-rose-400 text-xs font-sans"
            >
              مسح النص
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-3 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">تنبيه:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3">
          <button
            onClick={handleGenerateVoiceover}
            disabled={isLoading || !scriptText.trim()}
            className={`w-full py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${
              isLoading || !scriptText.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/25 cursor-pointer glow-amber'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
                <span>جاري إنتاج الفويس أوفر بالذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-6 h-6" />
                <span>توليد الفويس أوفر بـ {selectedDialect.nameAr}</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
