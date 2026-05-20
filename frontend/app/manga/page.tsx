'use client';

import MangaSearchClient from '@/components/manga/MangaSearchClient';

/**
 * Página de Búsqueda de Manga — Componente Cliente.
 *
 * MangaSearchClient ahora maneja su propio fetch al backend.
 * Ya no se necesitan datos mock del servidor.
 */

export const dynamic = 'force-dynamic';

export default function MangaSearchPage() {
  return <MangaSearchClient />;
}
