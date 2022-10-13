import React from 'react';
import autoBind from 'auto-bind';
import Header from './components/Header';
import AlltimeStatistics from './components/AlltimeStatistics';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      window: 'alltime',
    }
  }

  setWindow(window) {
    this.setState({
      window
    });
  }

  render() {
    const { window } = this.state;
    return (
      <>
        <Header />
        {window === "alltime" && (
          <AlltimeStatistics />
        )}
      </>
    );
  }
}


export default App;
