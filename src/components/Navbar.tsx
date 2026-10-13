import React from 'react';
import { Mic2, Radio, Sparkles, FolderArchive, BookOpen, Volume2, Wand2 } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: 'studio' | 'converter' | 'writer' | 'library' | 'guide';
  setActiveTab: (tab: 'studio' | 'converter' | 'writer' | 'library' | 'guide') => void;
  savedCount: number;
  onOpenDownloadHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedCount, onOpenDownloadHelp }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 shadow-lg shadow-amber-500/25 text-slate-950 font-bold">
              <Mic2 className="w-6 h-6 text-slate-950" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  صَـوتَك <span className="text-amber-400 text-lg sm:text-xl font-extrabold">Sawtek AI</span>
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Sparkles className="w-3 h-3" /> استوديو كل اللهجات
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                فويس أوفر بالذكاء الاصطناعي بجميع اللهجات العربية والعالمية بدقة نطق عالية
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'studio'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>الاستوديو</span>
            </button>

            <button
              onClick={() => setActiveTab('converter')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'converter'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">محول</span>
              <span>اللهجات</span>
            </button>

            <button
              onClick={() => setActiveTab('writer')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'writer'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">كاتب</span>
              <span>الاسكريبت</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'library'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <FolderArchive className="w-4 h-4" />
              <span>المكتبة</span>
              {savedCount > 0 && (
                <span className={`inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'library' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>دليل اللهجات</span>
            </button>
          </nav>

          {/* Download & Install App Quick Button */}
          <div className="flex items-center gap-2">
            <PWAInstallButton onOpenHelp={onOpenDownloadHelp} />
          </div>

        </div>
      </div>
    </header>
  );
};
