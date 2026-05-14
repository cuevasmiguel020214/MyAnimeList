'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Plus, Star, Calendar, Tv, Clock } from 'lucide-react';
import { fadeInUp, fadeInRight, staggerContainerSlow, floatingAnimation } from '@/lib/animations';
import { Anime } from '@/types';
import Particles from '@/components/ui/Particles';

interface HeroSectionProps {
  anime: Anime;
}

/**
 * HeroSection — Hero cinematográfico a pantalla completa (Componente Cliente).
 *
 * Por qué es cliente: Usa Framer Motion para animaciones de entrada y póster flotante.
 * Los datos se pasan via props desde el Componente de Servidor padre (app/page.tsx).
 */
export default function HeroSection({ anime }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden" id="hero-section">
      {/* Capa de imagen de fondo — CSS background para control de overlay decorativo */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${anime.bannerImage})` }}
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="gradient-bottom absolute inset-0" />
        <div className="absolute inset-0 bg-blue-950/20" />
      </div>

      {/* Partículas — Componente cliente aislado */}
      <Particles count={20} />

      {/* Contenido */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          {/* Izquierda — Contenido de texto */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                #1 Tendencia
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                Destacado
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {anime.title}
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-400 font-light">
              {anime.titleJapanese}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed line-clamp-3"
            >
              {anime.synopsis}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{anime.score}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Tv className="w-4 h-4" />
                <span>{anime.episodes} Episodios</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{anime.year}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{anime.duration}</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-slate-300 border border-white/[0.06] hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-watch-btn"
                className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-current" />
                Ver Ahora
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <button
                id="hero-add-btn"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass text-white font-semibold text-sm hover:bg-white/[0.12] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-5 h-5" />
                Agregar a Lista
              </button>
            </motion.div>
          </motion.div>

          {/* Derecha — Póster flotante con next/image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <motion.div animate={floatingAnimation} className="relative">
              <div className="w-[280px] xl:w-[320px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 ring-1 ring-white/10">
                <Image
                  src={anime.coverImage}
                  alt={anime.title}
                  width={320}
                  height={480}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-3xl -z-10" />
              <div className="absolute -inset-8 rounded-3xl bg-purple-500/5 blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </section>
  );
}
