// ============================================
// API Helper — Conexión real con el backend
// ============================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch genérico con manejo de errores.
 * Incluye timeout de 8 segundos para evitar cuelgues.
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ============================================
// Interfaces para respuestas de la API
// ============================================

interface ApiResponse<T> {
  status: string;
  data: T;
  total?: number;
}

interface SearchApiResponse {
  status: string;
  query: string;
  data: {
    anime: DbAnime[];
    manga: DbManga[];
    total: number;
  };
}

// Tipos que representan los datos tal como vienen de MySQL
interface DbAnime {
  id: number;
  title: string;
  japanese_title?: string | null;
  english_title?: string | null;
  synopsis?: string | null;
  image?: string | null;
  banner?: string | null;
  score?: number | null;
  rank_position?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites_count?: number | null;
  episodes?: number | null;
  duration?: string | null;
  source?: string | null;
  season?: string | null;
  year?: number | null;
  rating?: string | null;
  status?: string | null;
  type?: string | null;
}

interface DbManga {
  id: number;
  title: string;
  japanese_title?: string | null;
  english_title?: string | null;
  synopsis?: string | null;
  image?: string | null;
  banner?: string | null;
  score?: number | null;
  rank_position?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites_count?: number | null;
  chapters?: number | null;
  volumes?: number | null;
  author?: string | null;
  serialization?: string | null;
  year?: number | null;
  status?: string | null;
  type?: string | null;
  published_from?: string | null;
  published_to?: string | null;
}

// ============================================
// Mapeo de datos DB → Tipos del Frontend
// ============================================

import type { Anime, Manga } from '@/types';

/** Placeholder image when DB has no image */
const PLACEHOLDER_IMAGE = 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg';

/** Mapear anime de la DB al tipo del frontend */
export function mapDbAnime(db: DbAnime): Anime {
  // Mapear status: DB usa 'Ongoing' → frontend usa 'Airing'
  let status: Anime['status'] = 'Finished';
  if (db.status === 'Ongoing') status = 'Airing';
  else if (db.status === 'Upcoming') status = 'Upcoming';
  else if (db.status === 'Finished') status = 'Finished';

  return {
    id: db.id,
    title: db.title || 'Sin título',
    titleJapanese: db.japanese_title || undefined,
    synopsis: db.synopsis || '',
    score: Number(db.score) || 0,
    episodes: db.episodes || 0,
    status,
    type: (db.type as Anime['type']) || 'TV',
    genres: [], // Se llenan por separado si es necesario
    year: db.year || 0,
    season: db.season as Anime['season'],
    studio: '', // No viene de la query simple
    coverImage: db.image || PLACEHOLDER_IMAGE,
    bannerImage: db.banner || undefined,
    ranking: db.rank_position || undefined,
    popularity: db.popularity || undefined,
    favorites: db.favorites_count || undefined,
    members: db.members || undefined,
    duration: db.duration || undefined,
    rating: db.rating || undefined,
    source: db.source || undefined,
  };
}

/** Mapear manga de la DB al tipo del frontend */
export function mapDbManga(db: DbManga): Manga {
  // Mapear status: DB usa 'Ongoing' → frontend usa 'Publishing'
  let status: Manga['status'] = 'Finished';
  if (db.status === 'Ongoing') status = 'Publishing';
  else if (db.status === 'Hiatus') status = 'Hiatus';
  else if (db.status === 'Finished') status = 'Finished';

  return {
    id: db.id,
    title: db.title || 'Sin título',
    titleJapanese: db.japanese_title || undefined,
    synopsis: db.synopsis || '',
    score: Number(db.score) || 0,
    chapters: db.chapters || 0,
    volumes: db.volumes || undefined,
    status,
    type: (db.type as Manga['type']) || 'Manga',
    genres: [], // Se llenan por separado si es necesario
    demographics: [],
    authors: db.author ? [db.author] : ['Desconocido'],
    coverImage: db.image || PLACEHOLDER_IMAGE,
    bannerImage: db.banner || undefined,
    ranking: db.rank_position || undefined,
    popularity: db.popularity || undefined,
    favorites: db.favorites_count || undefined,
    members: db.members || undefined,
    serialization: db.serialization || undefined,
    startDate: db.published_from || undefined,
    endDate: db.published_to || undefined,
  };
}

// ============================================
// Funciones de API — Búsqueda
// ============================================

export interface SearchResults {
  anime: Anime[];
  manga: Manga[];
  total: number;
}

/** Buscar anime y manga simultáneamente */
export async function searchAll(query: string): Promise<SearchResults> {
  const res = await apiFetch<SearchApiResponse>(`/search?q=${encodeURIComponent(query)}`);
  return {
    anime: (res.data.anime || []).map(mapDbAnime),
    manga: (res.data.manga || []).map(mapDbManga),
    total: res.data.total || 0,
  };
}

// ============================================
// Funciones de API — Manga
// ============================================

/** Obtener todos los manga */
export async function fetchAllManga(): Promise<Manga[]> {
  const res = await apiFetch<ApiResponse<DbManga[]>>('/manga');
  return (res.data || []).map(mapDbManga);
}

/** Obtener manga por ID */
export async function fetchMangaById(id: number): Promise<Manga | null> {
  try {
    const res = await apiFetch<ApiResponse<DbManga>>(`/manga/${id}`);
    return res.data ? mapDbManga(res.data) : null;
  } catch {
    return null;
  }
}

/** Filtrar manga con criterios dinámicos */
export async function filterManga(filters: {
  genre?: string;
  status?: string;
  year?: string;
  sort?: string;
  limit?: string;
}): Promise<Manga[]> {
  const params = new URLSearchParams();
  if (filters.genre) params.set('genre', filters.genre);
  if (filters.status) params.set('status', filters.status);
  if (filters.year) params.set('year', filters.year);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.limit) params.set('limit', filters.limit);

  const queryString = params.toString();
  const endpoint = queryString ? `/manga/filter?${queryString}` : '/manga';

  const res = await apiFetch<ApiResponse<DbManga[]>>(endpoint);
  return (res.data || []).map(mapDbManga);
}
