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
import AddBus from "./admin/AddBus";
import AddRecord from "./admin/AddRecord";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={MapComp} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                    <AdminRoute path="/admin/create/bus" exact component={AddBus} />
                    <AdminRoute path="/admin/create/record" exact component={AddRecord} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
