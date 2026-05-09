/**
 * Manga Search Loading — Shown while the /manga page loads.
 * Renders skeleton placeholders matching the page layout.
 * Server Component by convention.
 */
export default function MangaLoading() {
  return (
    <div className="min-h-screen pt-20" id="manga-loading">
      {/* Header Skeleton */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-[#0F172A] to-[#0F172A]" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="skeleton h-12 w-72 mx-auto rounded-xl" />
          <div className="skeleton h-5 w-96 max-w-full mx-auto rounded-lg" />
          <div className="skeleton h-14 w-[640px] max-w-full mx-auto rounded-2xl mt-10" />
        </div>
      </section>

      {/* Filter Skeletons */}
      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-6 w-40 rounded-lg mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid Skeleton */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-6 w-48 rounded-lg mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="skeleton aspect-[2/3] rounded-xl" />
                <div className="skeleton h-4 w-28 rounded-lg" />
                <div className="skeleton h-3 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
