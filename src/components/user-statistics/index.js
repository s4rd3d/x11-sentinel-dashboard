import React from 'react';
import { ReactComponent as BackArrow } from '../../assets/images/back-arrow.svg';
import Statistics from './Statistics';
import IncidentsTable from '../IncidentsTable';
import EventsChart from '../EventsChart';
import { getIncidentsByUserId, getEventsByUserId } from '../../ServerApi';

const UserStatistics = ({ userId, backToHome }) => {
  async function getIncidentsData() {
    return getIncidentsByUserId(userId);
  }

  async function getEventsData() {
    return getEventsByUserId(userId);
  }

  return (
    <section className='user-statistics'>
      <div className='back-to-home-container'>
        <div className='back-to-home' onClick={backToHome}>
          <span >Back to home</span>
          <BackArrow />
        </div>
      </div>
      <Statistics userId={userId} />
      <EventsChart getData={getEventsData} />
      <IncidentsTable getData={getIncidentsData} />
    </section>
  )
}

export default UserStatistics;
