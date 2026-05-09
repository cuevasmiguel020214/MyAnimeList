'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import { ContinueWatching } from '@/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface ContinueWatchingSectionProps {
  items: ContinueWatching[];
}

/**
 * ContinueWatchingSection — Tarjetas anchas con barras de progreso.
 * Componente cliente: usa Framer Motion para animación escalonada.
 */
export default function ContinueWatchingSection({ items }: ContinueWatchingSectionProps) {
  return (
    <section className="py-12" id="continue-watching">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Play className="w-5 h-5 text-green-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Seguir Viendo</h2>
          </div>
          <p className="text-sm text-slate-400">Continúa donde lo dejaste</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group glass-card rounded-xl overflow-hidden hover:ring-1 hover:ring-blue-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Portada — next/image */}
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={item.anime.coverImage}
                  alt={item.anime.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />

                {/* Botón de reproducción */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge de episodio */}
                <div className="absolute bottom-2 left-3 text-xs font-semibold text-white z-10">
                  EP {item.currentEpisode} / {item.anime.episodes}
                </div>
              </div>

              {/* Información */}
              <div className="p-3 space-y-2">
                <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                  {item.anime.title}
                </h4>
                <div className="space-y-1">
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.timeRemaining}</span>
                    </div>
                    <span>{item.lastWatched}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
