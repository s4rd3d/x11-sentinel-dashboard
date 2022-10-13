import axios from 'axios';

import {
  DEFAULT_SENTINEL_SERVER_URL,
  DEFAULT_VERIFICATION_THRESHOLD,
  DEFAULT_USERS,
  DEFAULT_INCIDENTS,
  DEFAULT_SERVER_STATUS,
} from './constants';

const SENTINEL_SERVER_URL =
  process.env.REACT_APP_SENTINEL_SERVER_URL ??
  DEFAULT_SENTINEL_SERVER_URL;
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
  const response = await get(url).catch(e => {return DEFAULT_USERS});
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.users;
  } else {
    return DEFAULT_USERS;
  }
}

export async function getStatus() {
  const url = `${SENTINEL_SERVER_URL}/state`;
  const response = await get(url).catch(e => {return DEFAULT_SERVER_STATUS});
  if (response.status === 200 && response.data.result === "ok") {
    return 'online';
  } else {
    return DEFAULT_SERVER_STATUS;
  }
}

export async function getIncidents() {
  const url = `${SENTINEL_SERVER_URL}/verifications?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url).catch(e => {return DEFAULT_INCIDENTS});
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.verifications;
  } else {
    return DEFAULT_INCIDENTS;
  }
}
