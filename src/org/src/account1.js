import { fetchAccount } from 'dbutils';
import {propOr} from './utils1';

class Account {
  constructor() {
    this._accountId = null;
    this._account = null;
  }

  setAccount (newAccountId) {
    if (!newAccountId) {
      return Promise.reject('account id is wrong');
    }
    return fetchAccount(newAccountId)
      .then(a => this._account = a)
      .catch(err => new Error('Cannot fetch account'));
  }

  setAccountId (newAccountId) {
    this._accountId = newAccountId;
  }

  getAccessToken () {
    return propOr('access_token', null)(this._account);
  }
}

/**
 * Singleton
 */
const _account = new Account();


export function setAccount(newAccountId) {
  // If fetching account failed, no need to update accountId
  return _account.setAccount(newAccountId)
    .then(() => {
      _account.setAccountId(newAccountId);
      return {success: true, error: null};
    })
    .catch(error => ({success: false, error}));
}

export function getAccessToken() {
  return _account.getAccessToken();
}
