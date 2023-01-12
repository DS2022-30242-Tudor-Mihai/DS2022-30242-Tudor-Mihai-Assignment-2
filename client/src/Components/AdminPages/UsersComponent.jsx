import React, {Component} from "react";
import UserService from "../../Services/UserService";
import { ButtonGroup, Button, Table} from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class UsersComponent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users : response.data })
        });
    }

    deleteUser = (userId) => {
        UserService.deleteUser(userId)
            .then((response) => {
                if (response.data != null){
                    alert("User deleted successfully.")
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userId)
                    })
                }
            });
    }

    render(){
        return(
                <div>
                    <h1 className = "text-center"> All the Users</h1>
                    <Table border="true" hover striped variant="dark">
                        <thead>
                            <tr>
                                <td>User Id</td>
                                <td>User Username</td>
                                <td>User Role</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key = {user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editUser/" + user.id} className="btn btn-sm btn-info">Edit</Link>
                                                {' '}
                                                <Button size="sm" variant="danger" onClick={()=>this.deleteUser(user.id)}>
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