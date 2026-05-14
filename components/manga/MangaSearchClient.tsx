'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
import MangaCard from '@/components/cards/MangaCard';
import GenreFilterGrid from '@/components/filters/GenreFilterGrid';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Manga, GenreFilter } from '@/types';

interface MangaSearchClientProps {
  mangaList: Manga[];
  genreFilters: GenreFilter[];
}

/**
 * MangaSearchClient — Componente cliente que maneja búsqueda + filtrado.
 *
 * Recibe el dataset completo como props desde el Componente de Servidor padre.
 * Maneja: estado de input de búsqueda, toggle de filtros, filtrado en cliente.
 */
export default function MangaSearchClient({ mangaList, genreFilters: _genreFilters }: MangaSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const filteredManga = mangaList.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20" id="manga-search-page">
      {/* Sección de encabezado */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-[#0F172A] to-[#0F172A]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Búsqueda de Manga
              </h1>
            </div>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              Explora miles de títulos de manga en todos los géneros y demografías
            </p>
          </motion.div>

          {/* Barra de búsqueda */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                id="manga-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar manga, manhwa, novelas ligeras..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl text-base text-white placeholder:text-slate-500 glass outline-none focus:ring-1 focus:ring-blue-500/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-slate-300 hover:text-white transition-colors"
                id="toggle-filters-btn"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? 'Ocultar Filtros' : 'Filtros Avanzados'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección de filtros */}
      {showFilters && (
        <section className="py-8">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <GenreFilterGrid />
          </div>
        </section>
      )}

      {/* Sección de resultados */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los Manga'}
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({filteredManga.length} títulos)
              </span>
            </h3>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6"
          >
            {filteredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </motion.div>

          {filteredManga.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-500">No se encontró manga</p>
              <p className="text-sm text-slate-600 mt-2">Intenta ajustar tu búsqueda o filtros</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
