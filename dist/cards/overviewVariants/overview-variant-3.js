import { escapeText, formatNumber } from '../types.js';
/**
 * Variant 3 – Glassmorphism Panel
 * Dark base + glass cards, 860x200
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
const SVG_TEMPLATE = `<!-- CONCEPT 3 — Glassmorphism Panel (dark base + glass cards) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050A14"/>
      <stop offset="1" stop-color="#081226"/>
    </linearGradient>
    <radialGradient id="blob3a" cx="0.2" cy="0.2" r="0.5">
      <stop offset="0" stop-color="#A78BFA" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#A78BFA" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob3b" cx="0.85" cy="0.8" r="0.55">
      <stop offset="0" stop-color="#38BDF8" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#38BDF8" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="avatarClip3">
      <circle cx="62" cy="100" r="30"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="18" fill="url(#bg3)" stroke="rgba(255,255,255,0.08)"/>
  <rect x="0" y="0" width="860" height="200" rx="18" fill="url(#blob3a)"/>
  <rect x="0" y="0" width="860" height="200" rx="18" fill="url(#blob3b)"/>

  <!-- Left glass identity panel -->
  <rect x="22" y="24" width="300" height="152" rx="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>

  <!-- Avatar -->
  <circle cx="62" cy="100" r="32" fill="rgba(255,255,255,0.10)"/>
  <image href="{{AVATAR_HREF}}" x="32" y="70" width="60" height="60" clip-path="url(#avatarClip3)"/>

  <!-- Identity -->
  <text x="110" y="92" font-family="ui-sans-serif, system-ui" font-size="19" font-weight="700" fill="#EAF2FF">{{NAME}}</text>
  <text x="110" y="114" font-family="ui-sans-serif, system-ui" font-size="12" font-weight="500" fill="rgba(234,242,255,0.72)">@{{USERNAME}}</text>

  <!-- Accent -->
  <rect x="110" y="128" width="160" height="3" rx="2" fill="#A78BFA" opacity="0.9"/>

  <!-- Right stats glass cards (2x2) -->
  <g font-family="ui-sans-serif, system-ui">
    <!-- card sizes: 244x68, gaps 14 -->
    <rect x="350" y="40" width="244" height="68" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="368" y="66" font-size="10.5" font-weight="600" letter-spacing="0.9" fill="rgba(234,242,255,0.72)">FOLLOWERS</text>
    <text x="368" y="92" font-size="17" font-weight="700" fill="#EAF2FF">{{FOLLOWERS}}</text>

    <rect x="610" y="40" width="228" height="68" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="628" y="66" font-size="10.5" font-weight="600" letter-spacing="0.9" fill="rgba(234,242,255,0.72)">PUBLIC REPOS</text>
    <text x="628" y="92" font-size="17" font-weight="700" fill="#EAF2FF">{{REPOS}}</text>

    <rect x="350" y="122" width="244" height="68" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="368" y="148" font-size="10.5" font-weight="600" letter-spacing="0.9" fill="rgba(234,242,255,0.72)">TOTAL STARS</text>
    <text x="368" y="174" font-size="17" font-weight="700" fill="#EAF2FF">{{STARS}}</text>

    <rect x="610" y="122" width="228" height="68" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)"/>
    <text x="628" y="148" font-size="10.5" font-weight="600" letter-spacing="0.9" fill="rgba(234,242,255,0.72)">SIGNATURE</text>
    <text x="628" y="174" font-size="12" font-weight="600" fill="#EAF2FF">Glass UI</text>
  </g>
</svg>
`.trim();
export function renderOverviewVariant3(ctx) {
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
//# sourceMappingURL=overview-variant-3.js.map