import { getOverviewMetrics } from './metrics/overview.js';

const username = 'NawfalRAZOUK7';

try {
  const stats = await getOverviewMetrics(username);
  console.log(stats);
} catch (err) {
  console.error(err);
}
