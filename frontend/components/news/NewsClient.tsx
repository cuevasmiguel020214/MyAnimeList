'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Calendar,
  MessageCircle,
  Share2,
  ChevronRight,
  TrendingUp,
  PlayCircle
} from 'lucide-react';

const MOCK_NEWS = [
  {
    id: 1,
    title: 'Anunciada la adaptación animada de "Dandadan" por Science SARU',
    category: 'Anuncio',
    date: '10 de Mayo, 2026',
    author: 'Admin',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg', // Reusing Jujutsu for placeholder
    excerpt: 'El esperado manga shonen paranormal finalmente recibirá una adaptación animada a cargo del aclamado estudio Science SARU, con fecha de estreno prevista para la próxima temporada de otoño.',
    comments: 124,
    featured: true
  },
  {
    id: 2,
    title: 'El manga de "One Piece" entra en pausa por 3 semanas',
    category: 'Manga',
    date: '9 de Mayo, 2026',
    author: 'NewsTeam',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg', // Placeholder
    excerpt: 'Eiichiro Oda tomará un descanso de tres semanas para preparar la recta final de la serie actual. El manga regresará en el número combinado de la Shonen Jump.',
    comments: 89,
    featured: false
  },
  {
    id: 3,
    title: 'Crunchyroll Anime Awards 2026: Todos los ganadores',
    category: 'Eventos',
    date: '8 de Mayo, 2026',
    author: 'Staff',
    image: 'https://cdn.myanimelist.net/images/anime/1926/141012l.jpg', // Placeholder
    excerpt: 'Descubre qué animes se llevaron los mayores premios en la ceremonia de este año, incluyendo "Anime del Año" y "Mejor Animación".',
    comments: 245,
    featured: false
  },
  {
    id: 4,
    title: 'Nuevo tráiler revelado para "Bleach: Thousand-Year Blood War" Parte 3',
    category: 'Tráiler',
    date: '7 de Mayo, 2026',
    author: 'AnimeNews',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg', // Placeholder
    excerpt: 'Se ha liberado el tercer avance oficial mostrando nuevas escenas de combate y revelando el tema de apertura para la próxima parte del anime.',
    comments: 156,
    featured: false
  }
];

export default function NewsClient() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const categories = ['Todas', 'Anuncio', 'Manga', 'Tráiler', 'Eventos'];

  const featuredArticle = MOCK_NEWS.find(n => n.featured);
  const regularArticles = MOCK_NEWS.filter(n => !n.featured && (activeCategory === 'Todas' || n.category === activeCategory));

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-blue-400" />
            Últimas <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Noticias</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Mantente al día con los anuncios más recientes, tráilers, eventos y novedades
            del mundo del anime y manga.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          
          {/* Main Content (News Feed) */}
          <div className="space-y-8">
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'glass-panel text-slate-300 hover:text-white border border-white/[0.04]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Article */}
            {activeCategory === 'Todas' && featuredArticle && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-blue-500/20 cursor-pointer"
              >
                <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent z-10" />
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500 text-white shadow-lg shadow-pink-500/30">
                      DESTACADO
                    </span>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-300 mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {featuredArticle.category}
                      </span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base max-w-3xl line-clamp-2 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-400">Por <span className="text-white">{featuredArticle.author}</span></span>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
                          <MessageCircle className="w-4 h-4" /> {featuredArticle.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Standard Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularArticles.map((article, i) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel rounded-2xl border border-white/[0.04] overflow-hidden group cursor-pointer hover:border-white/[0.1] transition-colors flex flex-col"
                >
                  <div className="aspect-video w-full relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                        {article.category}
                      </span>
                    </div>
                    {article.category === 'Tráiler' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors z-10">
                        <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
                      <span className="text-xs font-medium text-slate-300">{article.author}</span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MessageCircle className="w-3.5 h-3.5" /> {article.comments}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="flex justify-center pt-4">
              <button className="px-8 py-3 rounded-xl glass-panel border border-white/[0.04] text-sm font-medium text-white hover:bg-white/[0.04] transition-colors">
                Cargar Más Noticias
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Trending Tags */}
            <div className="glass-panel p-5 rounded-2xl border border-white/[0.04]">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                Temas Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#AnimeAwards2026', 'Science SARU', 'Temporada Primavera', 'Tráilers', 'Manga', 'Estrenos'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-xs hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Updates */}
            <div className="glass-panel p-5 rounded-2xl border border-white/[0.04]">
              <h3 className="text-white font-bold mb-4">Últimos Anuncios</h3>
              <div className="space-y-4">
                {[
                  { text: 'Nueva imagen promocional para "Re:Zero Temporada 3"', time: 'Hace 2h' },
                  { text: 'El manga "Sakamoto Days" alcanza 5 millones de copias', time: 'Hace 4h' },
                  { text: 'Confirmada segunda temporada de "Oshi no Ko"', time: 'Hace 6h' },
                  { text: 'Netflix anuncia nuevo anime original de Studio Trigger', time: 'Hace 8h' }
                ].map((update, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <p className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors leading-snug">
                      {update.text}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">{update.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Ver todos <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
