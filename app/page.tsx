import type { Metadata } from 'next';
import HeroSection from '@/components/anime/HeroSection';
import TrendingCarousel from '@/components/carousels/TrendingCarousel';
import TopAiringSidebar from '@/components/anime/TopAiringSidebar';
import ContinueWatchingSection from '@/components/anime/ContinueWatchingSection';
import RecommendedSection from '@/components/anime/RecommendedSection';
import { featuredAnime, trendingAnime, topAiringAnime, continueWatchingData, recommendedAnime } from '@/data/anime';

/**
 * Página Principal — Componente de Servidor.
 *
 * Página de inicio de AniVault. Como Componente de Servidor:
 * - Importa datos mock directamente (se reemplazará por fetch más adelante)
 * - Pasa datos como props a componentes cliente que necesitan interactividad
 * - Renderiza la estructura estática en el servidor para un FCP rápido
 *
 * Secciones:
 * 1. Hero cinematográfico con anime destacado
 * 2. Tendencias — Carrusel horizontal estilo Netflix
 * 3. Grid de contenido: principal + sidebar Top en Emisión (escritorio)
 * 4. Seguir Viendo — tarjetas con progreso
 * 5. Recomendados Para Ti — grid responsivo
 */

export const metadata: Metadata = {
  title: 'My Anime List — Seguimiento Premium de Anime y Manga',
  description:
    'Descubre anime en tendencia, continúa viendo tus favoritos y explora recomendaciones — todo en una experiencia cinematográfica premium.',
};

export default function HomePage() {
  return (
    <div id="home-page">
      {/* SECCIÓN 1 — Hero Cinematográfico */}
      <HeroSection anime={featuredAnime} />

      {/* SECCIÓN 2 — Carrusel de Tendencias */}
      <TrendingCarousel
        title="Tendencias Ahora"
        subtitle="Los anime más populares de esta semana"
        items={trendingAnime}
      />

      {/* SECCIÓN 3 — Contenido con Sidebar de Top en Emisión */}
      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Contenido Principal */}
            <div>
              <ContinueWatchingSection items={continueWatchingData} />
            </div>

            {/* Sidebar — Solo Escritorio */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TopAiringSidebar items={topAiringAnime} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — Recomendados Para Ti */}
      <RecommendedSection items={recommendedAnime} />
    </div>
  );
}
