import { getOverviewMetrics } from './metrics/overview.js';
import { renderOverviewSvg } from './cards/overview.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const username = 'NawfalRAZOUK7';
try {
    const stats = await getOverviewMetrics(username);
    const avatarHref = stats.avatarUrl;
    await fs.mkdir('cards', { recursive: true });
    for (let variant = 1; variant <= 10; variant = (variant + 1)) {
        const svg = renderOverviewSvg(stats, avatarHref, variant);
        const filePath = path.join('cards', `overview-v${variant}.svg`);
        await fs.writeFile(filePath, svg, 'utf8');
    }
}
catch (err) {
    console.error(err);
    process.exit(1);
}
//# sourceMappingURL=generate-all.js.map