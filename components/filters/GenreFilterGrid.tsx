'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GenreFilter } from '@/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { formatNumber } from '@/utils';

interface GenreFilterGridProps {
  filters: GenreFilter[];
  onFilterSelect?: (id: string) => void;
}

/**
 * GenreFilterGrid — Mini-tarjetas premium de filtro por género.
 * Cada filtro tiene un ícono, conteo y borde animado con glow al hover/seleccionar.
 */
export default function GenreFilterGrid({ filters, onFilterSelect }: GenreFilterGridProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    onFilterSelect?.(id);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      id="genre-filter-grid"
    >
      {filters.map((filter) => {
        const isActive = selected.includes(filter.id);
        return (
          <motion.button
            key={filter.id}
            variants={fadeInUp}
            onClick={() => toggle(filter.id)}
            className={`relative group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              isActive
                ? 'glass ring-1 ring-blue-500/50 shadow-lg shadow-blue-500/10'
                : 'glass-card hover:ring-1 hover:ring-white/[0.12]'
            }`}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            id={`filter-${filter.id}`}
          >
            {/* Glow al activar */}
            {isActive && (
              <div className="absolute -inset-0.5 rounded-xl bg-blue-500/10 blur-lg -z-10" />
            )}

            {/* Ícono */}
            <span className="text-2xl">{filter.icon}</span>

            {/* Nombre */}
            <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-blue-400' : 'text-white'}`}>
              {filter.name}
            </span>

            {/* Conteo */}
            <span className="text-xs text-slate-500">
              {formatNumber(filter.count)} títulos
            </span>

            {/* Borde animado con glow */}
            <div
              className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`}
              style={{
                boxShadow: `inset 0 0 0 1px ${filter.color}40`,
              }}
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}
