'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, BookOpen, User } from 'lucide-react';
import { Manga } from '@/types';
import { fadeInUp } from '@/lib/animations';
import { formatNumber } from '@/utils';

interface MangaCardProps {
  manga: Manga;
}

/**
 * MangaCard — Tarjeta tipo póster rica para resultados de búsqueda de manga.
 * Componente cliente: usa Framer Motion para animaciones escalonadas.
 */
export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative"
      id={`manga-card-${manga.id}`}
    >
      <Link href={`/manga/${manga.id}`}>
        {/* Imagen de portada — next/image con fill */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:ring-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/10">
          <Image
            src={manga.coverImage}
            alt={manga.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge de puntuación */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm z-10">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-white">{manga.score}</span>
          </div>

          {/* Badge de demografía */}
          {manga.demographics?.[0] && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-pink-500/80 backdrop-blur-sm text-[11px] font-bold text-white z-10">
              {manga.demographics[0]}
            </div>
          )}

          {/* Overlay al hover */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-xs text-slate-300 line-clamp-3">{manga.synopsis || ''}</p>
          </div>
        </div>

        {/* Pie de tarjeta */}
        <div className="mt-3 space-y-1.5">
          <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
            {manga.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="w-3 h-3" />
            <span className="truncate">{manga.authors?.[0] || 'Desconocido'}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{manga.chapters} cap.</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{formatNumber(manga.favorites || 0)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
