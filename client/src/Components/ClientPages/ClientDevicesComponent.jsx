import React, {Component} from "react";
import DeviceService from "../../Services/DeviceService";
import { Table} from "react-bootstrap";

export default class ClientDevicesComponent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            devices:[]
        }
    }

    componentDidMount(){
        DeviceService.getDevicesByUserUsername(localStorage.getItem("username")).then((response) => {
            this.setState({ devices : response.data })
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            )
    }
}