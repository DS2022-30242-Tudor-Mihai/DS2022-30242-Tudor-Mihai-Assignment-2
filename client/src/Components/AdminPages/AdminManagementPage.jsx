import React from "react";
import {Route, Routes} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ErrorPage from "../MainPages/ErrorPage";
import WelcomeMessageComponent from "../MainPages/WelcomeMessageComponent";
import UsersComponent from "./UsersComponent";
import AddUserComponent from "./AddUserComponent";
import DevicesComponent from "./DevicesComponent";
import AddDeviceComponent from "./AddDeviceComponent";
import AddDeviceToUserComponent from "./AddDeviceToUserComponent";
import NavigationBarComponent from "./NavigationBarForAdministratorComponent";

const AdminManagementPage = () => {
    
  const marginTop = {
        marginTop:"20px"
  };

  return (
    <div>
    <NavigationBarComponent/>
      <Container>
          <Row>
            <Col lg={12} style={marginTop}/>
              <Routes>
                <Route path="/" exact element={<WelcomeMessageComponent/>}/>
                  <Route path="/users" exact element={<UsersComponent/>}/>
                  <Route path="/addUsers" exact element={<AddUserComponent/>}/>
                  <Route path="/users/editUser/:id" exact element={<AddUserComponent/>}/>
                  <Route path="/devices" exact element={<DevicesComponent/>}/>
                  <Route path="/addDevice" exact element={<AddDeviceComponent/>}/>
                  <Route path="devices/editDevice/:id" exact element={<AddDeviceComponent/>}/>
                  <Route path="/addDeviceToUser" exact element={<AddDeviceToUserComponent/>}/>
                  <Route path="*" exact element={<ErrorPage/>}/>
              </Routes>
           </Row>
       </Container>
       </div>
  )

}

export default AdminManagementPage