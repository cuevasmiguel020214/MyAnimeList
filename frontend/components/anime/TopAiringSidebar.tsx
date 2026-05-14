'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Crown } from 'lucide-react';
import { Anime } from '@/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { getScoreColor } from '@/utils';

interface TopAiringSidebarProps {
  items: Anime[];
}

/**
 * TopAiringSidebar — Lista clasificada con glassmorphism para sidebar de escritorio.
 * Componente cliente: usa Framer Motion para animación escalonada de entrada.
 */
export default function TopAiringSidebar({ items }: TopAiringSidebarProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-5"
      id="top-airing-sidebar"
    >
      <div className="flex items-center gap-2 mb-5">
        <Crown className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-white">Top en Emisión</h3>
      </div>

      <div className="space-y-3">
        {items.map((anime, i) => (
          <motion.div
            key={anime.id}
            variants={fadeInUp}
            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            {/* Ranking */}
            <span
              className={`text-2xl font-black w-8 text-center ${
                i === 0
                  ? 'text-yellow-400'
                  : i === 1
                    ? 'text-slate-300'
                    : i === 2
                      ? 'text-amber-600'
                      : 'text-slate-600'
              }`}
            >
              {i + 1}
            </span>

            {/* Mini portada — next/image */}
            <div className="relative w-11 h-14 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/[0.06]">
              <Image
                src={anime.coverImage}
                alt={anime.title}
                fill
                sizes="44px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Información */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {anime.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-bold" style={{ color: getScoreColor(anime.score) }}>
                    {anime.score}
                  </span>
                </div>
                <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(anime.score / 10) * 100}%`,
                      background: `linear-gradient(90deg, ${getScoreColor(anime.score)}, ${getScoreColor(anime.score)}aa)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
