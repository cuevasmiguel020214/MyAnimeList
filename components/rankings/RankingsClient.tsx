'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  TrendingUp,
  Star,
  Users,
  Filter,
  PlayCircle,
  BookOpen
} from 'lucide-react';
import { trendingAnime } from '@/data/anime';
import { formatNumber } from '@/utils';

export default function RankingsClient() {
  const [activeTab, setActiveTab] = useState<'anime' | 'manga' | 'popular'>('anime');

  // Reuse trendingAnime as mock data for all tabs for demonstration purposes
  const rankedItems = trendingAnime.map((anime, index) => ({
    ...anime,
    ranking: index + 1
  }));

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Clasificación <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Global</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Descubre los animes y mangas mejor valorados por la comunidad de AniVault.
            Actualizado diariamente basado en millones de votos.
          </p>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex bg-[#151A22] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('anime')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'anime' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Top Anime
            </button>
            <button
              onClick={() => setActiveTab('manga')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'manga' 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Top Manga
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'popular' 
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Más Populares
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-white/[0.04] text-slate-300 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrar</span>
            </button>
          </div>
        </div>

        {/* Rankings List */}
        <div className="glass-panel rounded-2xl border border-white/[0.04] overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[60px_1fr_120px_120px_120px] gap-4 p-4 border-b border-white/[0.04] bg-white/[0.02]">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Rank</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Título</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Puntuación</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Usuarios</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Estado</div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-white/[0.04]"
            >
              {rankedItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-white/[0.02] transition-colors relative group">
                  <div className="flex flex-col sm:grid sm:grid-cols-[60px_1fr_120px_120px_120px] gap-4 items-center">
                    
                    {/* Rank Badge */}
                    <div className="flex justify-center w-full sm:w-auto">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                        item.ranking === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/20' :
                        item.ranking === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900 shadow-lg shadow-slate-400/20' :
                        item.ranking === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-600/20' :
                        'bg-white/[0.04] text-slate-400'
                      }`}>
                        #{item.ranking}
                      </div>
                    </div>
                    
                    {/* Title & Info */}
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-[50px] sm:w-[60px] flex-shrink-0">
                        {/* We reuse AnimeCard but customized for the row format, or just an image. Let's use an image to keep rows compact */}
                        <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-slate-800">
                          <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.type} • {item.episodes} eps • {item.year}</p>
                        <div className="flex sm:hidden items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs font-bold text-yellow-400"><Star className="w-3 h-3 fill-current" /> {item.score}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-400"><Users className="w-3 h-3" /> {formatNumber(item.members || 0)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="hidden sm:flex justify-center">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold text-lg">{item.score.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Members */}
                    <div className="hidden sm:flex justify-center text-sm text-slate-400 flex-col items-center">
                      <Users className="w-4 h-4 mb-1 opacity-50" />
                      <span>{formatNumber(item.members || 0)}</span>
                    </div>
                    
                    {/* Status */}
                    <div className="hidden sm:flex justify-end text-xs font-medium">
                      <span className={`px-2.5 py-1 rounded-md ${
                        item.status === 'Airing' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        item.status === 'Finished' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination (Mock) */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04]">
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/[0.08] hover:text-white disabled:opacity-50">Anterior</button>
            <button className="w-8 h-8 rounded-lg text-sm font-medium bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">1</button>
            <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/[0.08] hover:text-white">2</button>
            <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/[0.08] hover:text-white">3</button>
            <span className="text-slate-500 px-1">...</span>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/[0.08] hover:text-white">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
