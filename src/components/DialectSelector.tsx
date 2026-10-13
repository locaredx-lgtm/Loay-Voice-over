import React, { useState } from 'react';
import { Dialect } from '../types';
import { DIALECTS } from '../data/dialectsData';
import { Search, Globe2, Sparkles, Check } from 'lucide-react';

interface DialectSelectorProps {
  selectedDialectId: string;
  onSelectDialect: (dialect: Dialect) => void;
}

export const DialectSelector: React.FC<DialectSelectorProps> = ({
  selectedDialectId,
  onSelectDialect,
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    { id: 'all', name: 'جميع اللهجات' },
    { id: 'egypt', name: 'مصر 🇪🇬' },
    { id: 'gulf', name: 'السعودية والخليج 🇸🇦🇦🇪' },
    { id: 'levant', name: 'بلاد الشام 🇸🇾🇱🇧🇯🇴' },
    { id: 'maghreb', name: 'المغرب العربي 🇲🇦🇩🇿🇹🇳' },
    { id: 'iraq_sudan_yemen', name: 'العراق والسودان واليمن 🇮🇶🇸🇩🇾🇪' },
    { id: 'msa', name: 'الفصحى المعاصرة 🌐' },
    { id: 'global', name: 'عالمي 🌍' },
  ];

  const filteredDialects = DIALECTS.filter((d) => {
    const matchesRegion = activeRegion === 'all' || d.region === activeRegion;
    const matchesSearch =
      d.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">اختر اللهجة المستهدفة:</h3>
          <span className="text-xs text-slate-400 font-mono">({DIALECTS.length} لهجة متاحة)</span>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن لهجة (مصرية، نجدية، شامية...)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Region Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {regions.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setActiveRegion(reg.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeRegion === reg.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {reg.name}
          </button>
        ))}
      </div>

      {/* Dialects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
        {filteredDialects.map((d) => {
          const isSelected = d.id === selectedDialectId;
          return (
            <div
              key={d.id}
              onClick={() => onSelectDialect(d)}
              className={`group p-3.5 rounded-2xl cursor-pointer border transition-all text-right relative ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-amber-500 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{d.flag}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {d.nameAr}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-sans">{d.nameEn}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mt-1">
                {d.description}
              </p>

              {/* Sample snippet */}
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-amber-400/90 truncate font-sans max-w-[200px]">
                  "{d.samplePhrases[0]}"
                </span>
                <span className="text-slate-500 text-[10px] shrink-0 font-medium">
                  {d.regionNameAr}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
