import {React} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./Components/MainPages/LoginComponent";
import AdminManangemnetPage from "./Components/AdminPages/AdminManagementPage";
import ClientManangementPage from "./Components/ClientPages/ClientManagementPage";

import ErrorPage from "./Components/MainPages/ErrorPage";

function App() {
  return (
    <div className="App h-100" style={{backgroundColor: "#006DAA"}}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginComponent />}/>
          <Route path="/clientPage/*" exact element={<ClientManangementPage/>}/>
          <Route path="/adminPage/*" exact element={<AdminManangemnetPage/>}/>
          <Route path="/error" exact element={<ErrorPage/>}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
