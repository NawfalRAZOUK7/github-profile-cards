import { escapeText, formatNumber } from '../types.js';
/**
 * Variant 6 – Readme-Stats Classic+
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
const SVG_TEMPLATE = `<!-- POPULAR-FIRST 6 — Readme-Stats Classic+ (icon rows + right ring) -->
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="200" viewBox="0 0 860 200">
  <defs>
    <clipPath id="pf1_avatarClip">
      <circle cx="46" cy="50" r="28"/>
    </clipPath>
  </defs>

  <!-- Card -->
  <rect x="0.5" y="0.5" width="859" height="199" rx="16" fill="#0D1117" stroke="#30363D"/>

  <!-- Avatar -->
  <circle cx="46" cy="50" r="30" fill="#161B22" stroke="#30363D"/>
  <image href="{{AVATAR_HREF}}" x="18" y="22" width="56" height="56" clip-path="url(#pf1_avatarClip)" preserveAspectRatio="xMidYMid slice"/>

  <!-- Identity -->
  <text x="88" y="46" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="18" font-weight="700" fill="#E6EDF3">
    {{NAME}}
  </text>
  <text x="88" y="66" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="12" font-weight="500" fill="#8B949E">
    @{{USERNAME}}
  </text>

  <!-- Subtle panel behind rows -->
  <rect x="18" y="86" width="520" height="94" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)"/>

  <!-- Row separators -->
  <line x1="18" y1="117" x2="538" y2="117" stroke="rgba(255,255,255,0.06)"/>
  <line x1="18" y1="148" x2="538" y2="148" stroke="rgba(255,255,255,0.06)"/>

  <!-- Row icons (simple) -->
  <!-- Followers icon: user -->
  <g transform="translate(34,101)" fill="none" stroke="#58A6FF" stroke-width="1.6">
    <circle cx="0" cy="-4" r="4"/>
    <path d="M -7 7 C -7 2, 7 2, 7 7" />
  </g>

  <!-- Repos icon: book -->
  <g transform="translate(34,132)" fill="none" stroke="#58A6FF" stroke-width="1.6" stroke-linejoin="round">
    <path d="M -7 -7 H 3 A 4 4 0 0 1 7 -3 V 7 H -7 Z"/>
    <path d="M 3 -7 V 7"/>
  </g>

  <!-- Stars icon -->
  <g transform="translate(34,163)" fill="none" stroke="#58A6FF" stroke-width="1.6" stroke-linejoin="round">
    <path d="M0 -8 L2.2 -2.2 L8 -2.2 L3.2 1.4 L5 7 L0 3.8 L-5 7 L-3.2 1.4 L-8 -2.2 L-2.2 -2.2 Z"/>
  </g>

  <!-- Labels + values -->
  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">
    <!-- Followers -->
    <text x="56" y="105" font-size="11" font-weight="600" letter-spacing="0.7" fill="#8B949E">FOLLOWERS</text>
    <text x="520" y="105" text-anchor="end" font-size="15" font-weight="700" fill="#E6EDF3">{{FOLLOWERS}}</text>

    <!-- Repos -->
    <text x="56" y="136" font-size="11" font-weight="600" letter-spacing="0.7" fill="#8B949E">PUBLIC REPOS</text>
    <text x="520" y="136" text-anchor="end" font-size="15" font-weight="700" fill="#E6EDF3">{{REPOS}}</text>

    <!-- Stars -->
    <text x="56" y="167" font-size="11" font-weight="600" letter-spacing="0.7" fill="#8B949E">TOTAL STARS</text>
    <text x="520" y="167" text-anchor="end" font-size="15" font-weight="700" fill="#E6EDF3">{{STARS}}</text>
  </g>

  <!-- Divider to right visual -->
  <line x1="566" y1="22" x2="566" y2="178" stroke="rgba(255,255,255,0.08)"/>

  <!-- Right ring (signature visual placeholder) -->
  <g transform="translate(713,100)">
    <circle r="52" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="10"/>
    <circle r="52" fill="none" stroke="#58A6FF" stroke-width="10" stroke-linecap="round"
            stroke-dasharray="210 116" transform="rotate(-90)"/>
    <text y="6" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" font-weight="700" fill="#E6EDF3">
      OVERVIEW
    </text>
    <text y="26" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="11" font-weight="600" fill="#8B949E">
      classic+
    </text>
  </g>
</svg>
`.trim();
export function renderOverviewVariant6(ctx) {
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
//# sourceMappingURL=overview-variant-6.js.map