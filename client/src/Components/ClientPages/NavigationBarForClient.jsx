import axios from "axios";
import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBarComponent extends Component{
    componentDidMount(){
        if (localStorage.getItem("role")  !== "client"){
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
            <Navbar.Brand >Client Actions</Navbar.Brand>
                <Nav className="options">
                    <Link to={"/clientPage"} className="nav-link">Welcome Page</Link>
                    <Link to={"devices"} className="nav-link">My Devices</Link>
                    <Link to={"readings"} className="nav-link">Read Consumption</Link>
                </Nav>
        </Navbar>
        );
    }
}