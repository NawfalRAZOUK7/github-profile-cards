export interface UserStats {
    name: string;
    login: string;
    avatarUrl: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
}
export declare function getOverviewMetrics(username: string): Promise<UserStats>;
//# sourceMappingURL=overview.d.ts.map