import axios from "axios";
import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBarComponent extends Component{
    componentDidMount(){
        if (localStorage.getItem("role")  !== "administrator"){
            window.location.href = "/error";
        }
        else{
            axios.defaults.headers["Authorization"] = localStorage.getItem("token");
        }
    }
    
    render(){
        return ( 
        
        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
            </Link>
            <Navbar.Brand >Administrator Actions</Navbar.Brand>
                <Nav className="options">
                    <Link to={"/adminPage"} className="nav-link">Welcome Page</Link>
                    <Link to={"users"} className="nav-link">Users List</Link>
                    <Link to={"addUsers"} className="nav-link">Add User</Link>
                </Nav>
                <Nav className="options">
                    <Link to={"devices"} className="nav-link">Devices List</Link>
                    <Link to={"addDevice"} className="nav-link">Add Device</Link>
                    <Link to={"addDeviceToUser"} className="nav-link">Add Device to User</Link>
                </Nav>
        </Navbar>
        );
    }
}