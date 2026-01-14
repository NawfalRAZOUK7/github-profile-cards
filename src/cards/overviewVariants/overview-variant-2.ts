import type { OverviewRenderContext } from '../types.js';
import { escapeText, formatNumber } from '../types.js';

/**
 * Variant 2 – Clean Light Dashboard
 * Top bar + stat pills, 860x200
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

const SVG_TEMPLATE = `<!-- CONCEPT 2 — Clean Light Dashboard (top bar + stat pills) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <clipPath id="avatarClip2">
      <circle cx="796" cy="56" r="24"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="#FFFFFF" stroke="#E6EAF0"/>

  <!-- Header -->
  <text x="28" y="60" font-family="ui-sans-serif, system-ui" font-size="18" font-weight="700" fill="#0B1220">{{NAME}}</text>
  <text x="28" y="82" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="#52606D">@{{USERNAME}}</text>

  <circle cx="796" cy="56" r="26" fill="#F6F8FB" stroke="#E6EAF0"/>
  <image href="{{AVATAR_HREF}}" x="772" y="32" width="48" height="48" clip-path="url(#avatarClip2)"/>

  <line x1="28" y1="104" x2="832" y2="104" stroke="#EEF2F7"/>

  <!-- Stat pills -->
  <!-- Pill geometry -->
  <!-- 4 pills: each 188w, 56h, gap 16. Start x=28 -->
  <g font-family="ui-sans-serif, system-ui">
    <rect x="28" y="124" width="188" height="56" rx="12" fill="#F6F8FB" stroke="#E6EAF0"/>
    <text x="44" y="146" font-size="11" font-weight="600" fill="#52606D">FOLLOWERS</text>
    <text x="44" y="170" font-size="16" font-weight="700" fill="#0B1220">{{FOLLOWERS}}</text>

    <rect x="232" y="124" width="188" height="56" rx="12" fill="#F6F8FB" stroke="#E6EAF0"/>
    <text x="248" y="146" font-size="11" font-weight="600" fill="#52606D">PUBLIC REPOS</text>
    <text x="248" y="170" font-size="16" font-weight="700" fill="#0B1220">{{REPOS}}</text>

    <rect x="436" y="124" width="188" height="56" rx="12" fill="#F6F8FB" stroke="#E6EAF0"/>
    <text x="452" y="146" font-size="11" font-weight="600" fill="#52606D">TOTAL STARS</text>
    <text x="452" y="170" font-size="16" font-weight="700" fill="#0B1220">{{STARS}}</text>

    <rect x="640" y="124" width="192" height="56" rx="12" fill="#FFFFFF" stroke="#E6EAF0"/>
    <rect x="640" y="124" width="4" height="56" rx="2" fill="#2563EB"/>
    <text x="656" y="146" font-size="11" font-weight="600" fill="#52606D">OVERVIEW</text>
    <text x="656" y="170" font-size="12" font-weight="600" fill="#0B1220">Simple, clean layout</text>
  </g>
</svg>
`.trim();

export function renderOverviewVariant2(ctx: OverviewRenderContext): string {
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
