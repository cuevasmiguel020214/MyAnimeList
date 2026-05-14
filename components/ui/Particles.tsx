'use client';

import { useMemo } from 'react';

interface ParticlesProps {
  count?: number;
}

/**
 * Particles — Client-only floating particle effect.
 *
 * Why this is a client component:
 * `Math.random()` produces different values on server vs client, causing
 * hydration mismatches. By isolating particles into a client component
 * with `useMemo`, positions are computed once on the client only,
 * eliminating the SSR diff warnings.
 */
export default function Particles({ count = 20 }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        bottom: `-${(i * 7 + 3) % 20}px`,
        duration: `${8 + ((i * 3 + 5) % 12)}s`,
        delay: `${(i * 2 + 1) % 10}s`,
        size: `${1 + ((i * 5 + 2) % 3)}px`,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
