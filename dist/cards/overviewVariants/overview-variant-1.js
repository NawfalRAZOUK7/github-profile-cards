import { escapeText, formatNumber } from '../types.js';
/**
 * Variant 1 – Readme-Stats Classic+
 * Icon rows + right ring, 860x200
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
const SVG_TEMPLATE = `<!-- CONCEPT 1 — Premium Dark Gradient (hero-left, stats-right) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1220"/>
      <stop offset="1" stop-color="#0F1B33"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.12" cy="0.38" r="0.35">
      <stop offset="0" stop-color="#38BDF8" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#38BDF8" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="avatarClip1">
      <circle cx="48" cy="72" r="32"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="url(#bg1)" stroke="rgba(56,189,248,0.18)"/>
  <rect x="0" y="0" width="860" height="200" rx="16" fill="url(#glow1)"/>

  <!-- Avatar -->
  <circle cx="48" cy="72" r="34" fill="rgba(255,255,255,0.06)"/>
  <image href="{{AVATAR_HREF}}" x="16" y="40" width="64" height="64" clip-path="url(#avatarClip1)"/>

  <!-- Identity -->
  <text x="96" y="66" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="20" font-weight="700" fill="#E6EDF3">
    {{NAME}}
  </text>
  <text x="96" y="88" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="13" font-weight="500" fill="#9FB0C0">
    @{{USERNAME}}
  </text>

  <!-- Divider -->
  <line x1="330" y1="32" x2="330" y2="168" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Stats grid (2 rows x 2 columns) -->
  <!-- Followers -->
  <text x="360" y="74" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" letter-spacing="0.8" fill="#9FB0C0">FOLLOWERS</text>
  <text x="360" y="98" font-family="ui-sans-serif, system-ui" font-size="18" font-weight="700" fill="#E6EDF3">{{FOLLOWERS}}</text>

  <!-- Repos -->
  <text x="560" y="74" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" letter-spacing="0.8" fill="#9FB0C0">PUBLIC REPOS</text>
  <text x="560" y="98" font-family="ui-sans-serif, system-ui" font-size="18" font-weight="700" fill="#E6EDF3">{{REPOS}}</text>

  <!-- Stars -->
  <text x="360" y="134" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" letter-spacing="0.8" fill="#9FB0C0">TOTAL STARS</text>
  <text x="360" y="158" font-family="ui-sans-serif, system-ui" font-size="18" font-weight="700" fill="#E6EDF3">{{STARS}}</text>

  <!-- Accent micro line -->
  <rect x="560" y="126" width="260" height="3" rx="2" fill="#38BDF8" opacity="0.9"/>
</svg>
`.trim();
export function renderOverviewVariant1(ctx) {
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
//# sourceMappingURL=overview-variant-1.js.map