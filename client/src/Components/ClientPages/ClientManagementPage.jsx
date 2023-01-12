import React from "react";
import {Route, Routes} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ErrorPage from "../MainPages/ErrorPage";
import WelcomeMessageComponent from "../MainPages/WelcomeMessageComponent";
import ClientDevicesComponent from "./ClientDevicesComponent";
import ReadingsComponent from "./ReadingsComponent";
import NavigationBarComponent from "./NavigationBarForClient";

const ClientManagementPage = () => {
    
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
                  <Route path="/devices" exact element={<ClientDevicesComponent/>}/>
                  <Route path="/readings" exact element={<ReadingsComponent/>}/>
                  <Route path="*" exact element={<ErrorPage/>}/>
              </Routes>
           </Row>
       </Container>
       </div>
  )

}

export default ClientManagementPage