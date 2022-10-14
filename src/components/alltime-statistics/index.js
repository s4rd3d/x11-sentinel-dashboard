import React from 'react';
import Statistics from './Statistics';
import UsersTable from './UsersTable';
import EventsChart from '../EventsChart';
import IncidentsTable from '../IncidentsTable';
import { getIncidents, getEvents } from '../../ServerApi';

const AlltimeStatistics = () => {
  return (
    <section className='alltime-statistics'>
      <Statistics />
      <EventsChart getData={getEvents} />
      <IncidentsTable getData={getIncidents} />
      <UsersTable />
    </section>

  )
}

export default AlltimeStatistics;
