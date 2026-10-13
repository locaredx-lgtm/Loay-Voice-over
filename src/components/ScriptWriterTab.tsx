import React, { useState } from 'react';
import { DIALECTS, STYLES } from '../data/dialectsData';
import { Sparkles, FileText, Send, Loader2, AlertCircle, Copy, Check, Clock, Target, Lightbulb } from 'lucide-react';

interface ScriptWriterTabProps {
  onSendToStudio: (script: string, dialectId: string) => void;
}

export const ScriptWriterTab: React.FC<ScriptWriterTabProps> = ({ onSendToStudio }) => {
  const [topic, setTopic] = useState('إعلان لتطبيق توصيل أطعمة ومقاضي سريع جداً');
  const [dialectId, setDialectId] = useState('saudi_najdi');
  const [styleId, setStyleId] = useState('energetic_commercial');
  const [duration, setDuration] = useState('30s');
  const [targetAudience, setTargetAudience] = useState('الشباب والعائلات الباحثين عن توفير الوقت');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedScript, setGeneratedScript] = useState<{
    title?: string;
    script: string;
    hook?: string;
    callToAction?: string;
    pacingTip?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const selectedDialect = DIALECTS.find((d) => d.id === dialectId) || DIALECTS[0];
  const selectedStyle = STYLES.find((s) => s.id === styleId) || STYLES[0];

  const presets = [
    { title: 'إعلان تطبيق توصيل سريع', dialect: 'egyptian', text: 'إعلان لتطبيق توصيل طلبات بقالة وأطعمة سريع جداً مع خصم ٥٠٪ لأول أوردر' },
    { title: 'إعلان فيلا عقارية فاخرة', dialect: 'saudi_najdi', text: 'إعلان لمشروع فلل سكنية فاخرة شمال الرياض بتصاميم ذكية ومسطحات خضراء' },
    { title: 'ريلز كافيه وأجواء قهوة', dialect: 'levantine_lebanese', text: 'ريلز تيك توك وإنستغرام عن كافيه مميز يقدم قهوة مختصة وحلويات غربية' },
    { title: 'وثائقي أسرار التاريخ والآثار', dialect: 'msa_standard', text: 'مقدمة فيلم وثائقي مشوق عن أسرار بناء الأهرامات وعظمة الفراعنة' },
    { title: 'عرض أزياء وموضة حصرية', dialect: 'emirati', text: 'إعلان لبراند عبايات وأزياء خليجية راقية مع شحن سريع مجاني' },
    { title: 'بودكاست ريادة الأعمال', dialect: 'iraqi', text: 'افتتاحية بودكاست حماسي عن كيفية بدء مشروع رقمي من الصفر والتغلب على الصعاب' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('يرجى إدخال فكرة أو موضوع السكريبت.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          dialectName: selectedDialect.nameAr,
          styleName: selectedStyle.nameAr,
          duration,
          targetAudience,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'فشل كتابة السكريبت');
      }

      setGeneratedScript(data.data);
    } catch (err: any) {
      console.error('Script writer error:', err);
      setError(err?.message || 'حدث خطأ أثناء كتابة الاسكريبت');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedScript?.script) return;
    navigator.clipboard.writeText(generatedScript.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToStudio = () => {
    if (!generatedScript?.script) return;
    onSendToStudio(generatedScript.script, dialectId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>كاتب السيناريو الإعلاني والصوتي بالذكاء الاصطناعي</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            صناعة اسكريبتات احترافية مصممة خصيصاً للهجتك
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            أدخل فكرتك أو منتجك، وسيقوم الذكاء الاصطناعي بكتابة سكريبت كامل بخطاف جذاب (Hook)
            ودعوة واضحة للشراء (CTA) مهيأ فوراً لتسجيل الفويس أوفر.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Parameters */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              موضوع أو فكرة الاسكريبت:
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="عن ماذا يتحدث الاسكريبت؟ (منتج، خدمة، فكرة بودكاست، قصة...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Quick presets chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" /> أفكار شائعة بنقرة واحدة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(p.text);
                    setDialectId(p.dialect);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dialect and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                اللهجة المستهدفة:
              </label>
              <select
                value={dialectId}
                onChange={(e) => setDialectId(e.target.value)}
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
                المدة التقريبية المطلوبة:
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: '15s', label: '١٥ ث' },
                  { id: '30s', label: '٣٠ ث' },
                  { id: '60s', label: '٦٠ ث' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      duration === d.id
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Style and Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                طابع الإلقاء:
              </label>
              <select
                value={styleId}
                onChange={(e) => setStyleId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              >
                {STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                الجمهور المستهدف:
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                placeholder="مثال: رواد أعمال، أمهات، شباب..."
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              isLoading || !topic.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/20 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري صياغة الاسكريبت بالذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>توليد الاسكريبت الصوتي الآن</span>
              </>
            )}
          </button>
        </div>

        {/* Output Display */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  {generatedScript?.title || 'الاسكريبت المكتوب:'}
                </h3>
              </div>

              {generatedScript?.script && (
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="نسخ النص"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {generatedScript?.script ? (
              <div className="space-y-3.5">
                {/* Main Script */}
                <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/30 text-slate-100 text-base leading-relaxed font-sans shadow-inner">
                  {generatedScript.script}
                </div>

                {/* Hook & CTA details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {generatedScript.hook && (
                    <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
                      <span className="font-bold text-amber-400 block mb-1">
                        🎯 الخطاف الافتتاحي (Hook):
                      </span>
                      <p className="text-slate-300">"{generatedScript.hook}"</p>
                    </div>
                  )}

                  {generatedScript.callToAction && (
                    <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
                      <span className="font-bold text-emerald-400 block mb-1">
                        📢 الدعوة للعمل (CTA):
                      </span>
                      <p className="text-slate-300">"{generatedScript.callToAction}"</p>
                    </div>
                  )}
                </div>

                {/* Pacing Tip */}
                {generatedScript.pacingTip && (
                  <p className="text-[11px] text-slate-400 italic">
                    💡 نصيحة الإلقاء والتنفس: {generatedScript.pacingTip}
                  </p>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-2xl">
                <FileText className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-xs text-slate-400">
                  اكتب فكرتك واضغط على "توليد الاسكريبت الصوتي" للحصول على سيناريو مكتوب باحترافية للهجتك.
                </p>
              </div>
            )}
          </div>

          {generatedScript?.script && (
            <button
              onClick={handleSendToStudio}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال هذا الاسكريبت إلى استوديو الفويس أوفر للتسجيل</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
