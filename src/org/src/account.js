import { fetchAccount } from 'dbutils';

let accountId = null;
let account = null;

export function setAccount(newAccountId) {
  accountId = newAccountId;
  fetchAccount(newAccountId).then((a) => account = a)
}

export function getAccessToken() {
  return account.access_token;
}
