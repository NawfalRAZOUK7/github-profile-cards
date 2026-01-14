import type { OverviewRenderContext } from '../types.js';
import { escapeText, formatNumber } from '../types.js';

/**
 * Variant 5 – Minimal Monochrome + Accent Bar
 * Inline stats, 860x200
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

const SVG_TEMPLATE = `<!-- CONCEPT 5 — Minimal Monochrome + Accent Bar (inline stats) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <clipPath id="avatarClip5">
      <circle cx="68" cy="72" r="26"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="#0F172A" stroke="rgba(148,163,184,0.18)"/>
  <!-- Accent bar -->
  <rect x="0" y="0" width="6" height="200" rx="3" fill="#38BDF8"/>
  <!-- Subtle top highlight -->
  <rect x="6" y="10" width="844" height="1" fill="rgba(255,255,255,0.06)"/>

  <!-- Avatar -->
  <circle cx="68" cy="72" r="28" fill="rgba(255,255,255,0.06)"/>
  <image href="{{AVATAR_HREF}}" x="42" y="46" width="52" height="52" clip-path="url(#avatarClip5)"/>

  <!-- Identity -->
  <text x="112" y="68" font-family="ui-sans-serif, system-ui" font-size="17" font-weight="700" fill="#E2E8F0">{{NAME}}</text>
  <text x="112" y="90" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="#94A3B8">@{{USERNAME}}</text>

  <!-- Inline stats row -->
  <!-- Start x=112, y=140 -->
  <g font-family="ui-sans-serif, system-ui">
    <!-- Followers -->
    <text x="112" y="144" font-size="14" font-weight="700" fill="#E2E8F0">{{FOLLOWERS}}</text>
    <text x="152" y="144" font-size="12" font-weight="500" fill="#94A3B8">followers</text>

    <line x1="240" y1="130" x2="240" y2="154" stroke="rgba(148,163,184,0.18)" stroke-width="1"/>

    <!-- Repos -->
    <text x="260" y="144" font-size="14" font-weight="700" fill="#E2E8F0">{{REPOS}}</text>
    <text x="292" y="144" font-size="12" font-weight="500" fill="#94A3B8">repos</text>

    <line x1="360" y1="130" x2="360" y2="154" stroke="rgba(148,163,184,0.18)" stroke-width="1"/>

    <!-- Stars -->
    <text x="380" y="144" font-size="14" font-weight="700" fill="#E2E8F0">{{STARS}}</text>
    <text x="418" y="144" font-size="12" font-weight="500" fill="#94A3B8">stars</text>
  </g>

  <!-- Quiet corner mark -->
  <text x="832" y="176" text-anchor="end" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" fill="rgba(148,163,184,0.55)">
    Overview
  </text>
</svg>
`.trim();

export function renderOverviewVariant5(ctx: OverviewRenderContext): string {
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
