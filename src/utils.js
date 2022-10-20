import { faker } from '@faker-js/faker';

let width, height, gradient;
export function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, '#39b992');
    gradient.addColorStop(1, '#FFFFFF');
  }

  return gradient;
}

export const fakeData = makeData();

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
}

function makeData() {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(makeUser(faker.internet.email('John', 'Doe', `example-${i}.dev`)));
  }
  let incidents = [];
  users.forEach((user) => {
    incidents.push(makeIncidentsForUser(user.userId, user.incidents, user.createdAt));
  })
  incidents = incidents.flat();
  const events = makeEvents();
  return {users, incidents, events};
}

function makeUser(userId) {
  return {
    userId,
    eventCount: faker.datatype.number({ max: 1000000 }),
    createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z').toISOString(),
    verifications: faker.datatype.number({ min: 0, max: 100 }),
    incidents: faker.datatype.number({ min:0, max: 10 }),
  }
}

function makeIncidentsForUser(userId, count, createdAt) {
  const incidents = [];
  for (let i = 0; i < count; i++) {
    incidents.push({
      verificationId: faker.datatype.uuid(),
      userId,
      result: faker.datatype.float({min: 0.0,  max: 0.5 }),
      date: faker.date.between(createdAt, '2031-01-01T00:00:00.000Z').toISOString(),
    })
  }
  return incidents;
}

function makeEvents() {
  const events = [];
  const dates = getDates(new Date('2022-01-01T00:00:00.000Z'), new Date('2023-01-01T00:00:00.000Z')).reverse();

  for (let i = 0; i < dates.length; i++) {
    events.push({
      date: dates[i].toISOString(),
      eventCount: faker.datatype.number({ min: 10000, max: 20000 })
    })
  }

  return events;
}

