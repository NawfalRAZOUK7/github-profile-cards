export type OverviewVariant =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

export interface OverviewRenderContext {
  stats: {
    name: string;
    login: string;
    avatarUrl: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
  };
  avatarHref: string;
}

export function escapeText(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}
