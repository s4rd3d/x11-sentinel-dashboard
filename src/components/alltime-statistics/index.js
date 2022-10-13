import React from 'react';
import Statistics from './Statistics';
import EventsChart from './EventsChart';

const AlltimeStatistics = () => {
  return (
    <section className='alltime-statistics'>
      <Statistics />
      <EventsChart />
    </section>

  )
}

export default AlltimeStatistics;
