import type { Metadata } from 'next';
import MangaSearchClient from '@/components/manga/MangaSearchClient';
import { getAllManga } from '@/lib/data';
import { mangaGenreFilters } from '@/data/manga';

/**
 * Página de Búsqueda de Manga — Componente de Servidor.
 *
 * Obtiene datos en el servidor (mock por ahora) y los pasa al
 * componente cliente MangaSearchClient para interactividad.
 */

export const metadata: Metadata = {
  title: 'Búsqueda de Manga — AniVault',
  description:
    'Busca y descubre manga, manhwa y novelas ligeras en todos los géneros. Filtra por acción, romance, terror y más.',
};

export default function MangaSearchPage() {
  const mangaList = getAllManga();

  return (
    <MangaSearchClient
      mangaList={mangaList}
      genreFilters={mangaGenreFilters}
    />
  );
}
