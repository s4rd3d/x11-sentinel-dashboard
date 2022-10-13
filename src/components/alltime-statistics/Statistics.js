import React from 'react';
import autoBind from 'auto-bind';
import Card from '../Card';
import { getStatus, getUsers, getIncidents } from '../../ServerApi';
import {
  DEFAULT_SERVER_STATUS,
  DEFAULT_USERS,
  DEFAULT_INCIDENTS,
  QUERY_INTERVAL,
} from '../../constants';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      status: DEFAULT_SERVER_STATUS,
      users: DEFAULT_USERS.length,
      incidents: DEFAULT_INCIDENTS.length,
    }
    this.getState();
  }

  // Set interval to query state
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.getState();
    }, QUERY_INTERVAL);
    this.setState({
      intervalId
    })
  }

  // Clear interval
  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  async getState() {
    const status = await getStatus();
    const users = await getUsers();
    const incidents = await getIncidents();
    this.setState({
      status,
      users,
      incidents,
    });
  }

  render() {
    const { status, users, incidents } = this.state;
    return (
      <>
        <h2>
          Alltime statistics
        </h2>
        <div className='card-container'>
          <Card
            title={'server status'}
            value={status}
          />
          <Card
            title={'users'}
            value={users.length}
          />
          <Card
            title={'incidents'}
            value={incidents.length}
          />
        </div>
        <h2>
          Events
        </h2>
      </>
    );
  }
};

export default Statistics;
