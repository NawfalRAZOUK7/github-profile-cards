import type { OverviewRenderContext } from '../types.js';
import { escapeText, formatNumber } from '../types.js';

/**
 * Variant 8 – Summary-Cards Modular Overview
 * Light + 3 tiles, 860x200
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

const SVG_TEMPLATE = `<!-- POPULAR-FIRST 8 — Summary-Cards Modular Overview (light + 3 tiles) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <clipPath id="pf3_avatarClip">
      <circle cx="38" cy="34" r="18"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="#FFFFFF" stroke="#E6EAF0"/>

  <!-- Header strip -->
  <rect x="1" y="1" width="858" height="56" rx="16" fill="#FFFFFF"/>
  <line x1="18" y1="56" x2="842" y2="56" stroke="#EEF2F7"/>

  <!-- Avatar + identity -->
  <circle cx="38" cy="34" r="20" fill="#F6F8FB" stroke="#E6EAF0"/>
  <image href="{{AVATAR_HREF}}" x="20" y="16" width="36" height="36" clip-path="url(#pf3_avatarClip)" preserveAspectRatio="xMidYMid slice"/>

  <text x="68" y="36" font-family="ui-sans-serif, system-ui" font-size="16" font-weight="700" fill="#0B1220">{{NAME}}</text>
  <text x="842" y="36" text-anchor="end" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" fill="#52606D">@{{USERNAME}}</text>

  <!-- Tiles row -->
  <!-- Tile widths: 265, 265, 266 (gap 14, padding 18) -->
  <g font-family="ui-sans-serif, system-ui">
    <!-- Tile 1 -->
    <rect x="18" y="72" width="265" height="108" rx="12" fill="#F6F8FB" stroke="#E6EAF0"/>
    <text x="34" y="98" font-size="11" font-weight="600" fill="#52606D">FOLLOWERS</text>
    <text x="34" y="150" font-size="22" font-weight="800" fill="#0B1220">{{FOLLOWERS}}</text>
    <rect x="34" y="160" width="80" height="4" rx="2" fill="#2563EB" opacity="0.9"/>

    <!-- Tile 2 -->
    <rect x="297" y="72" width="265" height="108" rx="12" fill="#F6F8FB" stroke="#E6EAF0"/>
    <text x="313" y="98" font-size="11" font-weight="600" fill="#52606D">PUBLIC REPOS</text>
    <text x="313" y="150" font-size="22" font-weight="800" fill="#0B1220">{{REPOS}}</text>
    <rect x="313" y="160" width="80" height="4" rx="2" fill="#2563EB" opacity="0.9"/>

    <!-- Tile 3 -->
    <rect x="576" y="72" width="266" height="108" rx="12" fill="#FFFFFF" stroke="#E6EAF0"/>
    <rect x="576" y="72" width="4" height="108" rx="2" fill="#2563EB"/>
    <text x="594" y="98" font-size="11" font-weight="600" fill="#52606D">TOTAL STARS</text>
    <text x="594" y="150" font-size="22" font-weight="800" fill="#0B1220">{{STARS}}</text>
    <text x="594" y="170" font-size="10.5" font-weight="600" fill="#52606D">modular card</text>
  </g>
</svg>
`.trim();

export function renderOverviewVariant8(ctx: OverviewRenderContext): string {
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
