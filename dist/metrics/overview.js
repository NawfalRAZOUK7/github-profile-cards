import { fetchUser, fetchRepos } from '../data/githubClient.js';
export async function getOverviewMetrics(username) {
    const [user, repos] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
    ]);
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    return {
        name: user.name ?? user.login,
        login: user.login,
        avatarUrl: user.avatar_url,
        followers: user.followers,
        publicRepos: user.public_repos,
        totalStars,
    };
}
//# sourceMappingURL=overview.js.map