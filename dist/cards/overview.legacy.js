import { lightTheme, darkTheme } from '../theme/tokens.js';
import fs from 'node:fs/promises';
import path from 'node:path';
function renderOverviewSvg(stats, theme) {
    const width = 500;
    const height = 180;
    return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .card { fill: ${theme.background}; stroke: ${theme.border}; stroke-width: 1; rx: 16; ry: 16; }
    .title { fill: ${theme.textPrimary}; font: 600 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .subtitle { fill: ${theme.textSecondary}; font: 400 13px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .label { fill: ${theme.textSecondary}; font: 400 12px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .value { fill: ${theme.textPrimary}; font: 600 16px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .accent { fill: ${theme.accent}; }
  </style>

  <rect class="card" x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" />

  <!-- Left: name & login -->
  <g transform="translate(24, 32)">
    <circle class="accent" cx="24" cy="24" r="24" />
    <text class="title" x="64" y="24" dominant-baseline="middle">${stats.name}</text>
    <text class="subtitle" x="64" y="46" dominant-baseline="middle">@${stats.login}</text>
  </g>

  <!-- Right: metrics -->
  <g transform="translate(24, 96)">
    <g transform="translate(0, 0)">
      <text class="label" x="0" y="0">Followers</text>
      <text class="value" x="0" y="20">${stats.followers}</text>
    </g>
    <g transform="translate(140, 0)">
      <text class="label" x="0" y="0">Public Repos</text>
      <text class="value" x="0" y="20">${stats.publicRepos}</text>
    </g>
    <g transform="translate(280, 0)">
      <text class="label" x="0" y="0">Total Stars</text>
      <text class="value" x="0" y="20">${stats.totalStars}</text>
    </g>
  </g>
</svg>
`.trim();
}
export async function generateOverviewCard(stats, themeName, outDir = 'cards') {
    const theme = themeName === 'dark' ? darkTheme : lightTheme;
    const svg = renderOverviewSvg(stats, theme);
    const fileName = `overview-${themeName}.svg`;
    const filePath = path.join(outDir, fileName);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(filePath, svg, 'utf8');
    return filePath;
}
//# sourceMappingURL=overview.legacy.js.map