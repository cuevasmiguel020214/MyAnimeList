'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  ChevronRight,
  Clock
} from 'lucide-react';
import { formatNumber } from '@/utils';

// Mock Data para la comunidad
const MOCK_REVIEWS = [
  {
    id: 1,
    user: { name: 'OtakuMaster', avatar: 'O', color: 'from-blue-500 to-purple-500' },
    anime: 'Frieren: Beyond Journey\'s End',
    score: 10,
    date: 'Hace 2 horas',
    content: 'Una obra maestra absoluta. El ritmo pausado al principio puede engañar, pero la forma en que explora el paso del tiempo, el arrepentimiento y la conexión humana es simplemente sublime. La animación en las peleas es inesperadamente espectacular.',
    likes: 342,
    comments: 45,
    tags: ['Obra Maestra', 'Emocional', 'Fantasía'],
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg'
  },
  {
    id: 2,
    user: { name: 'ShonenFan99', avatar: 'S', color: 'from-red-500 to-orange-500' },
    anime: 'Jujutsu Kaisen Season 2',
    score: 9,
    date: 'Hace 5 horas',
    content: 'El arco de Shibuya es todo lo que prometían y más. La dirección de episodios es una locura, aunque a veces se nota la presión sobre los animadores. La coreografía de combate de Sukuna vs Jogo es historia de la animación.',
    likes: 856,
    comments: 112,
    tags: ['Acción', 'Oscuro', 'Animación Top'],
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg'
  },
  {
    id: 3,
    user: { name: 'RomComLover', avatar: 'R', color: 'from-pink-500 to-rose-500' },
    anime: 'Kaguya-sama: Love is War',
    score: 9.5,
    date: 'Hace 1 día',
    content: 'La mejor comedia romántica de la última década. Los chistes siempre aterrizan bien, y el desarrollo de personajes es genuinamente bueno. El final de la tercera temporada fue la recompensa perfecta a toda la construcción.',
    likes: 231,
    comments: 28,
    tags: ['Comedia', 'Romance', 'Escolar'],
    image: 'https://cdn.myanimelist.net/images/anime/1644/123086l.jpg'
  }
];

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: '¿Cuál es el mejor sistema de poder en el Shonen actual?',
    author: 'AnimeTheorist',
    replies: 156,
    views: 1205,
    lastActive: 'Hace 5 min',
    tags: ['Discusión', 'Shonen'],
    hot: true
  },
  {
    id: 2,
    title: 'Predicciones para el final de One Piece (Teorías locas permitidas)',
    author: 'PirateKing2024',
    replies: 432,
    views: 5400,
    lastActive: 'Hace 12 min',
    tags: ['Teorías', 'One Piece'],
    hot: true
  },
  {
    id: 3,
    title: 'Recomendaciones de manga Seinen poco conocidos',
    author: 'UndergroundReader',
    replies: 45,
    views: 320,
    lastActive: 'Hace 1 hora',
    tags: ['Recomendaciones', 'Seinen'],
    hot: false
  },
  {
    id: 4,
    title: 'Análisis del simbolismo en Evangelion (Otra vez)',
    author: 'EvaFanboy',
    replies: 89,
    views: 670,
    lastActive: 'Hace 3 horas',
    tags: ['Análisis', 'Clásicos'],
    hot: false
  }
];

