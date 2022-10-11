import axios from 'axios';

import {
  DEFAULT_VERIFICATION_THRESHOLD,
  DEFAULT_USERS,
} from './constants';

const SENTINEL_SERVER_URL = process.env.REACT_APP_SENTINEL_SERVER_URL;
const VERIFICATION_THRESHOLD =
  process.env.REACT_APP_VERIFICATION_THRESHOLD ??
  DEFAULT_VERIFICATION_THRESHOLD;

async function get(url) {
  let response = '';
  response = await axios.get(url);
  return response;
}

export async function getUsers() {
  const url = `${SENTINEL_SERVER_URL}/users?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url);
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.users;
  } else {
    return DEFAULT_USERS;
  }
}
