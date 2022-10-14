export const DEFAULT_SENTINEL_SERVER_URL = 'http://localhost:8084/api/1'
export const DEFAULT_USERS = [];
export const DEFAULT_INCIDENTS = [];
export const DEFAULT_EVENTS = [];
export const DEFAULT_VERIFICATION_THRESHOLD = 0.5;
export const DEFAULT_SERVER_STATUS = 'offline';

// The components will update their state by sending requests to the server.
// This interval controls hot often state updates will fire. The default value
// is 1 minute.
const DEFAULT_QUERY_INTERVAL = 60000;
export const QUERY_INTERVAL = process.env.REACT_APP_QUERY_INTERVAL ??
  DEFAULT_QUERY_INTERVAL;

// Updating tables should less frequent than e.g. updating a chart. Frequent
// updates on tables can cause a headache because the column based sorting
// resets on update.
export const TABLE_QUERY_INTERVAL = process.env.REACT_APP_TABLE_QUERY_INTERVAL ??
  DEFAULT_QUERY_INTERVAL;
