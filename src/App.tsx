/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudioTab } from './components/StudioTab';
import { DialectConverterTab } from './components/DialectConverterTab';
import { ScriptWriterTab } from './components/ScriptWriterTab';
import { LibraryTab } from './components/LibraryTab';
import { DialectGuideTab } from './components/DialectGuideTab';
import { TeleprompterModal } from './components/TeleprompterModal';
import { DownloadHelpModal } from './components/DownloadHelpModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { VoiceoverItem } from './types';
import { Mic, Globe, Sparkles, Heart } from 'lucide-react';

const STORAGE_KEY = 'sawtek_ai_voiceover_library';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'converter' | 'writer' | 'library' | 'guide'>('studio');
  const [isDownloadHelpOpen, setIsDownloadHelpOpen] = useState(false);
  const { isInstallable, install: triggerPWAInstall } = usePWAInstall();

  const [libraryItems, setLibraryItems] = useState<VoiceoverItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [teleprompter, setTeleprompter] = useState<{
    isOpen: boolean;
    text: string;
    title: string;
  }>({
    isOpen: false,
    text: '',
    title: '',
  });

  // Transfer script from Converter or ScriptWriter directly into Studio
  const [transferScript, setTransferScript] = useState<{
    text: string;
    dialectId: string;
  } | null>(null);

  // Sync library items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(libraryItems));
    } catch (err) {
      console.error('Storage error:', err);
    }
  }, [libraryItems]);

  const handleSaveToLibrary = (item: VoiceoverItem) => {
    setLibraryItems((prev) => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setLibraryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف جميع التسجيلات المحفوظة؟')) {
      setLibraryItems([]);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setLibraryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleOpenTeleprompter = (text: string, title: string) => {
    setTeleprompter({
      isOpen: true,
      text,
      title,
    });
  };

  const handleCloseTeleprompter = () => {
    setTeleprompter((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSendToStudio = (script: string, dialectId: string) => {
    setTransferScript({ text: script, dialectId });
    setActiveTab('studio');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToPlayInStudio = (item: VoiceoverItem) => {
    setTransferScript({ text: item.text, dialectId: item.dialectId });
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={libraryItems.length}
        onOpenDownloadHelp={() => setIsDownloadHelpOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'studio' && (
          <StudioTab
            onOpenTeleprompter={handleOpenTeleprompter}
            onSaveToLibrary={handleSaveToLibrary}
            initialScript={transferScript?.text}
            initialDialectId={transferScript?.dialectId}
          />
        )}

        {activeTab === 'converter' && (
          <DialectConverterTab onSendToStudio={handleSendToStudio} />
        )}

        {activeTab === 'writer' && (
          <ScriptWriterTab onSendToStudio={handleSendToStudio} />
        )}

        {activeTab === 'library' && (
          <LibraryTab
            items={libraryItems}
            onDeleteItem={handleDeleteItem}
            onClearAll={handleClearAll}
            onToggleFavorite={handleToggleFavorite}
            onSelectToPlay={handleSelectToPlayInStudio}
          />
        )}

        {activeTab === 'guide' && <DialectGuideTab />}
      </main>

      {/* Teleprompter Fullscreen Modal */}
      <TeleprompterModal
        isOpen={teleprompter.isOpen}
        onClose={handleCloseTeleprompter}
        text={teleprompter.text}
        dialectTitle={teleprompter.title}
      />

      {/* Download Help Modal */}
      <DownloadHelpModal
        isOpen={isDownloadHelpOpen}
        onClose={() => setIsDownloadHelpOpen(false)}
        onTriggerPWAInstall={triggerPWAInstall}
        isInstallable={isInstallable}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">صَوتَك (Sawtek AI)</span>
            <span>•</span>
            <span>استوديو الفويس أوفر الذكي لجميع اللهجات العربية والعالمية</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('studio')}
              className="hover:text-amber-400 transition-colors"
            >
              الاستوديو
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className="hover:text-amber-400 transition-colors"
            >
              محول اللهجات
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-amber-400 transition-colors"
            >
              دليل النطق
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
