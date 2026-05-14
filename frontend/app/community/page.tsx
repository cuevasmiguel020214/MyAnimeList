import type { Metadata } from 'next';
import CommunityClient from '@/components/community/CommunityClient';

export const metadata: Metadata = {
  title: 'Comunidad y Reseñas — AniVault',
  description: 'Únete a la comunidad de AniVault. Comparte reseñas, descubre discusiones y conecta con otros fans del anime y manga.',
};

export default function CommunityPage() {
  return <CommunityClient />;
}
