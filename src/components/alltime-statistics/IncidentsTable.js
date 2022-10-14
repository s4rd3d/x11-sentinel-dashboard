import React from 'react';
import autoBind from 'auto-bind';
import Table from '../Table';
import { getIncidents } from '../../ServerApi';
import {
  DEFAULT_INCIDENTS,
  TABLE_QUERY_INTERVAL,
} from '../../constants';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      incidents: DEFAULT_INCIDENTS,
    }
    this.getState();
  }

  // Set interval to query state
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.getState();
    }, TABLE_QUERY_INTERVAL);
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
    const _incidents = await getIncidents();
    const incidents = _incidents.map((i) => {
      return {
        date: i.date.substring(0, 10),
        time: i.date.substring(12, 19),
        result: i.result,
        userId: i.userId,
        verificationId: i.verificationId,
      }
    })
    this.setState({
      incidents,
    });
  }

  columns = [
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Time',
      accessor: 'time'
    },
    {
      Header: 'Score',
      accessor: 'result'
    },
    {
      Header: 'User ID',
      accessor: 'userId'
    },
    {
      Header: 'Verification ID',
      accessor: 'verificationId'
    },
  ]

  render() {
    const { incidents } = this.state;
    return (
      <>
        <h2>
          Incidents
        </h2>
        <div className='table-container'>
          <Table columns={this.columns} data={incidents} />
        </div>
      </>
    );
  }
};

export default Statistics;
