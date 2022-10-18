import axios from 'axios';

import { fakeData } from './utils';

import {
  DEFAULT_SENTINEL_SERVER_URL,
  DEFAULT_VERIFICATION_THRESHOLD,
  DEFAULT_USERS,
  DEFAULT_USER,
  DEFAULT_INCIDENTS,
  DEFAULT_SERVER_STATUS,
  DEFAULT_EVENTS,
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
  if (process.env.REACT_APP_TEST) {
    return fakeData.users;
  }
  const url = `${SENTINEL_SERVER_URL}/users?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url).catch(e => { return DEFAULT_USERS });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.users;
  } else {
    return DEFAULT_USERS;
  }
}

export async function getUser(userId) {
  if (process.env.REACT_APP_TEST) {
    return fakeData.users.filter((user) => {return user.userId === userId});
  }
  const url = `${SENTINEL_SERVER_URL}/users/${userId}/?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url).catch(e => { return DEFAULT_USER });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.user;
  } else {
    return DEFAULT_USER;
  }
}

export async function getStatus() {
  if (process.env.REACT_APP_TEST) {
    return 'online';
  }
  const url = `${SENTINEL_SERVER_URL}/state`;
  const response = await get(url).catch(e => { return DEFAULT_SERVER_STATUS });
  if (response.status === 200 && response.data.result === "ok") {
    return 'online';
  } else {
    return DEFAULT_SERVER_STATUS;
  }
}

export async function getIncidents() {
  if (process.env.REACT_APP_TEST) {
    return fakeData.incidents;
  }
  const url = `${SENTINEL_SERVER_URL}/verifications?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url).catch(e => { return DEFAULT_INCIDENTS });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.verifications;
  } else {
    return DEFAULT_INCIDENTS;
  }
}

export async function getIncidentsByUserId(userId) {
  if (process.env.REACT_APP_TEST) {
    return fakeData.incidents.filter((incident) => {return incident.userId === userId});
  }
  const url = `${SENTINEL_SERVER_URL}/verifications/${userId}/?threshold=${VERIFICATION_THRESHOLD}`;
  const response = await get(url).catch(e => { return DEFAULT_INCIDENTS });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.verifications;
  } else {
    return DEFAULT_INCIDENTS;
  }
}

export async function getEvents() {
  if (process.env.REACT_APP_TEST) {
    return fakeData.events;
  }
  const url = `${SENTINEL_SERVER_URL}/events`;
  const response = await get(url).catch(e => { return DEFAULT_EVENTS });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.events;
  } else {
    return DEFAULT_EVENTS;
  }
}

export async function getEventsByUserId(userId) {
  if (process.env.REACT_APP_TEST) {
    return fakeData.events;
  }
  const url = `${SENTINEL_SERVER_URL}/events/${userId}`;
  const response = await get(url).catch(e => { return DEFAULT_EVENTS });
  if (response.status === 200 && response.data.result === "ok") {
    return response.data.events;
  } else {
    return DEFAULT_EVENTS;
  }
}
