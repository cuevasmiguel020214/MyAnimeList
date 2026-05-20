'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  Plus,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  BarChart3,
  MessageSquare,
  Info,
  Bookmark,
  Award,
} from 'lucide-react';
import { formatNumber } from '@/utils';
import type { Manga, Character, Review } from '@/types';

interface MangaDetailClientProps {
  manga: Manga;
  characters: Character[];
  reviews: Review[];
  relatedManga: Manga[];
}

/* Sidebar nav para la página de detalle */
const sidebarNav = [
  { icon: Info, label: 'Detalles' },
  { icon: Users, label: 'Personajes' },
  { icon: BarChart3, label: 'Estadísticas' },
  { icon: Star, label: 'Reseñas' },
  { icon: MessageSquare, label: 'Foro' },
  { icon: Bookmark, label: 'Más Info' },
];

/**
 * MangaDetailClient — Rediseño completo estilo MAL/AniList.
 *
 * Layout de 3 columnas compacto con paneles oscuros modulares.
 * Diseñado para densidad de información y funcionalidad real.
 */
export default function MangaDetailClient({
  manga,
  characters,
  reviews,
  relatedManga,
}: MangaDetailClientProps) {
  const [listStatus, setListStatus] = useState('LEYENDO');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const charScrollRef = useRef<HTMLDivElement>(null);

  const statusOptions = ['LEYENDO', 'VIENDO', 'PLAN PARA VER', 'COMPLETADO', 'EN ESPERA', 'ABANDONADO'];

  const scrollChars = (dir: 'left' | 'right') => {
    charScrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  // Score visual — anillo SVG estilo MAL (rosa/fucsia)
  const scoreRadius = 52;
  const scoreCircumference = 2 * Math.PI * scoreRadius;
  const scoreOffset = scoreCircumference - (manga.score / 10) * scoreCircumference;

  return (
    <div className="detail-bg min-h-screen pt-20 pb-16" id="manga-detail-page">
      {/* ===== BANNER SUTIL ===== */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-30"
          style={{ backgroundImage: `url(${manga.bannerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/60 to-[#0B0F19]" />
      </div>

      {/* ===== CONTENIDO PRINCIPAL — 3 COLUMNAS ===== */}
      <div className="relative -mt-32 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_380px] gap-5">

          {/* ============================== */}
          {/* COLUMNA IZQUIERDA — PORTADA    */}
          {/* ============================== */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Portada */}
            <div className="detail-panel overflow-hidden w-[220px] sm:w-[240px]">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={manga.coverImage}
                  alt={manga.title}
                  fill
                  sizes="240px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ============================== */}
          {/* COLUMNA CENTRAL — INFO CORE    */}
          {/* ============================== */}
          <div className="space-y-4">
            {/* Panel superior: título + score */}
            <div className="detail-panel p-5">
              {/* Título y subtítulo */}
              <div className="mb-5">
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {manga.title}
                </h1>
                {manga.titleJapanese && (
                  <p className="text-sm text-[#A1A1AA] mt-1">{manga.titleJapanese}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#A1A1AA]">
                  <span>{manga.type}</span>
                  <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                  <span>{manga.chapters} Capítulos</span>
                  <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                  <span>{manga.volumes} Volúmenes</span>
                  <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                  <span className={
                    manga.status === 'Publishing' ? 'text-green-400' :
                    manga.status === 'Hiatus' ? 'text-yellow-400' :
                    'text-[#A1A1AA]'
                  }>
                    {manga.status === 'Publishing' ? 'En Publicación' :
                     manga.status === 'Hiatus' ? 'En Pausa' : 'Finalizado'}
                  </span>
                </div>
              </div>

              {/* Score + métricas */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Score Circle — Estilo MAL rosa */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA] uppercase">Puntuación</span>
                  <div className="relative w-[120px] h-[120px]">
                    {/* Glow detrás */}
                    <div className="absolute inset-3 rounded-full bg-[#FF4D8D]/10 blur-xl" />
                    <svg width="120" height="120" className="transform -rotate-90">
                      <circle
                        cx="60" cy="60" r={scoreRadius}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="5" fill="none"
                      />
                      <motion.circle
                        cx="60" cy="60" r={scoreRadius}
                        stroke="#FF4D8D"
                        strokeWidth="5" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={scoreCircumference}
                        initial={{ strokeDashoffset: scoreCircumference }}
                        animate={{ strokeDashoffset: scoreOffset }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255,77,141,0.5))' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{manga.score.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Métricas verticales */}
                <div className="flex sm:flex-col gap-5 sm:gap-3 sm:pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1C2230] flex items-center justify-center">
                      <Award className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">Ranking</p>
                      <p className="text-sm font-bold text-white">#{manga.ranking}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1C2230] flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">Popularidad</p>
                      <p className="text-sm font-bold text-white">#{manga.popularity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1C2230] flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">Miembros</p>
                      <p className="text-sm font-bold text-white">{formatNumber(manga.members || 0)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Staff */}
            <div className="detail-panel p-4">
              <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Staff</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {manga.authors.map((author, i) => (
                  <div key={author}>
                    <p className="text-[11px] text-[#A1A1AA]">{i === 0 ? 'Autor' : 'Arte'}</p>
                    <p className="text-sm text-white">{author}</p>
                  </div>
                ))}
                <div>
                  <p className="text-[11px] text-[#A1A1AA]">Serialización</p>
                  <p className="text-sm text-white">{manga.serialization}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#A1A1AA]">Inicio</p>
                  <p className="text-sm text-white">{manga.startDate?.split('-')[0]}</p>
                </div>
              </div>
            </div>

            {/* Dropdown + Botón Add to List */}
            <div className="detail-panel p-4">
              {/* Dropdown de estado */}
              <div className="relative mb-3">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#1C2230] border border-[rgba(255,255,255,0.06)] text-sm text-white hover:border-[rgba(255,255,255,0.12)] transition-colors"
                  id="status-dropdown"
                >
                  <span>{listStatus}</span>
                  <ChevronDown className={`w-4 h-4 text-[#A1A1AA] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-[#1C2230] border border-[rgba(255,255,255,0.08)] shadow-xl z-20 overflow-hidden">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setListStatus(opt); setIsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          opt === listStatus
                            ? 'bg-[#FF4D8D]/10 text-[#FF4D8D]'
                            : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botones CTA */}
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg btn-accent text-sm"
                  id="add-to-list-btn"
                >
                  <Plus className="w-4 h-4" />
                  Agregar a Lista
                </button>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-11 h-11 flex items-center justify-center rounded-lg border transition-all ${
                    isFavorited
                      ? 'bg-[#FF4D8D]/10 border-[#FF4D8D]/30 text-[#FF4D8D]'
                      : 'bg-[#1C2230] border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-[#FF4D8D] hover:border-[#FF4D8D]/30'
                  }`}
                  id="favorite-btn"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Géneros */}
            <div className="flex flex-wrap gap-1.5">
              {manga.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#151A22] border border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
                >
                  {genre}
                </span>
              ))}
              {manga.demographics.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#FF4D8D]/10 border border-[#FF4D8D]/20 text-[#FF4D8D] cursor-pointer"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* ============================== */}
          {/* COLUMNA DERECHA — PANELES      */}
          {/* ============================== */}
          <div className="space-y-4">
            {/* SINOPSIS */}
            <div className="detail-panel p-5">
              <h2 className="text-sm font-bold text-white mb-3">Sinopsis</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {manga.synopsis}
              </p>
            </div>


            
{/* SOCIAL + CONTENIDO INCLUIDO */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Social Sharing */}
  <div className="detail-panel p-4 overflow-hidden">
    <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-4 text-center">
      Social
    </h3>

    <div className="grid grid-cols-4 gap-2 place-items-center mb-4">
      {[
        { name: 'X', color: '#000000', bg: '#ffffff' },
        { name: 'Reddit', color: '#ffffff', bg: '#FF4500' },
        { name: 'Tumblr', color: '#ffffff', bg: '#35465C' },
        { name: 'FB', color: '#ffffff', bg: '#1877F2' },
      ].map((social) => (
        <button
          key={social.name}
          className="flex items-center justify-center"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-105"
            style={{
              background: social.bg,
              color: social.color,
            }}
          >
            {social.name === 'X' ? '𝕏' : social.name[0]}
          </div>
        </button>
      ))}
    </div>

    <p className="text-[10px] text-[#A1A1AA] text-center">
      Compartir
    </p>
  </div>







              {/* Contenido Incluido */}
              <div className="detail-panel p-4">
                <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Contenido Incluido</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A1A1AA]">Volúmenes</span>
                    <span className="text-white font-medium">{manga.volumes || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A1A1AA]">Capítulos</span>
                    <span className="text-white font-medium">{manga.chapters}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#A1A1AA]">Tipo</span>
                    <span className="text-white font-medium">{manga.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR NAV — Tabs en la columna derecha */}
            <div className="detail-panel p-2">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                {sidebarNav.map((item) => (
                  <button
                    key={item.label}
                    className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECCIONES INFERIORES ===== */}
        <div className="mt-8 space-y-6">

          {/* PERSONAJES */}
          <section id="characters-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Personajes</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollChars('left')} className="p-1.5 rounded-lg bg-[#151A22] border border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollChars('right')} className="p-1.5 rounded-lg bg-[#151A22] border border-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div ref={charScrollRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {characters.map((char) => (
                <div key={char.id} className="flex-shrink-0 w-[130px] group cursor-pointer">
                  <div className="detail-panel overflow-hidden">
                    <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#1C2230] to-[#151A22]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white/10">{char.name[0]}</span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-white truncate group-hover:text-[#FF4D8D] transition-colors">{char.name}</p>
                      <p className={`text-[10px] mt-0.5 ${char.role === 'Main' ? 'text-[#FF4D8D]' : 'text-[#A1A1AA]'}`}>
                        {char.role === 'Main' ? 'Principal' : 'Secundario'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MANGA RELACIONADO */}
          <section id="related-section">
            <h2 className="text-lg font-bold text-white mb-4">Manga Relacionado</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {relatedManga.map((m) => (
                <Link href={`/manga/${m.id}`} key={m.id} className="group">
                  <div className="detail-panel overflow-hidden">
                    <div className="relative aspect-[2/3] w-full">
                      <Image
                        src={m.coverImage}
                        alt={m.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                        {m.score}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h3 className="text-xs font-semibold text-white truncate group-hover:text-[#FF4D8D] transition-colors">{m.title}</h3>
                      <p className="text-[10px] text-[#A1A1AA] mt-0.5">{m.chapters} capítulos</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* RESEÑAS */}
          <section id="reviews-section">
            <h2 className="text-lg font-bold text-white mb-4">Reseñas</h2>
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="detail-panel p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4D8D] to-[#FF8C42] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {review.username[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-white">{review.username}</p>
                          <p className="text-[11px] text-[#A1A1AA]">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF4D8D]/10 text-[#FF4D8D] text-sm font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {review.score}
                        </div>
                      </div>

                      {/* Contenido */}
                      <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
                        {review.content}
                      </p>

                      {/* Tags + Helpful */}
                      <div className="flex items-center justify-between mt-3">
                        {review.tags && (
                          <div className="flex gap-1.5">
                            {review.tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-[#A1A1AA]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{review.helpful}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
