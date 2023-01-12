import React, {Component} from "react";
import DeviceService from "../../Services/DeviceService";
import { ButtonGroup, Button, Table} from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class DevicesComponent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            devices:[]
        }
    }

    componentDidMount(){
        DeviceService.getDevices().then((response) => {
            this.setState({ devices : response.data })
        });
    }

    deleteDevice = (deviceId) => {
        DeviceService.deleteDevice(deviceId)
            .then((response) => {
                if (response.data != null){
                    alert("Device deleted successfully.")
                    this.setState({
                        devices: this.state.devices.filter(device => device.id !== deviceId)
                    })
                }
            });
    }


    render(){
        return(
                <div>
                    <h1 className = "text-center"> All the Devices</h1>
                    <Table border="true" hover striped variant="dark">
                        <thead>
                            <tr>
                                <td>Device Id</td>
                                <td>Device Description</td>
                                <td>Device Address</td>
                                <td>Device Max Hourly Consumption</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.devices.map(
                                    device =>
                                    <tr key = {device.id}>
                                        <td>{device.id}</td>
                                        <td>{device.description}</td>
                                        <td>{device.address}</td>
                                        <td>{device.max_h_consumption}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editDevice/" + device.id} className="btn btn-sm btn-info">Edit</Link>
                                                {' '}
                                                <Button size="sm" variant="danger" onClick={()=>this.deleteDevice(device.id)}>
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            )
    }
}