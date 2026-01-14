export type OverviewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface OverviewRenderContext {
    stats: {
        name: string;
        login: string;
        avatarUrl: string;
        followers: number;
        publicRepos: number;
        totalStars: number;
    };
    avatarHref: string;
}
export declare function escapeText(value: string): string;
export declare function formatNumber(n: number): string;
//# sourceMappingURL=types.d.ts.map