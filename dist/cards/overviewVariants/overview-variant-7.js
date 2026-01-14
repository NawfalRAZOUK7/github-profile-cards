import { escapeText, formatNumber } from '../types.js';
/**
 * Variant 7 – Metrics-Lite Infographic
 * Meters + micro chart, 860x200
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
};
// Minimal escaping for SVG attribute values (e.g., href="...").
function escapeSvgAttr(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}
function applyTemplate(template, replacements) {
    let out = template;
    for (const [token, value] of Object.entries(replacements)) {
        out = out.replaceAll(token, value);
    }
    return out;
}
const SVG_TEMPLATE = `<!-- POPULAR-FIRST 7 — Metrics-Lite Infographic (meters + micro chart) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <linearGradient id="pf2_bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1220"/>
      <stop offset="1" stop-color="#0F1B33"/>
    </linearGradient>
    <linearGradient id="pf2_fill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#38BDF8"/>
      <stop offset="1" stop-color="#A78BFA"/>
    </linearGradient>
    <clipPath id="pf2_avatarClip">
      <circle cx="40" cy="40" r="22"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="url(#pf2_bg)" stroke="rgba(255,255,255,0.10)"/>

  <!-- Header -->
  <circle cx="40" cy="40" r="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <image href="{{AVATAR_HREF}}" x="18" y="18" width="44" height="44" clip-path="url(#pf2_avatarClip)" preserveAspectRatio="xMidYMid slice"/>

  <text x="74" y="38" font-family="ui-sans-serif, system-ui" font-size="18" font-weight="700" fill="#EAF2FF">{{NAME}}</text>
  <text x="74" y="58" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="rgba(234,242,255,0.72)">@{{USERNAME}}</text>

  <!-- Left meters area -->
  <!-- Geometry: label/value row then bar under it -->
  <g font-family="ui-sans-serif, system-ui">
    <!-- Followers -->
    <text x="18" y="92" font-size="11" font-weight="600" letter-spacing="0.7" fill="rgba(234,242,255,0.72)">FOLLOWERS</text>
    <text x="560" y="92" text-anchor="end" font-size="16" font-weight="800" fill="#EAF2FF">{{FOLLOWERS}}</text>
    <rect x="18" y="102" width="542" height="6" rx="3" fill="rgba(255,255,255,0.10)"/>
    <!-- Decorative fill (static for preview; later you can compute width) -->
    <rect x="18" y="102" width="360" height="6" rx="3" fill="url(#pf2_fill)"/>

    <!-- Repos -->
    <text x="18" y="130" font-size="11" font-weight="600" letter-spacing="0.7" fill="rgba(234,242,255,0.72)">PUBLIC REPOS</text>
    <text x="560" y="130" text-anchor="end" font-size="16" font-weight="800" fill="#EAF2FF">{{REPOS}}</text>
    <rect x="18" y="140" width="542" height="6" rx="3" fill="rgba(255,255,255,0.10)"/>
    <rect x="18" y="140" width="240" height="6" rx="3" fill="url(#pf2_fill)"/>

    <!-- Stars -->
    <text x="18" y="168" font-size="11" font-weight="600" letter-spacing="0.7" fill="rgba(234,242,255,0.72)">TOTAL STARS</text>
    <text x="560" y="168" text-anchor="end" font-size="16" font-weight="800" fill="#EAF2FF">{{STARS}}</text>
    <rect x="18" y="178" width="542" height="6" rx="3" fill="rgba(255,255,255,0.10)"/>
    <rect x="18" y="178" width="420" height="6" rx="3" fill="url(#pf2_fill)"/>
  </g>

  <!-- Right micro-chart panel -->
  <rect x="590" y="78" width="252" height="112" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
  <text x="610" y="102" font-family="ui-sans-serif, system-ui" font-size="10.5" font-weight="700" letter-spacing="0.7" fill="rgba(234,242,255,0.72)">SIGNAL</text>

  <!-- Micro bars (decorative) -->
  <g transform="translate(610,170)">
    <!-- 14 bars, width 10, gap 6 -->
    <rect x="0"   y="-22" width="10" height="22" rx="3" fill="rgba(56,189,248,0.55)"/>
    <rect x="16"  y="-34" width="10" height="34" rx="3" fill="rgba(56,189,248,0.65)"/>
    <rect x="32"  y="-18" width="10" height="18" rx="3" fill="rgba(56,189,248,0.45)"/>
    <rect x="48"  y="-46" width="10" height="46" rx="3" fill="rgba(167,139,250,0.60)"/>
    <rect x="64"  y="-28" width="10" height="28" rx="3" fill="rgba(56,189,248,0.55)"/>
    <rect x="80"  y="-40" width="10" height="40" rx="3" fill="rgba(167,139,250,0.55)"/>
    <rect x="96"  y="-20" width="10" height="20" rx="3" fill="rgba(56,189,248,0.45)"/>
    <rect x="112" y="-52" width="10" height="52" rx="3" fill="rgba(167,139,250,0.70)"/>
    <rect x="128" y="-30" width="10" height="30" rx="3" fill="rgba(56,189,248,0.55)"/>
    <rect x="144" y="-42" width="10" height="42" rx="3" fill="rgba(167,139,250,0.60)"/>
    <rect x="160" y="-26" width="10" height="26" rx="3" fill="rgba(56,189,248,0.55)"/>
    <rect x="176" y="-36" width="10" height="36" rx="3" fill="rgba(167,139,250,0.55)"/>
    <rect x="192" y="-18" width="10" height="18" rx="3" fill="rgba(56,189,248,0.45)"/>
    <rect x="208" y="-44" width="10" height="44" rx="3" fill="rgba(167,139,250,0.62)"/>
  </g>
</svg>
`.trim();
export function renderOverviewVariant7(ctx) {
    const { stats, avatarHref } = ctx;
    const replacements = {
        [TOKENS.AVATAR_HREF]: escapeSvgAttr(avatarHref),
        [TOKENS.NAME]: escapeText(stats.name),
        [TOKENS.USERNAME]: escapeText(stats.login),
        [TOKENS.FOLLOWERS]: formatNumber(stats.followers),
        [TOKENS.REPOS]: formatNumber(stats.publicRepos),
        [TOKENS.STARS]: formatNumber(stats.totalStars),
    };
    return applyTemplate(SVG_TEMPLATE, replacements);
}
//# sourceMappingURL=overview-variant-7.js.map