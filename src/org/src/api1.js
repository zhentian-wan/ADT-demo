import { getAccessToken } from './account1';
import { rp } from 'httputils';

let _timeframe = 'last_7_days';

const BASE_URL = 'https://api.example.com/v1/'
const CURRENCY_API_AUTH_TOKEN = '6a9a96cf53cf0f3aadfa2c65c37026e6';

const GET_HEADERS = {
  'Authorization': getAccessToken(),
  'Content-Type': 'application/json',
  'X-API-version': '2.3'
}

// https://www.cnblogs.com/Answer1215/p/10355001.html
const createApi = url => {
  return new Proxy(
    GET_HEADERS,
    {
      get: (target, key) => {
        return async params => {

          if (!params.id) {
            return Promise.reject('Missing ID');
          }

          const response = await rp({
            method: 'GET',
            url: `${url}${params.id}/${key}`, // https://api.example.com/v1/123/insights
            headers: target,
            json: Object.assign({}, {timeframe: _timeframe}, params)
          });

          if (response) {
            return response;
          }

          return Promise.reject('API error');
        }
      }
    }
  )
}

const api = createApi(BASE_URL);
// getInsights :: Params -> Promise
const getInsights = api.insights;
// getReachStats :: Params -> Promise
const getReachStats = api.reach;
// getConversions :: Params -> Promise
const getConversions = api.conversions;
const fetchCurrencyRates = () => rp({
  method: 'GET',
  url: 'https://api.currencyrates.com/rates?base_currency=eur',
  headers: {
    'Authorization': 'Bearer ' + CURRENCY_API_AUTH_TOKEN
  }
});

const client = {
  getInsights,
  getReachStats,
  getConversions,
  fetchCurrencyRates,
  get timeframe () {
    return _timeframe;
  },
  set timeframe (t) {
    _timeframe = t;
  }
};

export default client;