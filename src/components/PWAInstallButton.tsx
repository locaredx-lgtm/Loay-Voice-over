import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, HelpCircle, Smartphone } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenHelp: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenHelp }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (isInstalled) {
    return (
      <button
        onClick={onOpenHelp}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700/60 transition-colors"
        title="كيفية تنزيل الصوت وتثبيت التطبيق"
      >
        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
        <span>دليل التحميل</span>
      </button>
    );
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
        title="تثبيت التطبيق على جهازك للوصول السريع"
      >
        <Download className="w-3.5 h-3.5" />
        <span>تثبيت التطبيق</span>
      </button>
    );
  }

  return (
    <button
      onClick={onOpenHelp}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors"
      title="كيفية تنزيل الصوت وتثبيت التطبيق"
    >
      <Download className="w-3.5 h-3.5 text-amber-400" />
      <span>طريقة التحميل؟</span>
    </button>
  );
};
