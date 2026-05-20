'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Clock,
  Rocket,
  Sword,
  Compass,
  Sparkles,
  HelpCircle,
  Heart,
  Users,
  Cat,
  Search,
  CalendarDays,
  GraduationCap,
  Ghost,
  Flame,
  Gamepad2,
  Moon,
  EyeOff,
  Check
} from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

interface GenreFilterGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: any[];
  onFilterSelect?: (id: string) => void;
  onFiltersChange?: (selectedGenres: string[]) => void;
}

// Estructura de filtros basada exactamente en la referencia visual
const FILTER_GROUPS = [
  {
    title: 'Adapted to Anime',
    filters: [
      { id: 'all_anime', name: 'All', count: '4,697', icon: Monitor },
      { id: 'airing_now', name: 'Airing Now', count: '78', icon: Clock },
      { id: 'upcoming_anime', name: 'Upcoming Anime', count: '304', icon: Rocket, badge: 'NEW' },
    ]
  },
  {
    title: 'Genres',
    filters: [
      { id: 'action', name: 'Action', count: '11.1k', icon: Sword },
      { id: 'adventure', name: 'Adventure', count: '4.6k', icon: Compass },
      { id: 'avant_garde', name: 'Avant Garde', count: '101k', icon: Sparkles },
    ]
  },
  {
    title: 'Genres Ifants',
    filters: [
      { id: 'mystery_1', name: 'Mystery', count: '2.4k', icon: HelpCircle },
      { id: 'mystery_2', name: 'Mystery', count: '2.9k', icon: Search },
      { id: 'romance', name: 'Romance', count: '35.1k', icon: Heart },
    ]
  },
  {
    title: 'Themes',
    filters: [
      { id: 'adult_cast', name: 'Adult Cast', count: '1.8k', icon: Users },
      { id: 'anthropomorphic', name: 'Anthropomorphic', count: '482', icon: Cat },
      { id: 'detective', name: 'Detective', count: '506', icon: Search },
      { id: 'cgdct', name: 'CGDCT', count: '182', icon: CalendarDays },
      { id: 'educational', name: 'Educational', count: '778', icon: GraduationCap },
      { id: 'delinquents', name: 'Delinquents', count: '225', icon: Ghost },
      { id: 'high_stakes', name: 'High Stakes', count: '506', icon: Flame },
      { id: 'survival', name: 'Survival Game', count: '77', icon: Gamepad2 },
    ]
  },
  {
    title: 'Explicit Genres',
    subtitle: 'Mature Content Filters',
    filters: [
      { id: 'ecchi', name: 'Ecchi', count: '4k', icon: Moon },
      { id: 'erotica', name: 'Erotica', count: '11.8k', icon: Heart },
      { id: 'hentai', name: 'Hentai', count: '14k', icon: EyeOff },
    ]
  }
];

export default function GenreFilterGrid({ onFilterSelect, onFiltersChange }: GenreFilterGridProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((f) => f !== id)
      : [...selected, id];
    
    setSelected(newSelected);
    onFilterSelect?.(id);

    // Notificar al padre con los nombres de género seleccionados
    if (onFiltersChange) {
      const allFilters = FILTER_GROUPS.flatMap((g) => g.filters);
      const selectedNames = newSelected
        .map((sid) => allFilters.find((f) => f.id === sid)?.name)
        .filter((name): name is string => !!name);
      onFiltersChange(selectedNames);
    }
  };

  return (
    <div className="w-full bg-[#0B0F19] rounded-2xl p-4 sm:p-6 lg:p-8 border border-[rgba(255,255,255,0.06)] shadow-2xl">
      
      {/* Header Premium */}
      <div className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Manga Filters <span className="text-[#9CA3AF] font-normal text-lg">/ Advanced Search</span>
        </h2>
        <p className="text-[#9CA3AF] text-sm mt-1">
          Discover manga using advanced categories and themes.
        </p>
      </div>

      {/* Main Filter Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {FILTER_GROUPS.slice(0, 3).map((group, idx) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-white tracking-wide">{group.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.filters.map((filter) => (
                  <FilterCard 
                    key={filter.id} 
                    filter={filter} 
                    isActive={selected.includes(filter.id)} 
                    onClick={() => toggle(filter.id)} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-8">
          {/* Explicit Genres (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">{FILTER_GROUPS[4].title}</h3>
              <p className="text-[11px] text-[#9CA3AF]">{FILTER_GROUPS[4].subtitle}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FILTER_GROUPS[4].filters.map((filter) => (
                <FilterCard 
                  key={filter.id} 
                  filter={filter} 
                  isActive={selected.includes(filter.id)} 
                  onClick={() => toggle(filter.id)} 
                />
              ))}
            </div>
          </motion.div>

          {/* Themes (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-white tracking-wide">{FILTER_GROUPS[3].title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FILTER_GROUPS[3].filters.map((filter) => (
                <FilterCard 
                  key={filter.id} 
                  filter={filter} 
                  isActive={selected.includes(filter.id)} 
                  onClick={() => toggle(filter.id)} 
                />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

// Sub-componente para las tarjetas de filtro (Card Premium)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FilterCard({ filter, isActive, onClick }: { filter: any, isActive: boolean, onClick: () => void }) {
  const Icon = filter.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl transition-all duration-300 w-full aspect-[4/3] outline-none select-none overflow-hidden ${
        isActive
          ? 'bg-[#151A22] border border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.15)]'
          : 'bg-[#151A22] border border-[rgba(255,255,255,0.06)] hover:border-[#00D9FF]/50 hover:shadow-[0_0_15px_rgba(0,217,255,0.1)]'
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Active Glow Background */}
      {isActive && (
        <div className="absolute inset-0 bg-[#00D9FF]/5 blur-xl pointer-events-none" />
      )}

      {/* Checkmark Indicator (Active State) */}
      {isActive && (
        <div className="absolute top-2 right-2 text-[#00D9FF]">
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
      )}

      {/* Badge (e.g. NEW) */}
      {filter.badge && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider text-red-400 border border-red-400/30">
          {filter.badge}
        </div>
      )}

      {/* Main Icon */}
      <div className={`transition-colors duration-300 ${isActive ? 'text-[#00D9FF]' : 'text-[#9CA3AF] group-hover:text-white'}`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
      </div>

      {/* Text Container */}
      <div className="flex flex-col items-center">
        <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[#00D9FF]' : 'text-white'}`}>
          {filter.name}
        </span>
        <span className="text-[10px] text-[#9CA3AF] mt-0.5">
          {filter.count} items
        </span>
      </div>
    </motion.button>
  );
}
