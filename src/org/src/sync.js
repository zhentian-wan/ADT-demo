import * as api from './api';
import { setAccount } from './account'
import { upsertStats } from 'dbutils'

function syncAccountLast30Days(account_id) {
  api.timeframe = 'last_30_days';
  setAccount(account_id)

  client = new api.StatsApi();

  client.fetchCurrencyRates().then(rates => {
    let insightsParams = {
      id: account_id,
      metrics: ['views', 'spend']
    };
    client.getInsights(insightsParams).then(insightsMetrics => {
      let reachParams = {
        id: account_id,
        metrics: ['audienceOverlap', 'uniqueReach']
      };
      client.getReachStats(reachParams).then(reachMetrics => {
        let conversionParams = {
          id: account_id,
          metrics: ['purchases', 'revenue']
        }
        client.getConversions(conversionParams).then(conversionMetrics => {
          let account_metrics = [
            [insightsParams, insightsMetrics],
            [reachParams, reachMetrics],
            [conversionParams, conversionMetrics]
          ].map((m) => m[0].metrics.map(metric => [metric, m[1][metric]]))
          .map((pair) => {
            const metric = pair[0];
            const stats = pair[1];
            if ('spend' === metric) {
              return stats.map(s => ({ [metric]: s * rates.usd }));
            }
            return stats.map(s => ({ [metric]: s}));
          }).forEach(stat => {
            if (stat == null) {
              return;
            }
            upsertStats('last_30_days', new Date().toISOString(), account_id, [stat]);
          })
        });
      });
    });
  });
}
