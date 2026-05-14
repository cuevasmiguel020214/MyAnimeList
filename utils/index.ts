// ============================================
// Utility functions
// ============================================

/** Format large numbers into compact form (e.g. 1.2M, 45K) */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

/** Score color based on rating value */
export function getScoreColor(score: number): string {
  if (score >= 9) return '#22C55E';
  if (score >= 8) return '#3B82F6';
  if (score >= 7) return '#F59E0B';
  if (score >= 6) return '#F97316';
  return '#EF4444';
}

/** Generate a gradient string from score */
export function getScoreGradient(score: number): string {
  if (score >= 9) return 'from-emerald-400 to-green-500';
  if (score >= 8) return 'from-blue-400 to-blue-600';
  if (score >= 7) return 'from-yellow-400 to-amber-500';
  return 'from-orange-400 to-red-500';
}

/** Truncate text to a max length with ellipsis */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/** Get relative time string */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/** cn — basic class name merger */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
