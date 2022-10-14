import React from 'react';
import autoBind from 'auto-bind';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { getUsers } from '../ServerApi';
import {
  DEFAULT_USERS,
  QUERY_INTERVAL,
} from '../constants';

const formatResult = (user) => {
  return (
    <span style={{ display: 'block', textAlign: 'left' }}>{user.userId}</span>
  )
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = props.handleOnSelect;
    this.backToHome = props.backToHome;
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
    const u = await getUsers();
    // Append mandatory sequential id
    let id = 0;
    const users = u.map(user => ({ id: id++, ...user }));
    this.setState({
      users,
    });
  }

  render() {
    const { users } = this.state;
    return (
      <header>
        <h1 onClick={this.backToHome}>
          X11 Sentinel Dashboard
        </h1>
        <div className='search'>
          <ReactSearchAutocomplete
            autoFocus
            items={users}
            placeholder="Find user..."
            formatResult={formatResult}
            fuseOptions={{ keys: ["userId"] }}
            resultStringKeyName="userId"
            onSelect={(user) => {this.handleOnSelect(user.userId)}}
            maxResults={3}
          />
        </div>
      </header >
    );
  }
};

export default Header;
