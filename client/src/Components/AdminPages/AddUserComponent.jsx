import React, {Component} from "react";
import { Card, Form, Button, Col, Row} from "react-bootstrap";
import UserService from "../../Services/UserService";

export default class AddUserComponent extends Component{
    constructor(props){
        super(props)
        this.state = this.initialState;
    };

    initialState = {
        id:'',
        username:'',
        password:'',
        role:'administrator',
    };

    submitUser = event =>{
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };

        UserService.postUser(user)
            .then((response) => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert("User Saved Succesfully");
                }
                else{
                    alert("The Request dind't work. Please try again.");
                }
            });   
    };

    updateUser = event => {
        event.preventDefault();

        const user = {
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        UserService.putUser(user)
            .then((response) => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert("User Updated Succesfully");
                    this.userList();
                }
                else{
                    alert("The Request dind't work. Please try again.");
                }
            });
    };

    userList = event => {
        window.location.href = '/adminPage/users';
    };

    resetUser = () => {
        this.setState(() => this.initialState);
    };

    userChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    componentDidMount(){
        const userId = window.location.pathname.split('editUser/')[1];
        if(userId){
            UserService.findbyid(userId)
                .then((response) => {
                    if(response.data !== null){
                        this.setState({
                            id: response.data.id,
                            username: response.data.username,
                            role: response.data.role,
                            password: response.data.password
                        });
                    } 
                }).catch((error) => {
                    alert("Error - " + error);
                });
        }
    };

    render(){
        const {username, password, role} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>User's Data</Card.Header>
                <Form   onReset={this.resetUser}
                        onSubmit={this.state.id ? this.updateUser : this.submitUser} id="userFormId">
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="username"
                                    value={username}
                                    onChange={this.userChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter username"/>
                            </Form.Group>
                            {this.state.id ? <></> : <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="password" name="password"
                                    value={password}
                                    onChange={this.userChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter password"/>
                            </Form.Group>}
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control required autoComplete="off"
                                as="select"
                                name="role"
                                value={role}
                                onChange={this.userChange}
                                className={"bg-dark text-white"}>
                                <option value="administrator">Administrator</option>
                                <option value="client">Client</option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            {this.state.id ? "Update User" : "Add User"}
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