export default function CommunityClient() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'discussions'>('reviews');

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Comunidad y <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Reseñas</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Únete a la conversación. Descubre qué opina la comunidad sobre los últimos estrenos, 
            comparte tus propias reseñas y participa en discusiones profundas.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Reseñas Totales', value: '142,593', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { label: 'Usuarios Activos', value: '8,432', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Discusiones', value: '24,105', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { label: 'Nuevos Hoy', value: '+342', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-2xl border border-white/[0.04] flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* Left Column (Tabs + Content) */}
          <div className="space-y-6">
            
            {/* Tabs & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-2 rounded-2xl border border-white/[0.04]">
              <div className="flex bg-[#151A22] p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'reviews' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Reseñas Recientes
                </button>
                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'discussions' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Foro de Discusión
                </button>
              </div>
              
              <div className="flex items-center gap-2 px-2">
                <button className="p-2.5 rounded-xl bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  {activeTab === 'reviews' ? 'Escribir Reseña' : 'Nuevo Tema'}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'reviews' ? (
                  <div className="space-y-4">
                    {MOCK_REVIEWS.map((review) => (
                      <div key={review.id} className="glass-panel p-5 rounded-2xl border border-white/[0.04] group hover:border-white/[0.1] transition-colors">
                        <div className="flex flex-col sm:flex-row gap-5">
                          {/* Anime Poster (Hidden on mobile for space) */}
                          <div className="hidden sm:block relative w-[100px] h-[140px] rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={review.image} alt={review.anime} fill className="object-cover" />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs font-bold text-white">{review.score}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.user.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                  {review.user.avatar}
                                </div>
                                <div>
                                  <p className="text-white font-medium text-sm">{review.user.name}</p>
                                  <p className="text-slate-400 text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {review.date}
                                  </p>
                                </div>
                              </div>
                              <div className="sm:hidden flex items-center gap-1 px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm font-bold">
                                <Star className="w-3 h-3 fill-yellow-400" />
                                {review.score}
                              </div>
                            </div>
                            
                            {/* Anime Title */}
                            <h3 className="text-blue-400 font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors cursor-pointer">
                              {review.anime}
                            </h3>
                            
                            {/* Review Content */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {review.content}
                            </p>
                            
                            {/* Review Footer */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex flex-wrap gap-2">
                                {review.tags.map(tag => (
                                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px] font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-slate-400 hover:text-pink-400 transition-colors">
                                  <Heart className="w-4 h-4" />
                                  <span className="text-xs">{review.likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                                  <MessageCircle className="w-4 h-4" />
                                  <span className="text-xs">{review.comments}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel rounded-2xl border border-white/[0.04] overflow-hidden">
                    <div className="hidden sm:grid grid-cols-[1fr_100px_100px_120px] gap-4 p-4 border-b border-white/[0.04] bg-white/[0.02]">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tema</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Respuestas</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Vistas</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Última Actividad</div>
                    </div>
                    
                    <div className="divide-y divide-white/[0.04]">
                      {MOCK_DISCUSSIONS.map((disc) => (
                        <div key={disc.id} className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                          <div className="flex flex-col sm:grid sm:grid-cols-[1fr_100px_100px_120px] gap-4 items-center">
                            <div className="w-full">
                              <div className="flex items-center gap-2 mb-1">
                                {disc.hot && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                                    HOT
                                  </span>
                                )}
                                <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                                  {disc.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>Por <span className="text-slate-300">{disc.author}</span></span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <div className="flex gap-1">
                                  {disc.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/[0.06] text-slate-300">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="hidden sm:flex justify-center text-sm font-medium text-slate-300">
                              {disc.replies}
                            </div>
                            <div className="hidden sm:flex justify-center text-sm font-medium text-slate-300">
                              {formatNumber(disc.views)}
                            </div>
                            <div className="hidden sm:flex justify-end text-xs text-slate-400">
                              {disc.lastActive}
                            </div>
                            
                            {/* Mobile stats */}
                            <div className="flex sm:hidden w-full items-center justify-between text-xs text-slate-400 mt-2">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {disc.replies}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {formatNumber(disc.views)}</span>
                              </div>
                              <span>{disc.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Pagination (Mock) */}
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04]">
                    <button className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/[0.08] hover:text-white disabled:opacity-50">Anterior</button>
                    <button className="w-8 h-8 rounded-lg text-sm font-medium bg-blue-500 text-white">1</button>
                    <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/[0.08] hover:text-white">2</button>
                    <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/[0.08] hover:text-white">3</button>
                    <span className="text-slate-500 px-1">...</span>
                    <button className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-white/[0.08] hover:text-white">Siguiente</button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            
            {/* Search */}
            <div className="glass-panel p-4 rounded-2xl border border-white/[0.04]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar en la comunidad..." 
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#151A22] border border-white/[0.06] text-sm text-white focus:border-blue-500/50 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Trending Tags */}
            <div className="glass-panel p-5 rounded-2xl border border-white/[0.04]">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                Tendencias
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#Primavera2026', '#AnimeAwards', 'Recomendaciones', 'Análisis', '#MangaLunes', 'Teorías', 'Noticias'].map((tag) => (
                  <Link href="#" key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-xs hover:bg-white/[0.08] hover:text-white transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Reviewers */}
            <div className="glass-panel p-5 rounded-2xl border border-white/[0.04]">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Top Reseñadores
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'AnimeMaster', score: 1450, color: 'from-amber-400 to-orange-500', rank: 1 },
                  { name: 'WeebCritic', score: 1230, color: 'from-slate-300 to-slate-500', rank: 2 },
                  { name: 'MangaReader', score: 980, color: 'from-amber-600 to-orange-800', rank: 3 },
                  { name: 'CasualFan', score: 850, color: 'from-blue-400 to-blue-600', rank: 4 },
                  { name: 'ReviewerChan', score: 720, color: 'from-pink-400 to-pink-600', rank: 5 },
                ].map((user) => (
                  <div key={user.name} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {user.name[0]}
                        </div>
                        {user.rank <= 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#0B0F19] flex items-center justify-center">
                            <span className="text-[8px] font-bold text-black">{user.rank}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{user.name}</p>
                        <p className="text-[10px] text-slate-500">{user.score} ptos</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Community Rules CTA */}
            <div className="glass-panel p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-white font-bold mb-2">Normas de la Comunidad</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Para mantener un ambiente amigable, por favor respeta las opiniones de los demás, evita el spam y usa etiquetas de spoiler cuando sea necesario.
              </p>
              <button className="w-full py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white hover:bg-white/[0.08] transition-colors">
                Leer Normas
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
