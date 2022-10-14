import React from 'react';
import Statistics from './Statistics';
import EventsChart from './EventsChart';
import IncidentsTable from './IncidentsTable';

const AlltimeStatistics = () => {
  return (
    <section className='alltime-statistics'>
      <Statistics />
      <EventsChart />
      <IncidentsTable />
    </section>

  )
}

export default AlltimeStatistics;
