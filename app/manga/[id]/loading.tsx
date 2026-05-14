/**
 * Loading del Detalle de Manga — Skeleton con layout de 3 columnas.
 * Coincide con el diseño modular de paneles oscuros.
 */
export default function MangaDetailLoading() {
  return (
    <div className="detail-bg min-h-screen pt-20 pb-16" id="manga-detail-loading">
      {/* Banner sutil */}
      <div className="h-48 bg-[#0B0F19]" />

      {/* Contenido */}
      <div className="relative -mt-32 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_380px] gap-5">
          {/* Portada */}
          <div className="flex justify-center lg:justify-start">
            <div className="skeleton w-[240px] aspect-[2/3] rounded-xl" />
          </div>

          {/* Centro */}
          <div className="space-y-4">
            <div className="detail-panel p-5 space-y-4">
              <div className="skeleton h-7 w-64 rounded-lg" />
              <div className="skeleton h-4 w-40 rounded" />
              <div className="skeleton h-3 w-56 rounded" />
              <div className="flex items-center gap-6 mt-4">
                <div className="skeleton w-[120px] h-[120px] rounded-full" />
                <div className="space-y-3 flex-1">
                  <div className="skeleton h-10 w-32 rounded-lg" />
                  <div className="skeleton h-10 w-32 rounded-lg" />
                  <div className="skeleton h-10 w-32 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="detail-panel p-4 space-y-2">
              <div className="skeleton h-3 w-16 rounded" />
              <div className="grid grid-cols-2 gap-3">
                <div className="skeleton h-10 rounded-lg" />
                <div className="skeleton h-10 rounded-lg" />
                <div className="skeleton h-10 rounded-lg" />
                <div className="skeleton h-10 rounded-lg" />
              </div>
            </div>
            <div className="skeleton h-11 w-full rounded-lg" />
            <div className="flex gap-2">
              <div className="skeleton h-10 flex-1 rounded-lg" />
              <div className="skeleton h-10 w-10 rounded-lg" />
            </div>
          </div>

          {/* Derecha */}
          <div className="space-y-4">
            <div className="detail-panel p-5 space-y-3">
              <div className="skeleton h-4 w-20 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-3/4 rounded" />
              <div className="skeleton h-3 w-full rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="detail-panel p-4 space-y-2">
                <div className="skeleton h-3 w-12 rounded" />
                <div className="flex gap-2">
                  <div className="skeleton w-9 h-9 rounded-lg" />
                  <div className="skeleton w-9 h-9 rounded-lg" />
                  <div className="skeleton w-9 h-9 rounded-lg" />
                  <div className="skeleton w-9 h-9 rounded-lg" />
                </div>
              </div>
              <div className="detail-panel p-4 space-y-2">
                <div className="skeleton h-3 w-28 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
