import { mangaList, berserkCharacters, berserkReviews } from '@/data/manga';
import type { Manga, Character, Review } from '@/types';

/**
 * Funciones de acceso a datos del servidor.
 *
 * Simulan lo que eventualmente serán llamadas a API o consultas a base de datos.
 * Mantenerlas en /lib permite llamarlas desde Componentes de Servidor
 * y eventualmente intercambiarlas por fetch real sin refactorización.
 */

/** Obtener un manga por ID. Retorna undefined si no se encuentra. */
export function getMangaById(id: number): Manga | undefined {
  return mangaList.find((m) => m.id === id);
}

/** Obtener todos los manga */
export function getAllManga(): Manga[] {
  return mangaList;
}

/** Obtener personajes de un manga dado. Por ahora, retorna personajes de Berserk. */
export function getMangaCharacters(_mangaId: number): Character[] {
  return berserkCharacters;
}

/** Obtener reseñas de un manga dado. Por ahora, retorna reseñas de Berserk. */
export function getMangaReviews(_mangaId: number): Review[] {
  return berserkReviews;
}

/** Obtener manga relacionado (excluyendo el actual). */
export function getRelatedManga(currentId: number): Manga[] {
  return mangaList.filter((m) => m.id !== currentId).slice(0, 5);
}
