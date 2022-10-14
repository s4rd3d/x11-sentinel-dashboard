import React from 'react';
import autoBind from 'auto-bind';
import Header from './components/Header';
import AlltimeStatistics from './components/alltime-statistics';
import UserStatistics from './components/user-statistics';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      window: 'alltime',
      selectedUserId: undefined,
    }
  }

  setWindow(window) {
    this.setState({
      window
    });
  }

  setSelectedUserId(selectedUserId) {
    this.setState({
      selectedUserId,
      window: 'user'
    });
  }

  backToHome() {
    this.setState({
      selectedUserId: undefined,
      window: 'alltime'
    })
  }

  render() {
    const { window, selectedUserId } = this.state;
    return (
      <>
        <Header
          handleOnSelect={this.setSelectedUserId}
          backToHome={this.backToHome}
        />
        {window === 'alltime' && (
          <AlltimeStatistics />
        )}
        {window === 'user' && (
          <UserStatistics
            userId={selectedUserId}
            backToHome={this.backToHome}
          />
        )}
        <footer />
      </>
    );
  }
}


export default App;
