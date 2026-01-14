import type { OverviewRenderContext } from '../types.js';
import { escapeText, formatNumber } from '../types.js';

/**
 * Variant 9 – Badge Row Overview
 * README-native pills, 860x200
 *
 * Note: The SVG template below is kept byte-for-byte unchanged.
 */

const TOKENS = {
  AVATAR_HREF: '{{AVATAR_HREF}}',
  NAME: '{{NAME}}',
  USERNAME: '{{USERNAME}}',
  FOLLOWERS: '{{FOLLOWERS}}',
  REPOS: '{{REPOS}}',
  STARS: '{{STARS}}',
} as const;

// Minimal escaping for SVG attribute values (e.g., href="...").
function escapeSvgAttr(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function applyTemplate(template: string, replacements: Record<string, string>): string {
  let out = template;
  for (const [token, value] of Object.entries(replacements)) {
    out = out.replaceAll(token, value);
  }
  return out;
}

const SVG_TEMPLATE = `<!-- POPULAR-FIRST 9 — Badge Row Overview (README-native pills) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <clipPath id="pf4_avatarClip">
      <circle cx="44" cy="44" r="20"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="#0F172A" stroke="rgba(148,163,184,0.18)"/>

  <!-- Identity -->
  <circle cx="44" cy="44" r="22" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <image href="{{AVATAR_HREF}}" x="24" y="24" width="40" height="40" clip-path="url(#pf4_avatarClip)" preserveAspectRatio="xMidYMid slice"/>

  <text x="78" y="42" font-family="ui-sans-serif, system-ui" font-size="17" font-weight="700" fill="#E6EDF3">{{NAME}}</text>
  <text x="78" y="62" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="#94A3B8">@{{USERNAME}}</text>

  <!-- Badge row -->
  <!-- Fixed-width pills for predictable SVG layout -->
  <g font-family="ui-sans-serif, system-ui" font-size="12">
    <!-- Followers pill -->
    <rect x="18" y="90" width="220" height="30" rx="15" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
    <text x="34" y="110" font-weight="600" fill="#9FB0C0">Followers</text>
    <text x="210" y="110" text-anchor="end" font-weight="800" fill="#E6EDF3">{{FOLLOWERS}}</text>

    <!-- Repos pill -->
    <rect x="252" y="90" width="240" height="30" rx="15" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
    <text x="268" y="110" font-weight="600" fill="#9FB0C0">Public repos</text>
    <text x="476" y="110" text-anchor="end" font-weight="800" fill="#E6EDF3">{{REPOS}}</text>

    <!-- Stars pill (accent) -->
    <rect x="506" y="90" width="236" height="30" rx="15" fill="rgba(56,189,248,0.18)" stroke="rgba(56,189,248,0.35)"/>
    <text x="522" y="110" font-weight="700" fill="#CFF1FF">Total stars</text>
    <text x="726" y="110" text-anchor="end" font-weight="900" fill="#E6EDF3">{{STARS}}</text>

    <!-- Small tag -->
    <rect x="756" y="90" width="86" height="30" rx="15" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)"/>
    <text x="799" y="110" text-anchor="middle" font-size="10.5" font-weight="700" letter-spacing="0.8" fill="#94A3B8">BADGES</text>
  </g>

  <!-- Lower subtle line -->
  <line x1="18" y1="146" x2="842" y2="146" stroke="rgba(255,255,255,0.06)"/>
  <text x="18" y="174" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" fill="rgba(148,163,184,0.65)">
    Overview card — badge-row style
  </text>
</svg>
`.trim();

export function renderOverviewVariant9(ctx: OverviewRenderContext): string {
  const { stats, avatarHref } = ctx;

  const replacements = {
    [TOKENS.AVATAR_HREF]: escapeSvgAttr(avatarHref),
    [TOKENS.NAME]: escapeText(stats.name),
    [TOKENS.USERNAME]: escapeText(stats.login),
    [TOKENS.FOLLOWERS]: formatNumber(stats.followers),
    [TOKENS.REPOS]: formatNumber(stats.publicRepos),
    [TOKENS.STARS]: formatNumber(stats.totalStars),
  } satisfies Record<string, string>;

  return applyTemplate(SVG_TEMPLATE, replacements);
}
