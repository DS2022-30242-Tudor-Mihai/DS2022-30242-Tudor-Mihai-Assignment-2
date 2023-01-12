import React, {Component} from "react";
import { Card, Form, Button, Col, Row} from "react-bootstrap";
import UserService from "../../Services/UserService";
import DeviceService from "../../Services/DeviceService";

export default class AddDeviceToUserComponent extends Component{
    constructor(props){
        super(props)
        this.state = this.initialState;
    }

    initialState = {
        users: [],
        devices: [],
        device: '',
        user: ''
    }

    submitAdding = event =>{
        event.preventDefault();
        console.log(this.state.user, this.state.device);
        UserService.addDeviceToUser(this.state.user, this.state.device)
            .then((response) => {
                if(response.data != null){
                    alert("Device Added Succesfully To the User");
                }
                else{
                    alert("The Request dind't work. Please try again.");
                }
            });   
    }

    componentDidMount(){
        DeviceService.getDevices().then((response) => {
            this.setState({ devices : response.data, device : response.data[0].description})
        });
        UserService.getUsers().then((response) => {
            this.setState({ users : response.data, user : response.data[0].username})
        });
        
    }

    dataChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        const {device, user} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Add Device to User</Card.Header>
                <Form onSubmit={this.submitAdding} id="addingFormId">
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUserId">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required autoComplete="off" 
                                        as="select" name="user" 
                                        value={user} onChange={this.dataChange} 
                                        className={"bg-dark text-white"}>
                                        {this.state.users.map(user => 
                                        (
                                            <option value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDeviceId">
                                <Form.Label> Device Description</Form.Label>
                                <Form.Control required autoComplete="off" 
                                        as="select" name="device" 
                                        value={device} onChange={this.dataChange} 
                                        className={"bg-dark text-white"}>
                                        {this.state.devices.map(device => 
                                        (
                                            <option value={device.id}>
                                                {device.description}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Add Device To User
                        </Button>
                </Card.Footer>
                </Form>
            </Card>
        );
    }
}