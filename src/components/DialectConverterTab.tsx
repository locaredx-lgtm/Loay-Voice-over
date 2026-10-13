import React, { useState } from 'react';
import { DIALECTS } from '../data/dialectsData';
import { Wand2, ArrowLeftRight, Copy, Check, Send, Sparkles, Loader2, AlertCircle, BookOpen, Lightbulb } from 'lucide-react';

interface DialectConverterTabProps {
  onSendToStudio: (script: string, dialectId: string) => void;
}

export const DialectConverterTab: React.FC<DialectConverterTabProps> = ({ onSendToStudio }) => {
  const [sourceText, setSourceText] = useState(
    'هل ترغب في تحسين عملك وزيادة مبيعاتك في وقت قصير؟ تطبيقنا يوفر لك كل الحلول السريعة بضغطة زر واحدة. تواصل معنا الآن ولا تفوت هذه الفرصة الرائعة.'
  );
  const [targetDialectId, setTargetDialectId] = useState('egyptian');
  const [tone, setTone] = useState('إعلاني حماسي ومقنع');
  const [addTashkeel, setAddTashkeel] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    convertedText: string;
    dialectTitle?: string;
    vocabularyNotes?: string[];
    catchyHookAlternative?: string;
    phoneticGuide?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const selectedDialect = DIALECTS.find((d) => d.id === targetDialectId) || DIALECTS[0];

  const handleConvert = async () => {
    if (!sourceText.trim()) {
      setError('يرجى إدخال النص المراد تحويله أولاً.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/convert-dialect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText.trim(),
          targetDialect: targetDialectId,
          targetDialectName: selectedDialect.nameAr,
          tone,
          addTashkeel,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'فشل تحويل اللهجة');
      }

      setResult(data.data);
    } catch (err: any) {
      console.error('Convert dialect error:', err);
      setError(err?.message || 'حدث خطأ أثناء الاتصال بنموذج تحويل اللهجات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.convertedText) return;
    navigator.clipboard.writeText(result.convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToStudio = () => {
    if (!result?.convertedText) return;
    onSendToStudio(result.convertedText, targetDialectId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>محول اللهجات التكيفي بالذكاء الاصطناعي</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            حوّل أي نص أو فكرة إلى لهجتك المفضلة بضغطة زر
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            اكتب نصك بالعربية الفصحى أو بأي لهجة، وسيقوم الذكاء الاصطناعي بإعادة صياغته بالمفردات والتراكيب
            المحلية الدقيقة والتشكيل الصوتي المتقن ليكون جاهزاً فوراً للتسجيل.
          </p>
        </div>
      </div>

      {/* Conversion Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input Text and Options */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              النص الأصلي (فصحى أو مسودة):
            </h3>
            <button
              onClick={() =>
                setSourceText(
                  'هل ترغب في تحسين عملك وزيادة مبيعاتك في وقت قصير؟ تطبيقنا يوفر لك كل الحلول السريعة بضغطة زر واحدة. تواصل معنا الآن ولا تفوت هذه الفرصة الرائعة.'
                )
              }
              className="text-[11px] text-amber-400 hover:underline"
            >
              استرجاع نص تجريبي
            </button>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={6}
            dir="rtl"
            placeholder="اكتب أو الصق النص هنا..."
            className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-slate-100 text-sm leading-relaxed placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-all font-sans"
          />

          {/* Controls: Target Dialect & Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                اللهجة المستهدفة:
              </label>
              <select
                value={targetDialectId}
                onChange={(e) => setTargetDialectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              >
                {DIALECTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.flag} {d.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                طابع ونبرة النص:
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="إعلاني حماسي ومقنع">إعلاني تسويقي حماسي</option>
                <option value="عفوي وودي كصديق مقرب">عفوي وودي وبسيط</option>
                <option value="وثائقي ووقور">وثائقي هادئ ووقور</option>
                <option value="شبابي وسريع لريلز وتيك توك">شبابي سريع (Social Reels)</option>
                <option value="فكاهي ومرح">مرح وخفيف الظل</option>
                <option value="رسمي واحترافي">رسمي للشركات والمؤسسات</option>
              </select>
            </div>
          </div>

          {/* Tashkeel checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="tashkeel-check"
              checked={addTashkeel}
              onChange={(e) => setAddTashkeel(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="tashkeel-check" className="text-xs text-slate-300 cursor-pointer">
              إضافة التشكيل (الحركات) لضبط مخارج الحروف للفويس أوفر بدقة
            </label>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={isLoading || !sourceText.trim()}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              isLoading || !sourceText.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/20 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري تحويل النص إلى {selectedDialect.nameAr}...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>تحويل النص إلى {selectedDialect.nameAr}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Output & Dialect Insights */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedDialect.flag}</span>
                <h3 className="text-sm font-bold text-white">
                  النص بعد التحويل ({selectedDialect.nameAr}):
                </h3>
              </div>

              {result?.convertedText && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="نسخ النص"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {result?.convertedText ? (
              <div className="space-y-4">
                {/* Result Text Box */}
                <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/30 text-slate-100 text-base leading-relaxed font-sans shadow-inner">
                  {result.convertedText}
                </div>

                {/* Catchy Hook Alternative */}
                {result.catchyHookAlternative && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> خطاف افتتاحي بديل (Catchy Hook):
                    </span>
                    <p className="text-slate-200">"{result.catchyHookAlternative}"</p>
                  </div>
                )}

                {/* Vocabulary & Pronunciation Notes */}
                {result.vocabularyNotes && result.vocabularyNotes.length > 0 && (
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1.5">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-400" /> ملاحظات المفردات والنطق المحلي:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {result.vocabularyNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Phonetic guide */}
                {result.phoneticGuide && (
                  <p className="text-[11px] text-slate-400 italic flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>نصيحة الإلقاء: {result.phoneticGuide}</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-2xl">
                <Wand2 className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-xs text-slate-400">
                  اضغط على زر "تحويل النص" بالأسفل لرؤية الصياغة المحلية بالتشكيل والملاحظات الصوتية هنا.
                </p>
              </div>
            )}
          </div>

          {/* Action button: Send to Studio */}
          {result?.convertedText && (
            <button
              onClick={handleSendToStudio}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال هذا النص إلى استوديو التسجيل الصوتي الآن</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
