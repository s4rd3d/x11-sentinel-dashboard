import React from 'react';
import autoBind from 'auto-bind';
import Table from '../Table';
import { getUsers } from '../../ServerApi';
import {
  DEFAULT_USERS,
  TABLE_QUERY_INTERVAL,
} from '../../constants';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      users: DEFAULT_USERS,
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
    const _users = await getUsers();
    const users = _users.map((u) => {
      return {
        date: u.createdAt.substring(0, 10),
        time: u.createdAt.substring(12, 19),
        userId: u.userId,
        successfulVerifications: Math.max(u.verifications - u.incidents, 0),
        incidents: u.incidents
      }
    })
    this.setState({
      users,
    });
  }

  columns = [
    {
      Header: '#',
      columns: [
        {
          Header: 'User ID',
          accessor: 'userId'
        },
      ]
    },
    {
      Header: 'Registration',
      columns: [
        {
          Header: 'Date',
          accessor: 'date'
        },
        {
          Header: 'Time',
          accessor: 'time'
        },
      ]
    },
    {
      Header: 'Verifications',
      columns: [
        {
          Header: 'Successful verifications',
          accessor: 'successfulVerifications'
        },
        {
          Header: 'Incidents',
          accessor: 'incidents'
        },
      ]
    },
  ]

  render() {
    const { users } = this.state;
    return (
      <>
        <h2>
          Users
        </h2>
        <div className='table-container'>
          <Table columns={this.columns} data={users} />
        </div>
      </>
    );
  }
};

export default UsersTable;
