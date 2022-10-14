import React from 'react';
import Statistics from './Statistics';
import EventsChart from './EventsChart';
import IncidentsTable from './IncidentsTable';
import UsersTable from './UsersTable';

const AlltimeStatistics = () => {
  return (
    <section className='alltime-statistics'>
      <Statistics />
      <EventsChart />
      <IncidentsTable />
      <UsersTable />
    </section>

  )
}

export default AlltimeStatistics;
