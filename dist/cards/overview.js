import { renderOverviewVariant1 } from './overviewVariants/overview-variant-1.js';
import { renderOverviewVariant2 } from './overviewVariants/overview-variant-2.js';
import { renderOverviewVariant3 } from './overviewVariants/overview-variant-3.js';
import { renderOverviewVariant4 } from './overviewVariants/overview-variant-4.js';
import { renderOverviewVariant5 } from './overviewVariants/overview-variant-5.js';
import { renderOverviewVariant6 } from './overviewVariants/overview-variant-6.js';
import { renderOverviewVariant7 } from './overviewVariants/overview-variant-7.js';
import { renderOverviewVariant8 } from './overviewVariants/overview-variant-8.js';
import { renderOverviewVariant9 } from './overviewVariants/overview-variant-9.js';
import { renderOverviewVariant10 } from './overviewVariants/overview-variant-10.js';
function toContext(stats, avatarHref) {
    return {
        stats: {
            name: stats.name,
            login: stats.login,
            avatarUrl: stats.avatarUrl,
            followers: stats.followers,
            publicRepos: stats.publicRepos,
            totalStars: stats.totalStars,
        },
        avatarHref: avatarHref ?? stats.avatarUrl,
    };
}
export function renderOverviewSvg(stats, avatarHref, variant = 1) {
    const ctx = toContext(stats, avatarHref);
    switch (variant) {
        case 1:
            return renderOverviewVariant1(ctx);
        case 2:
            return renderOverviewVariant2(ctx);
        case 3:
            return renderOverviewVariant3(ctx);
        case 4:
            return renderOverviewVariant4(ctx);
        case 5:
            return renderOverviewVariant5(ctx);
        case 6:
            return renderOverviewVariant6(ctx);
        case 7:
            return renderOverviewVariant7(ctx);
        case 8:
            return renderOverviewVariant8(ctx);
        case 9:
            return renderOverviewVariant9(ctx);
        case 10:
        default:
            return renderOverviewVariant10(ctx);
    }
}
//# sourceMappingURL=overview.js.map