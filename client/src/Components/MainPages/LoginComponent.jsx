import axios from "axios";
import React, {Component} from "react";
import { Card, Form, Button, Col, Row} from "react-bootstrap";
import LoginService from "../../Services/LoginService";
import UserService from "../../Services/UserService";

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = this.initialState;
    }

    initialState = {
        username:'',
        password:''
    }

    submitUser = event => {
        event.preventDefault()
        const jwtRequest = {
            username: this.state.username,
            password: this.state.password
        }
        LoginService.authenticate(jwtRequest)
            .then((response) =>{
                console.log(response);
                if(response.data != null){
                    axios.defaults.headers["Authorization"] = 'Bearer ' + response.data.token;
                    localStorage.setItem("token", 'Bearer ' + response.data.token);
                    UserService.findbyusername(jwtRequest.username)
                    .then((response) =>{
                        if (response.data.role === 'administrator'){
                            localStorage.setItem("username", response.data.username);
                            localStorage.setItem("role", response.data.role);
                            window.location.href = "/adminPage";
                        }
                        else if (response.data.role === 'client'){
                            localStorage.setItem("username", response.data.username);
                            localStorage.setItem("role", response.data.role);
                            window.location.href = "/clientPage";
                        }
                        else{
                            alert("Something went wrong");
                            this.resetUser();
                        }
                    })
                }
            })
            .catch((error) => {
                alert("This user does not exist");
                this.resetUser();
            });
    }

    userChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    resetUser = () => {
        this.setState(() => this.initialState);
    }

    render(){
        return(
            <div>
            <div className="p-5 bg-dark text-white rounded text-center">
                <h1>Welcome to your Smart Home App<br></br>
                    Please Log In</h1>
            </div>
            <div className="col-sm-6 align" id="outPopUp">
            <Card className={"border border-dark bg-dark text-white"}>
                <div className="card-header bg-dark text-white rounded text-center">
                    You must be an user to use this app
                </div>
                <Form onSubmit={this.submitUser} onReset={this.resetUser} id="userFormId">
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="username"
                                    value={this.state.username}
                                    onChange={this.userChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter username"/>
                            </Form.Group>
                        <Row>
                        </Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="password" name="password"
                                    value={this.state.password}
                                    onChange={this.userChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter password"/>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Logi In
                        </Button>
                        {' '}
                        <Button size="sm" variant="info" type="reset">
                            Reset Input
                        </Button>
                </Card.Footer>
                </Form>
            </Card>
            </div>
        </div> 
        );
    }
}

export default LoginComponent