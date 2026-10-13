import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, Globe2, Mic } from 'lucide-react';
import { DIALECTS } from '../data/dialectsData';

export const DialectGuideTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>المعجم الصوتي واللهجات العربية</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            دليل أسرار النطق ومخارج الحروف في الفويس أوفر
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            تعرف على الفروق الصوتية الجوهرية بين اللهجات العربية، وكيفية ضبط مخارج الحروف الشائعة
            (القاف، الجيم، الكاف) لتقديم أداء فويس أوفر أصيل يقنع الجمهور المحلي في كل دولة.
          </p>
        </div>
      </div>

      {/* Phonetic Comparison Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>جدول التحولات الصوتية الشائعة (The Phonetic Matrix):</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-amber-400">
                <th className="py-3 px-3">الحرف الأصلي</th>
                <th className="py-3 px-3">مصر 🇪🇬</th>
                <th className="py-3 px-3">السعودية والخليج 🇸🇦🇦🇪</th>
                <th className="py-3 px-3">بلاد الشام 🇸🇾🇱🇧</th>
                <th className="py-3 px-3">المغرب العربي 🇲🇦🇩🇿</th>
                <th className="py-3 px-3">العراق 🇮🇶</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-3 font-bold text-white">القاف (ق)</td>
                <td className="py-3.5 px-3">همزة (أال / قال)</td>
                <td className="py-3.5 px-3">جيم صلبة (G) أو قاف فصيحة</td>
                <td className="py-3.5 px-3">همزة في المدن (ألبي)</td>
                <td className="py-3.5 px-3">قاف قوية أو جيم صلبة (G)</td>
                <td className="py-3.5 px-3">جيم صلبة (G) (أكلك / أقولك)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-white">الجيم (ج)</td>
                <td className="py-3.5 px-3">جيم قاهرية غير معطشة (G)</td>
                <td className="py-3.5 px-3">جيم معطشة فصيحة أو ياء (إمارات)</td>
                <td className="py-3.5 px-3">جيم معطشة ناعمة ولطيفة (Ž)</td>
                <td className="py-3.5 px-3">جيم معطشة فرنسية (J / Ž)</td>
                <td className="py-3.5 px-3">جيم معطشة واضحة وقوية</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-white">الكاف (ك)</td>
                <td className="py-3.5 px-3">كاف عادية</td>
                <td className="py-3.5 px-3">تتحول لتس أحياناً (كشت ← تست)</td>
                <td className="py-3.5 px-3">كاف ناعمة أو چ في الريف</td>
                <td className="py-3.5 px-3">كاف عادية</td>
                <td className="py-3.5 px-3">تتحول إلى (چ / Ch) كثيراً (چلب / چان)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-white">الثاء والذال (ث / ذ)</td>
                <td className="py-3.5 px-3">تتحول لـ س/ت و ز/د</td>
                <td className="py-3.5 px-3">تنطق لثوية فصيحة (ث / ذ) بدقة</td>
                <td className="py-3.5 px-3">تتحول لـ ت/س و د/ز في المدن</td>
                <td className="py-3.5 px-3">تنطق ت/د في الدارجة</td>
                <td className="py-3.5 px-3">تنطق لثوية فصيحة غالباً</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Voiceover Rules for Dialects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            1
          </div>
          <h4 className="text-sm font-bold text-white">لا تترجم حرفياً.. كيّف المفهوم</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            الفرق بين اللهجات ليس فقط في نطق الكلمات بل في طريقة التعبير الثقافي. جملة "ما تضيعش الفرصة" بمصر تقابلها "لا يفوتك الشي هذا" بالسعودية و"ما تراطيش الخدمة" بالمغرب.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            2
          </div>
          <h4 className="text-sm font-bold text-white">سرعة الإيقاع وتوقيت النَفَس</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            اللهجات المغاربية والمصرية إيقاعها أسرع بنسبة 15-20% من اللهجات الخليجية والوثائقية الفصحى. استخدم ضبط السرعة في المشغل للوصول للتناغم المثالي.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
            3
          </div>
          <h4 className="text-sm font-bold text-white">التشكيل الصوتي هو السر</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            عندما تقوم بتشكيل الكلمات بالحركات (الفتحة والضمة والكسرة والشدة)، يفهم نموذج TTS مخارج الكلمات العربية بدقة خيالية ويتجنب أي أخطاء لغوية.
          </p>
        </div>
      </div>

      {/* All Dialects Catalog Showcase */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-amber-400" />
          <span>كتالوج اللهجات المدعومة وميزاتها الصوتية:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIALECTS.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{d.flag}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{d.nameAr}</h4>
                  <span className="text-[11px] text-amber-400 font-mono">{d.nameEn}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">{d.description}</p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400">
                <span className="text-amber-400 font-semibold block mb-0.5">💡 سر النطق:</span>
                {d.phoneticTips}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
