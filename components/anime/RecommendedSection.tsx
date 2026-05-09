'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Anime } from '@/types';
import AnimeCard from '@/components/cards/AnimeCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface RecommendedSectionProps {
  items: Anime[];
}

/**
 * RecommendedSection — Grid responsivo moderno de anime recomendado.
 */
export default function RecommendedSection({ items }: RecommendedSectionProps) {
  return (
    <section className="py-12" id="recommended-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Recomendados Para Ti</h2>
          </div>
          <p className="text-sm text-slate-400">Basado en tu historial y preferencias</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5"
        >
          {items.map((anime, i) => (
            <AnimeCard key={anime.id} anime={anime} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
