import { fetchUser, fetchRepos } from '../data/githubClient.js';

export interface UserStats {
  name: string;
  login: string;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
}

export async function getOverviewMetrics(username: string): Promise<UserStats> {
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
  ]);

  const totalStars = repos.reduce(
    (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
    0
  );

  return {
    name: user.name ?? user.login,
    login: user.login,
    avatarUrl: user.avatar_url,
    followers: user.followers,
    publicRepos: user.public_repos,
    totalStars,
  };
}
