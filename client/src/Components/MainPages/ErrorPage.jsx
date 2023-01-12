import axios from "axios";
import React, {Component} from "react";
import { Link } from 'react-router-dom';
export default class ErrorPage extends Component{

    clearStorage = event => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        delete axios.defaults.headers.common["Authorization"];
    }

    render(){
        return(
            <div class="p-5 bg-dark text-white rounded text-center">
                <h1 style={{color: 'red'}}>
                    ERROR! PAGE NOT FOUND
                </h1>
                <h2>
                    Maybe you accessed something that does not exist or something 
                        that you are not allowed to access
                </h2>
                    <Link onClick={this.clearStorage}
                        to="/" 
                        className="btn bg-dark text-white rounded text-center"
                        style={{ textDecoration: 'underline' }}
                    >
                        Go Back to the Login Page
                    </Link>
            </div>
            
        );
    }
}