import type { OverviewRenderContext } from '../types.js';
import { escapeText, formatNumber } from '../types.js';

/**
 * Variant 10 – Bento Micro-Grid
 * Identity tile + 2 top tiles + 1 highlight tile, 860x200
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

const SVG_TEMPLATE = `<!-- POPULAR-FIRST 10 — Bento Micro-Grid (identity tile + 2 top tiles + 1 highlight tile) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <linearGradient id="pf5_bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1220"/>
      <stop offset="1" stop-color="#0F1B33"/>
    </linearGradient>
    <linearGradient id="pf5_high" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="rgba(56,189,248,0.22)"/>
      <stop offset="1" stop-color="rgba(167,139,250,0.18)"/>
    </linearGradient>
    <clipPath id="pf5_avatarClip">
      <rect x="33" y="39" width="56" height="56" rx="14"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="url(#pf5_bg)" stroke="rgba(255,255,255,0.10)"/>

  <!-- Layout constants: padding 15, gap 12 -->
  <!-- Left tile -->
  <rect x="15" y="15" width="360" height="170" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>

  <!-- Avatar in left tile -->
  <rect x="33" y="39" width="56" height="56" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <image href="{{AVATAR_HREF}}" x="33" y="39" width="56" height="56" clip-path="url(#pf5_avatarClip)" preserveAspectRatio="xMidYMid slice"/>

  <!-- Identity text -->
  <text x="105" y="62" font-family="ui-sans-serif, system-ui" font-size="19" font-weight="800" fill="#EAF2FF">{{NAME}}</text>
  <text x="105" y="84" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="rgba(234,242,255,0.70)">@{{USERNAME}}</text>
  <rect x="105" y="98" width="140" height="3" rx="2" fill="#38BDF8" opacity="0.9"/>
  <text x="33" y="148" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" fill="rgba(234,242,255,0.70)">
    GitHub Overview
  </text>

  <!-- Right area -->
  <!-- Right x = 15 + 360 + 12 = 387 ; width = 860 - 387 - 15 = 458 -->
  <!-- Top row: 2 tiles -->
  <rect x="387" y="15" width="223" height="78" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <rect x="622" y="15" width="223" height="78" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>

  <!-- Bottom highlight tile -->
  <rect x="387" y="105" width="458" height="80" rx="16" fill="url(#pf5_high)" stroke="rgba(56,189,248,0.30)"/>

  <!-- Stats text -->
  <g font-family="ui-sans-serif, system-ui">
    <!-- Followers (top-left tile) -->
    <text x="405" y="42" font-size="11" font-weight="700" letter-spacing="0.7" fill="rgba(234,242,255,0.70)">FOLLOWERS</text>
    <text x="405" y="74" font-size="20" font-weight="900" fill="#EAF2FF">{{FOLLOWERS}}</text>

    <!-- Repos (top-right tile) -->
    <text x="640" y="42" font-size="11" font-weight="700" letter-spacing="0.7" fill="rgba(234,242,255,0.70)">PUBLIC REPOS</text>
    <text x="640" y="74" font-size="20" font-weight="900" fill="#EAF2FF">{{REPOS}}</text>

    <!-- Stars (bottom tile highlight) -->
    <text x="405" y="132" font-size="11" font-weight="800" letter-spacing="0.7" fill="rgba(234,242,255,0.80)">TOTAL STARS</text>
    <text x="405" y="168" font-size="24" font-weight="900" fill="#EAF2FF">{{STARS}}</text>

    <!-- Decorative sparkline (purely visual) -->
    <polyline points="640,168 660,160 680,164 700,150 720,154 740,140 760,146 780,132 800,140 820,126"
              fill="none" stroke="rgba(234,242,255,0.75)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`.trim();

export function renderOverviewVariant10(ctx: OverviewRenderContext): string {
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
