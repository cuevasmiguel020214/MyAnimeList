import type { Metadata } from 'next';
import RankingsClient from '@/components/rankings/RankingsClient';

export const metadata: Metadata = {
  title: 'Rankings — AniVault',
  description: 'Descubre los animes y mangas mejor calificados, más populares y en tendencia en AniVault.',
};

export default function RankingsPage() {
  return <RankingsClient />;
}
