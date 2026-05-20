'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, ExternalLink } from 'lucide-react';
import { Anime } from '@/types';
import { fadeInUp } from '@/lib/animations';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

/**
 * AnimeCard — Tarjeta vertical tipo póster con revelado al hover.
 *
 * Componente cliente porque:
 * - Usa `useState` para estado de hover
 * - Usa `motion` para animaciones escalonadas
 * - Tiene manejadores `onClick`
 */
export default function AnimeCard({ anime, index: _index = 0 }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[220px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`anime-card-${anime.id}`}
    >
       <Link href={`/manga/${anime.id}`}>
        {/* Imagen de portada — next/image con fill */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:ring-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/10">
          <Image
            src={anime.coverImage}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge de puntuación */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-bold z-10">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white">{anime.score}</span>
          </div>

          {/* Overlay al hover */}
          <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={(e) => { e.preventDefault(); }}
                className="p-2 rounded-lg bg-blue-500/80 hover:bg-blue-500 text-white transition-colors"
                title="Agregar a Lista"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); }}
                className="p-2 rounded-lg bg-white/10 hover:bg-pink-500/80 text-white transition-colors"
                title="Favorito"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Detalles"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Badge de tipo */}
          {anime.type && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-blue-500/80 text-[10px] font-bold text-white uppercase z-10">
              {anime.type}
            </div>
          )}
        </div>

        {/* Pie de tarjeta */}
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {anime.genres.slice(0, 2).map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
          <p className="text-xs text-slate-500">{anime.episodes} Episodios</p>
        </div>
      </Link>
    </motion.div>
  );
}
