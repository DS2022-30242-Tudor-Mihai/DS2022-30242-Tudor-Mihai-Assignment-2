import React, {Component} from "react";
import { Card, Form, Button, Col, Row} from "react-bootstrap";
import DeviceService from "../../Services/DeviceService";

export default class AdDeviceComponent extends Component{
    constructor(props){
        super(props)
        this.state = this.initialState;
    };

    initialState = {
        id: '',
        description: '',
        address: '',
        max_h_consumption: ''
    };

    submitDevice = event =>{
        event.preventDefault();

        const device = {
            description: this.state.description,
            address: this.state.address,
            max_h_consumption: parseFloat(this.state.max_h_consumption)
        };

        DeviceService.postDevice(device)
            .then((response) => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert("Device Saved Succesfully");
                }
                else{
                    alert("The Request dind't work. Please try again.");
                }
            });   
    };

    updateDevice = event =>{
        event.preventDefault();

        const device = {
            id: this.state.id,
            description: this.state.description,
            address: this.state.address,
            max_h_consumption: parseFloat(this.state.max_h_consumption)
        };

        DeviceService.putDevice(device)
            .then((response) => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert("Device Updated Succesfully");
                    this.deviceList();
                }
                else{
                    alert("The Request dind't work. Please try again.");
                }
            });   
    };

    resetDevice = () => {
        this.setState(() => this.initialState);
    };

    deviceChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    deviceList = event => {
        window.location.href = '/adminPage/devices';
    }

    componentDidMount(){
        const deviceId = window.location.pathname.split('editDevice/')[1];
        if (deviceId){
            DeviceService.getDeviceById(deviceId)
                .then((response) => {
                    if (response.data !== null){
                        this.setState({
                            id: response.data.id,
                            description: response.data.description,
                            address: response.data.address,
                            max_h_consumption: response.data.max_h_consumption
                        });
                    }

                }).catch((error) => {
                    alert("Error - " + error);
                });
        }
    };

    render(){
        const {description, address, max_h_consumption} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Device's Data</Card.Header>
                <Form   onReset={this.resetDevice}
                        onSubmit={this.state.id ? this.updateDevice : this.submitDevice} id="deviceFormId">
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="address"
                                    value={address}
                                    onChange={this.deviceChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Address"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMax_h_consumption">
                                <Form.Label>Max Hourly Consumption</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="max_h_consumption" name="max_h_consumption"
                                    value={max_h_consumption}
                                    onChange={this.deviceChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Max Hourly Consumption"/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="description" name="description"
                                    value={description}
                                    onChange={this.deviceChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Description"/>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            {this.state.id ? "Update Device" : "Add Device"}
                        </Button>
                        {' '}
                        <Button size="sm" variant="info" type="reset">
                            Reset Values
                        </Button>
                </Card.Footer>
                </Form>
            </Card>
        );
    }
}