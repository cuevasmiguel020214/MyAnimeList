/**
 * Root Loading — Shown during route transitions from / to any page.
 * Uses CSS-only skeleton animation (no JS) for instant display.
 * This is a Server Component by convention.
 */
export default function Loading() {
  return (
    <div className="min-h-screen pt-20" id="root-loading">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <div className="skeleton absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-40 space-y-6">
          <div className="skeleton h-6 w-48 rounded-full" />
          <div className="skeleton h-14 w-[420px] max-w-full rounded-xl" />
          <div className="skeleton h-5 w-64 rounded-lg" />
          <div className="skeleton h-20 w-[500px] max-w-full rounded-xl" />
          <div className="flex gap-3">
            <div className="skeleton h-12 w-36 rounded-xl" />
            <div className="skeleton h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Trending Skeleton */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="skeleton h-8 w-52 rounded-lg mb-2" />
        <div className="skeleton h-4 w-72 rounded-lg mb-8" />
        <div className="flex gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[220px] space-y-3">
              <div className="skeleton aspect-[2/3] rounded-xl" />
              <div className="skeleton h-4 w-32 rounded-lg" />
              <div className="skeleton h-3 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
