import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MangaDetailClient from '@/components/manga/MangaDetailClient';
import { getMangaById, getMangaCharacters, getMangaReviews, getRelatedManga, getAllManga } from '@/lib/data';

/**
 * Página de Detalle de Manga — Componente de Servidor con ruta dinámica.
 *
 * - Usa segmentos dinámicos del App Router de Next.js: /manga/[id]
 * - `params` es una Promise (convención de Next.js 16) — debe ser awaited
 * - Retorna `notFound()` para IDs inválidos
 * - Genera metadata dinámica para SEO por manga
 * - `generateStaticParams` pre-renderiza todas las páginas conocidas al build
 */

/** Genera rutas estáticas para todos los manga — habilita SSG en build */
export function generateStaticParams() {
  const allManga = getAllManga();
  return allManga.map((manga) => ({
    id: String(manga.id),
  }));
}

/** Metadata dinámica por manga para SEO */
export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await props.params;
  const manga = getMangaById(Number(id));

  if (!manga) {
    return { title: 'Manga No Encontrado — AniVault' };
  }

  return {
    title: `${manga.title} — AniVault`,
    description: manga.synopsis,
    openGraph: {
      title: manga.title,
      description: manga.synopsis,
      images: [manga.coverImage],
    },
  };
}

export default async function MangaDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const manga = getMangaById(Number(id));

  if (!manga) {
    notFound();
  }

  // Obtener datos relacionados en el servidor
  const characters = getMangaCharacters(manga.id);
  const reviews = getMangaReviews(manga.id);
  const relatedManga = getRelatedManga(manga.id);

  return (
    <MangaDetailClient
      manga={manga}
      characters={characters}
      reviews={reviews}
      relatedManga={relatedManga}
    />
  );
}
