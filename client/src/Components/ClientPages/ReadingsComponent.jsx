import React, { Component } from "react";
import {Button, FormControl, Table} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DeviceService from "../../Services/DeviceService";
import ReadingService from "../../Services/ReadingService";
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8081/ws-message';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default class ReadingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      device: '',
      date: '',
      readings: [],
      deviceId: '',
      message: '',
      readingId: '',
      readingConsumption: '',
      readingTimestamp: '',
      valoare: false
    };
  }

  onConnected = () => {
    console.log("Connected!!")
  }

  onMessageReceived = (msg) => {
    const values = msg.split(',');
    if (values[1] == this.state.deviceId){
      if (values[2] > this.state.device.max_h_consumption && !this.state.valoare){
        alert("The Max Hourly Consumption has been exceeded");
        this.setState({valoare: true})
      }
      this.setState({ readingId : values[1], readingConsumption: values[2], readingTimestamp: values[0]})
    }  
  }

  labels = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23
  ];

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount(){
    DeviceService.getDevicesByUserUsername(localStorage.getItem("username")).then((response) => {
        this.setState({ devices : response.data , device : response.data[0], deviceId : response.data[0].id})
    });
  }

  getData = event => {
    event.preventDefault();
    DeviceService.findReadingsByDeviceIdDate(this.state.device.id, this.state.date)
        .then((response) => {
            if(response.data != null){
                const dataToShow = [];
                response.data.forEach((data) =>{
                console.log("id: ", data.id);
                console.log("timestamp: ", data.timestamp);
                let i = data.timestamp.split("T")[1].slice(0, 2);
                console.log(i);
                console.log("consumption: ", data.consumption);
                if(i[0] === '0'){
                   i = i[1];
                }
                  dataToShow[i] = data.consumption});
                this.setState({ readings: dataToShow });
            }
        });
  };

  render() {
    return (
      <div style={{ height: "500px", width: "100%"}}>
        <div className="bg-dark d-flex justify-content-center">
        <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={this.onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => this.onMessageReceived(msg)}
        debug={true}
      />
      <div>{this.state.message}</div>
    </div>
          <form className="d-flex flex-column align-items-center justify-content-center">
            <div className="text-white">
              <label htmlFor="device">Device Id:</label>
              <FormControl
                as="select"
                name="device"
                value={this.state.device.id}
                onChange={(event) => {
                  this.setState({ deviceId: event.target.value });
                  this.onChange(event);
                }}
                className="bg-dark text-white"
                required
                autoComplete="off"
              >
                { this.state.devices.map(device => (
                    <option value={device.id} onClick={() => this.setState({ deviceId: device.id})}>
                      {device.id}
                    </option>
                  ))
                }
              </FormControl>
            </div>
            <div className="m-2 text-white">
              <label htmlFor="date">Date:</label>
              <FormControl
                type="date"
                name="date"
                value={this.date}
                onChange={this.onChange}
                className="m-2 bg-dark text-white"
              />
            </div>
            <Button className="my-3" size="sm" variant="success" type="submit" onClick={this.getData}>
              Get
            </Button>
          </form>
          <div className="d-flex justify-content-center align-items-center">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Here is your device consumption for the respective day"
                  }
                },
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false
                },
                scales: {
                  x: {
                    stacked: true
                  },
                  y: {
                    stacked: true
                  }
                }
              }}
              data={{
                labels: this.labels,
                datasets: [
                  {
                    label: "Readings",
                    data: this.state.readings,
                    backgroundColor: "rgb(255, 99, 132)",
                    stack: "Stack 0"
                  }
                ]
              }}
              style={{ height: "400px", margin: "50px" }}
            />
          </div>
        </div>
        <div className="my-3">
            <Table bordered striped className="bg-dark text-white">
              <thead>
                <tr>
                  <th>Reading Id</th>
                  <th>Time</th>
                  <th>Consumption</th>
                  <th>Max Hourly Consumption</th>
                </tr>
              </thead>
              <tbody>
                {
                    <tr key = {this.state.readingId ? this.state.readingId : null }>
                        <td className="text-white">{this.state.readingId ? this.state.readingId : null } </td>
                        <td className="text-white">{this.state.readingId ? this.state.readingTimestamp : null }</td>
                        <td className="text-white">{this.state.readingId ? this.state.readingConsumption : null }</td>
                        <td className="text-white">{this.state.readingId ? this.state.device.max_h_consumption : null }</td>
                    </tr>
                }
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}