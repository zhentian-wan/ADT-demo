import client from './api1';
import { setAccount } from './account1'
import { upsertStats } from 'dbutils'

const setPair = (m) => m[0].metrics.map(metric => [metric, m[1][metric]]);

const setMetric = ([metric, stats], rates) => {
  if ('spend' === metric) {
    return stats.map(s => ({ [metric]: s * rates.usd }));
  }
  return stats.map(s => ({ [metric]: s}));
};

const generateAccountMetrics = (
  {insight, reach, conversion},
  [insightsMetrics, reachMetrics, conversionMetrics]
) => {
  return [
    [insight, insightsMetrics],
    [reach, reachMetrics],
    [conversion, conversionMetrics]
  ]
};

const transform = (metrics, rates) => metrics
  .map(setPair)
  .map(pair => setMetric(pair, rates))
  .filter(stat = !!state);


async function getAccountLast30Days (params) {
  try {
    const [
      rates,
      ...metrics
    ] = await Promise.all([
        client.fetchCurrencyRates(),
        client.getInsights(params['insights']),
        client.getReachStats(params['reach']),
        client.getConversions(params['conversion'])
    ]);

    const account_metrics = generateAccountMetrics(params, metrics);

    return transform(account_metrics, rates);

  } catch (err) {
    console.error(err)
    throw new Error(err);
  }
}


async function syncAccountLast30Days(id) {
  const LAST_30_DAYS = 'last_30_days';
  client.timeframe = LAST_30_DAYS;

  const {success, error} = await setAccount(id);

  if (!success) {
    return error;
  }

  const params = {
    insights: {
      id,
      metrics: ['views', 'spend']
    },
    reach: {
      id,
      metrics: ['audienceOverlap', 'uniqueReach']
    },
    conversion: {
      id,
      metrics: ['purchases', 'revenue']
    }
  };

  try {
    let account_metrics = await getAccountLast30Days(params);
    account_metrics
      .forEach(stat => upsertStats(LAST_30_DAYS, new Date().toISOString(), id, [stat]))
  } catch (err) {
    console.error(err);
  }
}
