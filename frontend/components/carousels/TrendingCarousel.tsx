'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Anime } from '@/types';
import AnimeCard from '@/components/cards/AnimeCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface TrendingCarouselProps {
  title: string;
  subtitle: string;
  items: Anime[];
  icon?: React.ReactNode;
}

/**
 * TrendingCarousel — Scroll horizontal estilo Netflix con flechas de navegación.
 * Usa scroll nativo para dispositivos táctiles, botones de flechas para escritorio.
 */
export default function TrendingCarousel({ title, subtitle, items, icon }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 600;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-12" id="trending-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              {icon || <TrendingUp className="w-5 h-5 text-blue-400" />}
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
            </div>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>

          {/* Flechas de navegación */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl glass hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl glass hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carrusel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          ref={scrollRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {items.map((anime, i) => (
            <AnimeCard key={anime.id} anime={anime} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
