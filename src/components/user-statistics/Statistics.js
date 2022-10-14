import React from 'react';
import autoBind from 'auto-bind';
import Card from '../Card';
import { getUser, getIncidentsByUserId } from '../../ServerApi';
import {
  DEFAULT_USER,
  DEFAULT_INCIDENTS,
  QUERY_INTERVAL,
} from '../../constants';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.userId = props.userId;
    autoBind(this);
    this.state = {
      user: DEFAULT_USER,
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
    const user = await getUser(this.userId);
    const incidents = await getIncidentsByUserId(this.userId);
    this.setState({
      user,
      incidents,
    });
  }

  render() {
    const { user, incidents } = this.state;
    return (
      <>
        <h2>
          User statistics
        </h2>
        <div className='card-container'>
          <Card
            title={'user id'}
            value={user.userId}
          />
          <Card
            title={'registration date'}
            value={user.createdAt.substring(0, 10)}
          />
          <Card
            title={'incidents'}
            value={incidents.length}
          />
        </div>
      </>
    );
  }
};

export default Statistics;
