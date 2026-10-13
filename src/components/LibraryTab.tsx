import React, { useState } from 'react';
import { VoiceoverItem } from '../types';
import {
  FolderArchive, Play, Pause, Download, Trash2, Star, Search,
  Calendar, Clock, Sparkles, AlertCircle
} from 'lucide-react';

interface LibraryTabProps {
  items: VoiceoverItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectToPlay: (item: VoiceoverItem) => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({
  items,
  onDeleteItem,
  onClearAll,
  onToggleFavorite,
  onSelectToPlay,
}) => {
  const [search, setSearch] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const audioRefs = React.useRef<{ [key: string]: HTMLAudioElement }>({});

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.text.toLowerCase().includes(search.toLowerCase()) ||
      item.dialectName.toLowerCase().includes(search.toLowerCase()) ||
      item.voiceName.toLowerCase().includes(search.toLowerCase());
    const matchesFav = !filterFavorites || item.isFavorite;
    return matchesSearch && matchesFav;
  });

  const toggleInlinePlay = (item: VoiceoverItem) => {
    if (playingId === item.id) {
      if (audioRefs.current[item.id]) {
        audioRefs.current[item.id].pause();
      }
      setPlayingId(null);
    } else {
      // Pause any currently playing
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause();
      }
      if (!audioRefs.current[item.id]) {
        audioRefs.current[item.id] = new Audio(`data:audio/wav;base64,${item.audioBase64}`);
        audioRefs.current[item.id].onended = () => setPlayingId(null);
      }
      audioRefs.current[item.id].currentTime = 0;
      audioRefs.current[item.id].play();
      setPlayingId(item.id);
    }
  };

  const handleDownload = (item: VoiceoverItem) => {
    try {
      const byteCharacters = atob(item.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      const cleanDialect = item.dialectName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
      a.download = `Sawtek_${cleanDialect}_${item.id}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('ar-EG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-amber-400" />
            <span>مكتبة التسجيلات الصوتية</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            جميع التسجيلات التي تم إنتاجها في هذا المتصفح محفوظة تلقائياً للتحميل والمراجعة.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح جميع التسجيلات</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في التسجيلات بالنص أو اللهجة أو اسم الصوت..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          onClick={() => setFilterFavorites(!filterFavorites)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            filterFavorites
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Star className={`w-4 h-4 ${filterFavorites ? 'fill-slate-950' : ''}`} />
          <span>المفضلة فقط</span>
        </button>
      </div>

      {/* Records List */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl p-8">
          <FolderArchive className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-300">لا توجد تسجيلات بعد</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            قم بالدخول إلى "الاستوديو" وقم بتوليد فويس أوفر بأي لهجة ترغب بها، وسيتم حفظها هنا تلقائياً.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isPlaying = playingId === item.id;
            return (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left Side: Play Button & Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleInlinePlay(item)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-400 hover:scale-105'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-amber-400 mr-0.5" />}
                  </button>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/20">
                        {item.dialectName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300">
                        {item.voiceName}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-sans">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      item.isFavorite
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-slate-500 hover:text-amber-300 hover:bg-slate-800'
                    }`}
                    title={item.isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  >
                    <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectToPlay(item)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    فتح في المشغل الكامل
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 transition-colors"
                    title="تحميل كملف WAV"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="حذف التسجيل"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
