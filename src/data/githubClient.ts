import 'dotenv/config';
import fetch from 'node-fetch';

const GITHUB_API = 'https://api.github.com';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('GITHUB_TOKEN is not set');
}

export async function fetchUser(username: string) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRepos(username: string) {
  const res = await fetch(`${GITHUB_API}/users/${username}/repos?per_page=100`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  return res.json();
}
