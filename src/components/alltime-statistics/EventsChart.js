import React from 'react';
import autoBind from 'auto-bind';
import { getEvents } from '../../ServerApi';
import {
  QUERY_INTERVAL,
} from '../../constants';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoom from 'chartjs-plugin-zoom';

class AlltimeStatistics extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler,
      zoom
    );
    this.chartRef = React.createRef();
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Events / Date',
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            modifierKey: 'ctrl',
          },
          zoom: {
            drag: {
              enabled: true
            },
            mode: 'xy',
          },
        },
      },
    };
    this.state = {
      labels: [],
      data: [],
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
    const events = await getEvents();
    const labels = events.map((event) => event.date.substring(0, 10));
    const data = events.map((event) => event.eventCount);

    this.setState({
      labels: labels.reverse(),
      data: data.reverse(),
    });
  }

  render() {
    const { labels, data } = this.state;
    const chartData = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Event count',
          data,
          borderColor: '#009093',
          backgroundColor: '#39b992',
        },
      ]
    };
    return (
      <div className='chart-container'>
        <Line ref={this.chartRef} options={this.options} data={chartData} />
        <button onClick={() => {this.chartRef.current.resetZoom()}}>
          Reset zoom
        </button>
      </div>
    );
  }
};

export default AlltimeStatistics;
