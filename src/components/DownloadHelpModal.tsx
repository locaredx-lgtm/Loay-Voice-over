import React from 'react';
import { X, Download, Smartphone, Monitor, Music, CheckCircle2, ArrowRight } from 'lucide-react';

interface DownloadHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPWAInstall?: () => void;
  isInstallable?: boolean;
}

export const DownloadHelpModal: React.FC<DownloadHelpModalProps> = ({
  isOpen,
  onClose,
  onTriggerPWAInstall,
  isInstallable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative text-right">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">طريقة التحميل والتنزيل (Download Guide)</h3>
            <p className="text-xs text-slate-400">سواء كنت تريد تنزيل الملف الصوتي أو تثبيت التطبيق</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Method 1: Download Audio File */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Music className="w-4 h-4" />
              <span>1. كيفية تحميل ملف الفويس أوفر (صوت WAV عالي الجودة):</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pr-1 leading-relaxed">
              <li>
                اكتب النص في تبويب <strong className="text-white">الاستوديو</strong>، واختر اللهجة، واضغط الزر البرتقالي الكبير <strong className="text-amber-400">"توليد الفويس أوفر"</strong>.
              </li>
              <li>
                بمجرد اكتمال التوليد، سيظهر مشغل الصوت في الأعلى وفيه زر أخضر بارز مكتوب عليه:
                <span className="inline-flex items-center gap-1 mx-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs">
                  <Download className="w-3 h-3" /> تحميل WAV
                </span>
              </li>
              <li>
                اضغط عليه وسيبدأ التحميل فوراً في مجلد <strong className="text-white">التنزيلات (Downloads)</strong> بجهازك.
              </li>
              <li>
                يمكنك أيضاً الذهاب لتبويب <strong className="text-white">"المكتبة"</strong> وتنزيل أي تسجيل سابق بنفس الطريقة.
              </li>
            </ol>
          </div>

          {/* Method 2: Download / Install App on Phone or PC */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Smartphone className="w-4 h-4" />
              <span>2. كيفية تثبيت التطبيق على جهازك أو هاتفك (PWA App):</span>
            </div>
            <div className="space-y-2 text-slate-300 pr-1 leading-relaxed">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-amber-400" /> على الكمبيوتر (Chrome أو Edge):
                </p>
                <p className="text-xs text-slate-400">
                  اضغط على أيقونة التثبيت <span className="text-amber-400">⊞</span> في شريط عنوان المتصفح أو زر <strong className="text-white">"تثبيت التطبيق"</strong> في أعلى الشاشة.
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" /> على هواتف الآيفون (iPhone Safari):
                </p>
                <p className="text-xs text-slate-400">
                  اضغط على زر المشاركة <span className="text-white font-bold">[⎋]</span> بالأسفل، ثم اختر <strong className="text-white">"إضافة إلى الشاشة الرئيسية (Add to Home Screen)"</strong>.
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> على هواتف الأندرويد (Android Chrome):
                </p>
                <p className="text-xs text-slate-400">
                  اضغط على قائمة النقاط الثلاث <span className="text-white">⋮</span> ثم اختر <strong className="text-white">"تثبيت التطبيق"</strong> أو <strong className="text-white">"إضافة للشاشة الرئيسية"</strong>.
                </p>
              </div>
            </div>

            {isInstallable && onTriggerPWAInstall && (
              <button
                onClick={onTriggerPWAInstall}
                className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>تثبيت التطبيق على هذا الجهاز الآن</span>
              </button>
            )}
          </div>

        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            فهمت، حسناً
          </button>
        </div>

      </div>
    </div>
  );
};
