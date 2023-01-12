import axios from "axios";
import React, {Component} from "react";
import {} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class WelcomeMessageComponent extends Component{ 

    componentDidMount(){
        if (localStorage.getItem("username")  == null){
            window.location.href = "/error";
        }
    }

    clearStorage = event => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        delete axios.defaults.headers.common["Authorization"];
    }

    render(){
        return ( 
            <div className="p-5 bg-dark text-white rounded text-center">
                <h1>Welcome to your profile page </h1>
                <h2>{localStorage.getItem("username")} </h2>
                <h3>
                    <Link   onClick={this.clearStorage}
                        to="/" 
                        className="btn bg-dark text-white rounded text-center"
                        style={{ textDecoration: 'underline' }}
                    >
                        Log Out
                    </Link>
                </h3>
            </div>
        );
    }
}