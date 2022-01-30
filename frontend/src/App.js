// import logo from './logo.svg';
import "./App.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MapComp from "./core/Map";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

import PrivateRoute from "./auth/helper/PrivateRoute"
import AdminRoute from "./auth/helper/AdminRoute";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";

import AddRecord from "./admin/AddRecord";
import Tickets from "./user/Tickets"
import CreateBus from "./admin/CreateBus";
import ManageBus from "./admin/ManageBus";
import ViewRecord from "./admin/ViewRecord";
import ViewTickets from "./admin/ViewTickets";
import UpdateBus from "./admin/UpdateBus";
import OneDayRecord from "./admin/OneDayRecord";
import UpdateUser from "./user/UpdateUser";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={MapComp} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />                   
                    <AdminRoute path="/admin/create/record" exact component={AddRecord} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                    <PrivateRoute path="/user/tickets" exact component={Tickets} />
                    <AdminRoute path="/admin/create/bus" exact component={CreateBus} />
                    <AdminRoute path="/admin/bus/manage" component={ManageBus}/>
                    <AdminRoute path="/records" component={ViewRecord}/>
                    <AdminRoute path="/tickets" component={ViewTickets}/>
                    <AdminRoute path="/admin/bus/update/:busId" component={UpdateBus}/>
                    <PrivateRoute path="/user/edit" component={UpdateUser}/>
                    <AdminRoute path="/admin/record/:recordId" component={OneDayRecord}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
