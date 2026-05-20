'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, BookOpen, Loader2 } from 'lucide-react';
import MangaCard from '@/components/cards/MangaCard';
import GenreFilterGrid from '@/components/filters/GenreFilterGrid';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { fetchAllManga, filterManga, searchAll } from '@/utils/api';
import type { Manga } from '@/types';

/**
 * MangaSearchClient — Componente cliente que maneja búsqueda + filtrado.
 *
 * Ahora hace fetch real al backend en vez de usar datos mock.
 * Maneja: estado de input de búsqueda, toggle de filtros, filtrado dinámico.
 */
export default function MangaSearchClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar todos los manga al inicio
  useEffect(() => {
    const loadManga = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllManga();
        setMangaList(data);
      } catch {
        setError('Error al cargar manga. Verifica que el backend esté corriendo.');
      } finally {
        setIsLoading(false);
      }
    };
    loadManga();
  }, []);

  // Búsqueda con debounce
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length === 0) {
      // Restaurar lista completa o aplicar filtros activos
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          if (activeGenres.length > 0) {
            const data = await filterManga({ genre: activeGenres[0] });
            setMangaList(data);
          } else {
            const data = await fetchAllManga();
            setMangaList(data);
          }
        } catch {
          // Mantener datos actuales si falla
        } finally {
          setIsLoading(false);
        }
      }, 200);
      return;
    }

    if (query.trim().length < 2) return;

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchAll(query.trim());
        setMangaList(results.manga);
      } catch {
        setError('Error en la búsqueda');
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [activeGenres]);

  // Manejar cambio de filtros de género
  const handleFiltersChange = useCallback(async (selectedGenres: string[]) => {
    setActiveGenres(selectedGenres);
    setIsLoading(true);
    setError(null);

    try {
      if (selectedGenres.length === 0) {
        const data = await fetchAllManga();
        setMangaList(data);
      } else {
        // Filtrar por el primer género seleccionado
        // Para múltiples géneros, el backend necesitaría soporte adicional
        const data = await filterManga({ genre: selectedGenres[0] });
        setMangaList(data);
      }
    } catch {
      setError('Error al filtrar manga');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
              {isLoading && (
                <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 animate-spin" />
              )}
              <input
                id="manga-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
            <GenreFilterGrid onFiltersChange={handleFiltersChange} />
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
                ({mangaList.length} títulos)
              </span>
            </h3>
          </div>

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 text-base">{error}</p>
              <p className="text-sm text-slate-500 mt-2">
                Asegúrate de que el backend esté corriendo en http://localhost:5000
              </p>
            </div>
          )}

          {/* Loading state */}
          {isLoading && !error && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-slate-400">Cargando manga...</span>
            </div>
          )}

          {/* Results grid */}
          {!isLoading && !error && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6"
            >
              {mangaList.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </motion.div>
          )}

          {!isLoading && !error && mangaList.length === 0 && (
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
