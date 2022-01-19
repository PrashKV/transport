// import logo from './logo.svg';
import './App.css';
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";
import MapComp from "./core/Map"
import {BrowserRouter, Switch, Route} from "react-router-dom"
function App() {

  return (
<div className="App">
    <BrowserRouter>
          <Switch>
              <Route path="/" component={ MapComp}/>
          </Switch>
    </BrowserRouter>

    
     
    </div>
  );
}

export default App;
