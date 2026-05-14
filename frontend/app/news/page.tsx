import type { Metadata } from 'next';
import NewsClient from '@/components/news/NewsClient';

export const metadata: Metadata = {
  title: 'Noticias — AniVault',
  description: 'Últimas noticias, anuncios y novedades del mundo del anime y manga.',
};

export default function NewsPage() {
  return <NewsClient />;
}
