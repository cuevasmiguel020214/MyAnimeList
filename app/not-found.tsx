import Link from 'next/link';
import { Home, Search } from 'lucide-react';

/**
 * Página No Encontrada — Componente de Servidor.
 * Se muestra cuando se llama a notFound() o cuando una ruta no existe.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4" id="not-found-page">
      <div className="text-center space-y-6 max-w-md">
        {/* Número 404 */}
        <div className="relative">
          <span className="text-[120px] sm:text-[160px] font-black text-white/[0.03] leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white">Página No Encontrada</h1>
        <p className="text-slate-400 leading-relaxed">
          El anime o manga que buscas no existe en nuestra bóveda.
          Es posible que haya sido eliminado o que la URL sea incorrecta.
        </p>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Ir al Inicio
          </Link>
          <Link
            href="/manga"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-white font-semibold text-sm hover:bg-white/[0.12] transition-all"
          >
            <Search className="w-4 h-4" />
            Buscar Manga
          </Link>
        </div>
      </div>
    </div>
  );
}
