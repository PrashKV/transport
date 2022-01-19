import React, { Component, createRef } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import "leaflet-routing-machine";

class Dummy extends Component {
    render() {
        const center = [14.167, 75.0403];

        return (<div>
            <MapContainer
                whenCreated={(mapInstance) => {
                    this.mapRef = mapInstance;
                    console.log(this.mapRef);
                }}
                style={{ height: "50vh", width: "100%" }}
                // className="one"
                center={center}
                className="mt-3"
                zoom="12"
                zoomControl={false}
            >
                <TileLayer
                    attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
            </MapContainer>
            <div className="bg-success">hi</div>
        </div>
        );
    }
}
export default Dummy;
