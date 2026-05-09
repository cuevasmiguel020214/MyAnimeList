// ============================================
// Core Types for AniVault Platform
// ============================================

export interface Anime {
  id: number;
  title: string;
  titleJapanese?: string;
  synopsis: string;
  score: number;
  episodes: number;
  status: 'Airing' | 'Finished' | 'Upcoming';
  type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  genres: string[];
  year: number;
  season?: 'Winter' | 'Spring' | 'Summer' | 'Fall';
  studio: string;
  coverImage: string;
  bannerImage?: string;
  ranking?: number;
  popularity?: number;
  favorites?: number;
  members?: number;
  duration?: string;
  rating?: string;
  source?: string;
}

export interface Manga {
  id: number;
  title: string;
  titleJapanese?: string;
  synopsis: string;
  score: number;
  chapters: number;
  volumes?: number;
  status: 'Publishing' | 'Finished' | 'Hiatus';
  type: 'Manga' | 'Manhwa' | 'Manhua' | 'Light Novel' | 'One-shot';
  genres: string[];
  demographics: string[];
  authors: string[];
  coverImage: string;
  bannerImage?: string;
  ranking?: number;
  popularity?: number;
  favorites?: number;
  members?: number;
  serialization?: string;
  startDate?: string;
  endDate?: string;
}

export interface Character {
  id: number;
  name: string;
  nameJapanese?: string;
  image: string;
  role: 'Main' | 'Supporting' | 'Background';
  favorites?: number;
  about?: string;
  voiceActor?: string;
  voiceActorImage?: string;
}

export interface Review {
  id: number;
  username: string;
  avatar: string;
  score: number;
  content: string;
  date: string;
  helpful: number;
  tags?: string[];
}

export interface ContinueWatching {
  id: number;
  anime: Anime;
  currentEpisode: number;
  progress: number; // 0-100
  timeRemaining: string;
  lastWatched: string;
}

export interface GenreFilter {
  id: string;
  name: string;
  icon: string;
  count: number;
  color?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
  joinDate: string;
  animeWatched: number;
  mangaRead: number;
  favorites: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface CarouselItem {
  id: number;
  title: string;
  image: string;
  score?: number;
  genres?: string[];
  episodes?: number;
  type?: string;
}
