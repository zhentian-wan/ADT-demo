import { getAccessToken } from './account';
import { rp } from 'httputils';

export var timeframe = 'last_7_days';

const BASE_URL = 'https://api.example.com/v1/'
const CURRENCY_API_AUTH_TOKEN = '6a9a96cf53cf0f3aadfa2c65c37026e6';

export class StatsApi {
  getInsights(params) {
    params['timeframe'] = timeframe;
    return rp({
      method: 'GET',
      url: BASE_URL + params['id'] + '/insights',
      headers: {
        'Authorization': getAccessToken(),
        'Content-Type': 'application/json',
        'X-API-version': '2.3'
      },
      json: params
    }).catch((e) => {
      console.error(e);
      return {};
    });
  }

  getReachStats(params) {
    params['timeframe'] = timeframe;
    return rp({
      method: 'GET',
      url: BASE_URL + params['id'] + '/reach',
      headers: {
        'Authorization': getAccessToken(),
        'Content-Type': 'application/json',
        'X-API-version': '2.3'
      },
      json: params
    });
  }

  getConversions(params) {
    params['timeframe'] = timeframe;
    return rp({
      method: 'GET',
      url: BASE_URL + params['id'] + '/conversions',
      headers: {
        'Authorization': getAccessToken(),
        'Content-Type': 'application/json',
        'X-API-version': '2.3'
      },
      json: params
    });
  }

  fetchCurrencyRates() {
    return rp({
      method: 'GET',
      url: 'https://api.currencyrates.com/rates?base_currency=eur',
      headers: {
        'Authorization': 'Bearer ' + CURRENCY_API_AUTH_TOKEN
      }
    });
  }
}
