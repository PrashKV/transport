import React, { Component, createRef } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer } from "react-leaflet";
import "../styles.css";
import "leaflet-routing-machine";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/helper";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
});

class MapComp extends Component {
    constructor(props) {
        super(props);
        this.cuuu = createRef();
        this.mapRef = createRef();

        this.state = {
            final: [],
            doj: "",
            amt: 0,
            taxi: 0,
            bus: 0,
            success: 0,
            source: "",
            destination: "",
            seats: 1,
        };

        this.go = this.go.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //const provider = new OpenStreetMapProvider();

        const getAllSubsets = (theArray) =>
            theArray.reduce(
                (subsets, value) =>
                    subsets.concat(subsets.map((set) => [...set, value])),
                [[]]
            );

        function getLatLng(bus) {
            var x1, x2, y1, y2;
            x1 = parseFloat(JSON.stringify(bus.destination.lat).split('"')[3]);
            y1 = parseFloat(JSON.stringify(bus.destination.lng).split('"')[3]);
            x2 = parseFloat(JSON.stringify(bus.source.lat).split('"')[3]);
            y2 = parseFloat(JSON.stringify(bus.source.lng).split('"')[3]);
            return [x2, y2, x1, y1];
        }

        setTimeout(() => {
            const map = this.mapRef;

            const source = new ELG.Geosearch({
                expanded: true,
                placeholder: "Source",
                useMapBounds: false,
                providers: [
                    ELG.arcgisOnlineProvider({
                        useMapBounds: false,
                        apikey: "AAPK37d34e08842c4741bc067ecd7baa6c7b9hHiPRCXxw-HFlI2Kq6vX1I-1OPzHflfeIvSlELtQARbnoLMwXnQdOjbL9SZrxjR",
                    }),
                ],
            }).addTo(map);

            const destination = new ELG.Geosearch({
                expanded: true,
                placeholder: "Destination",
                position: "topright",
                useMapBounds: false,
                providers: [
                    ELG.arcgisOnlineProvider({
                        useMapBounds: false,
                        apikey: "AAPK37d34e08842c4741bc067ecd7baa6c7b9hHiPRCXxw-HFlI2Kq6vX1I-1OPzHflfeIvSlELtQARbnoLMwXnQdOjbL9SZrxjR",
                    }),
                ],
            }).addTo(map);
            const results = new L.LayerGroup().addTo(map);
            var u = null;
            var source_info;
            var dest_info;
            source.on("results", function (data) {
                results.clearLayers();
                for (var i = data.results.length - 1; i >= 0; i--) {
                    source_info = data.results[i];
                    results.addLayer(L.marker(data.results[i].latlng));
                }
                console.log("source if", source_info);
            });
            const routeselected = new L.LayerGroup().addTo(map);
            destination.on("results", (data) => {
                if (!source_info) alert("Enter Source!");

                results.clearLayers();
                for (var i = data.results.length - 1; i >= 0; i--) {
                    dest_info = data.results[i];
                    results.addLayer(L.marker(data.results[i].latlng));
                }
                this.setState({ source: source_info.text.trim() });
                this.setState({ destination: dest_info.text.trim() });
                //console.log(source_info, dest_info);
                var j;
                // var u,u1
                //    if(u && u1)
                u = L.Routing.control({
                    waypoints: [
                        L.latLng(
                            source_info.latlng.lat,
                            source_info.latlng.lng
                        ),

                        L.latLng(dest_info.latlng.lat, dest_info.latlng.lng),
                    ],
                    lineOptions: {
                        styles: [{ color: "red", opacity: 1, weight: 10 }],
                    },
                    // hide: true,
                    // showAlternatives:true
                    routeWhileDragging: false,
                    // geocoder: L.Control.Geocoder.nominatim()
                });

                u._updateLines = function () {};
                u.on("routeselected", function (e) {
                    routeselected.clearLayers();

                    var coordinates = e.route.coordinates;
                    var nearbuses = [];

                    var min_s;
                    var min_d;
                    try {
                        // console.log(coordinates);
                        fetch("http://localhost:8000/api/bus/getbuses")
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                data.forEach((bus) => {
                                    // console.log(bus)
                                    min_s = 9999999;
                                    min_d = 9999999;
                                    var first = coordinates[0];
                                    var x1, y1, x2, y2;
                                    console.log();
                                    x1 = parseFloat(
                                        JSON.stringify(
                                            bus.destination.lat
                                        ).split('"')[3]
                                    );
                                    y1 = parseFloat(
                                        JSON.stringify(
                                            bus.destination.lng
                                        ).split('"')[3]
                                    );
                                    x2 = parseFloat(
                                        JSON.stringify(bus.source.lat).split(
                                            '"'
                                        )[3]
                                    );
                                    y2 = parseFloat(
                                        JSON.stringify(bus.source.lng).split(
                                            '"'
                                        )[3]
                                    );
                                    var p = 0.017453292519943295; // Math.PI / 180
                                    var c = Math.cos;
                                    var y =
                                        0.5 -
                                        c((x1 - first.lat) * p) / 2 +
                                        (c(x1 * p) *
                                            c(first.lat * p) *
                                            (1 - c((y1 - first.lng) * p))) /
                                            2;

                                    var dest_bus =
                                        12742 * Math.asin(Math.sqrt(y));
                                    var x =
                                        0.5 -
                                        c((x2 - first.lat) * p) / 2 +
                                        (c(x2 * p) *
                                            c(first.lat * p) *
                                            (1 - c((y2 - first.lng) * p))) /
                                            2;

                                    var source_bus =
                                        12742 * Math.asin(Math.sqrt(x));
                                    bus.source_to_source = source_bus;
                                    // console.log(min_s, min_d)
                                    coordinates.forEach((coordi_3) => {
                                        // dist_dest = Math.sqrt(
                                        //     Math.pow(x1 - coordi_3.lat, 2) +
                                        //         Math.pow(y1 - coordi_3.lng, 2)
                                        // );

                                        var a =
                                            0.5 -
                                            c((x1 - coordi_3.lat) * p) / 2 +
                                            (c(x1 * p) *
                                                c(coordi_3.lat * p) *
                                                (1 -
                                                    c(
                                                        (y1 - coordi_3.lng) * p
                                                    ))) /
                                                2;

                                        var dist_dest =
                                            12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

                                        var b =
                                            0.5 -
                                            c((x2 - coordi_3.lat) * p) / 2 +
                                            (c(x2 * p) *
                                                c(coordi_3.lat * p) *
                                                (1 -
                                                    c(
                                                        (y2 - coordi_3.lng) * p
                                                    ))) /
                                                2;

                                        var dist_source =
                                            12742 * Math.asin(Math.sqrt(b));
                                        // dist_dest = Math.pow(x1 - coordi_3.lat, 2)
                                        // dist_source = Math.sqrt(
                                        //     Math.pow(x2 - coordi_3.lat, 2) +
                                        //         Math.pow(y2 - coordi_3.lng, 2)
                                        // );
                                        // console.log(dist_dest,dist_source)
                                        if (min_s > dist_source) {
                                            min_s = dist_source;
                                        }
                                        if (min_d > dist_dest) {
                                            min_d = dist_dest;
                                        }
                                    });
                                    if (
                                        source_bus < dest_bus &&
                                        min_d < 50 &&
                                        min_s < 50
                                    ) {
                                        nearbuses.push(bus);

                                        //console.log(bus.source.address,bus.destination.address)
                                        //console.log(min_s, min_d);
                                        // console.log(source_bus, dest_bus)
                                    }
                                });
                                console.log(nearbuses);
                                select_route(nearbuses);
                            });
                    } catch (err) {
                        console.log(err);
                    }
                });

                u.onAdd(map);
                map.on("click", (ev) => {
                    const { latlng } = ev;
                    const { lat, lng } = latlng;
                    console.log(ev);

                    L.marker([lat, lng]).addTo(map);
                });

                const select_route = (data) => {
                    var sorted = data.sort((a, b) => {
                        console.log(a.source_to_source);
                        if (a.source_to_source > b.source_to_source) return 1;
                        if (a.source_to_source < b.source_to_source) return -1;
                        return 0;
                    });
                    var f = getAllSubsets(sorted);

                    var minimum_cost = Number.MAX_SAFE_INTEGER;
                    var final_array = [];
                    var selected_index = 0;
                    if (f.length === 1) {
                        var metres = L.latLng(
                            source_info.latlng.lat,
                            source_info.latlng.lng
                        ).distanceTo(
                            L.latLng(dest_info.latlng.lat, dest_info.latlng.lng)
                        );
                        final_array.push({
                            name: "taxi",
                            price: Math.ceil(metres * 0.005),
                            from: source_info.text,
                            to: dest_info.text,
                        });
                        minimum_cost = Math.ceil(metres * 0.005);

                        console.log(final_array);
                    } else {
                        for (i = 1; i < f.length; i++) {
                            var dedicated_array = [];
                            var dedicated_money = 0;

                            //SOURCE TO FIRST POINT - taxi
                            var coordi_1 = getLatLng(f[i][0]);
                            metres = L.latLng(
                                source_info.latlng.lat,
                                source_info.latlng.lng
                            ).distanceTo(L.latLng(coordi_1[0], coordi_1[1]));
                            //console.log(metres);
                            dedicated_money += Math.ceil(metres * 0.005);

                            dedicated_array.push({
                                name: "taxi",
                                price: Math.ceil(metres * 0.005),
                                from: source_info.text,
                                to: f[i][0].source.address,
                            });

                            //CENTRE PART
                            dedicated_money += f[i][0].price;
                            dedicated_array.push(f[i][0]);
                            var coordi_22;
                            if (f[i].length !== 1) {
                                var coordi_21 = coordi_1;
                                for (j = 1; j < f[i].length; j++) {
                                    if (j !== 1) {
                                        coordi_21 = coordi_22;
                                    }
                                    coordi_22 = getLatLng(f[i][j]);

                                    //add taxi
                                    metres = L.latLng(
                                        coordi_21[2],
                                        coordi_21[3]
                                    ).distanceTo(
                                        L.latLng(coordi_22[0], coordi_22[1])
                                    );
                                    dedicated_money += Math.ceil(
                                        metres * 0.005
                                    );
                                    dedicated_array.push({
                                        name: "taxi",
                                        price: Math.ceil(metres * 0.005),
                                        from: f[i][j - 1].destination.address,
                                        to: f[i][j].source.address,
                                    });

                                    //add bus
                                    //console.log(f[i][j], f[i][j - 1], "\n\n");
                                    dedicated_money += f[i][j].price;
                                    dedicated_array.push(f[i][j]);
                                }
                            }

                            //LAST POINT TO DESTINATION - TAXI
                            var coordi_3 = getLatLng(f[i][f[i].length - 1]);
                            //console.log(f[i]);
                            metres = L.latLng(
                                dest_info.latlng.lat,
                                dest_info.latlng.lng
                            ).distanceTo(L.latLng(coordi_3[2], coordi_3[3]));
                            dedicated_money += Math.ceil(metres * 0.005);
                            dedicated_array.push({
                                name: "taxi",
                                price: Math.ceil(metres * 0.005),
                                from: f[i][f[i].length - 1].destination.address,
                                to: dest_info.text,
                            });
                            if (minimum_cost > dedicated_money) {
                                final_array = dedicated_array;
                                minimum_cost = dedicated_money;
                                selected_index = i;
                            }
                        }
                    }
                    console.log(final_array, minimum_cost, selected_index);
                    // this.setState({ amt: minimum_cost });
                    this.setState({ final: final_array });
                    this.setState({ success: 1 });

                    var _waypoints = [];

                    _waypoints.push(
                        L.latLng(source_info.latlng.lat, source_info.latlng.lng)
                    );

                    if (f.length !== 1) {
                        for (i = 0; i < f[selected_index].length; i++) {
                            // console.log(f[selected_index][i]);

                            var coordi = getLatLng(f[selected_index][i]);
                            //console.log(coordi)
                            _waypoints.push(L.latLng(coordi[0], coordi[1]));
                            _waypoints.push(L.latLng(coordi[2], coordi[3]));
                        }
                    }
                    _waypoints.push(
                        L.latLng(dest_info.latlng.lat, dest_info.latlng.lng)
                    );
                    // console.log(_waypoints);
                    //  map.removeControl(u)
                    routeselected.clearLayers();

                    var u1 = L.Routing.control({
                        waypoints: _waypoints,
                        lineOptions: {
                            styles: [{ color: "blue", opacity: 1, weight: 5 }],
                            addWaypoints: false,
                        },

                        fitSelectedRoutes: true,
                    }).addTo(map);
                    u1.onAdd(map);
                    // this.forceUpdate()

                    this.state.final.forEach((key, index) => {
                        if (key.name === "taxi") {
                            this.setState({
                                taxi: this.state.taxi + key.price,
                            });
                        } else {
                            this.setState({ bus: this.state.bus + key.price });
                        }
                    });
                };
            });
        }, 1000);
    }

    go(e) {
        e.preventDefault();

        if (!isAuthenticated()) {
            if (
                window.confirm(
                    "Booking tickets require signing in, would you like to be redirected?"
                )
            ) {
                window.location = "/signin";
            } else {
                alert("Please signin before booking tickets!");
            }
        } else {
            let text = `DOJ=${this.state.doj}\nSeats=${
                this.state.seats
            }\nTotal cost = ${
                this.state.taxi * Math.ceil(this.state.seats / 4) +
                this.state.bus * this.state.seats
            }\nCONFIRM?`;

            if (
                window.confirm(text) &&
                this.state.seats > 0 &&
                this.state.doj
            ) {
                window.location.href = "/tickets";
            }
        }
    }
    min_date = () => {
        var dateobj = new Date();
        dateobj.setDate(new Date().getDate() + 1);
        console.log(dateobj.toISOString().split("T")[0]);
        return dateobj.toISOString().split("T")[0];
    };
    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        const center = [14.167, 75.0403];
        return (
            <div>
                <Menu />
                <div className="wrapper">
                    <MapContainer
                        whenCreated={(mapInstance) => {
                            this.mapRef = mapInstance;
                        }}
                        // style={{ height: "100vh", width: "100%" }}
                        className="one"
                        center={center}
                        zoom="12"
                        zoomControl={false}
                    >
                        <TileLayer
                            attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                            url={
                                "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                        />
                    </MapContainer>
                    <div className="two d-flex align-items-center justify-content-center ">
                        <div className="marg">
                            <h3>
                                Total cost : ₹
                                <span className="text-success">
                                    {this.state.taxi *
                                        Math.ceil(this.state.seats / 4) +
                                        this.state.bus * this.state.seats}
                                </span>
                            </h3>

                            {this.state.source !== "" ? (
                                <div>
                                    {" "}
                                    <h3>{this.state.source}</h3>
                                    <span>to</span>
                                </div>
                            ) : (
                                <div>
                                    <div className="row align-items-center">
                                        <h3 className="col-md-12">
                                            Choose Source and Destination
                                        </h3>
                                    </div>
                                </div>
                            )}

                            <h3>{this.state.destination}</h3>
                            <div>
                                {this.state.success ? (
                                    <form onSubmit={this.go}>
                                        {/* <div className="container"> */}
                                        <div className="row mx-3">
                                            <div className="col">
                                                <div className="form-group ">
                                                    <label>DOJ:</label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        id="doj"
                                                        min={this.min_date()}
                                                        onChange={this.handleChange(
                                                            "doj"
                                                        )}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Seats:</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="seats"
                                                        value={this.state.seats}
                                                        onChange={this.handleChange(
                                                            "seats"
                                                        )}
                                                        min="1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.final.map((data) => (
                                            <div>
                                                {data.name === "taxi" ? (
                                                    <div className="taxi my-3">
                                                        <h3>
                                                            {data.name.toUpperCase()}
                                                        </h3>
                                                        <div className="container">
                                                            <div className="row ">
                                                                <div className="col-5 adr">
                                                                    {data.from}
                                                                </div>
                                                                <div className="col-2">
                                                                    To
                                                                </div>
                                                                <div className="col-5 adr">
                                                                    {data.to}
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 ms-2">
                                                                <span>
                                                                    {Math.ceil(
                                                                        this
                                                                            .state
                                                                            .seats /
                                                                            4
                                                                    )}{" "}
                                                                    * ₹
                                                                    {data.price}{" "}
                                                                    :{" "}
                                                                </span>
                                                            </div>
                                                            <h4 className="price">
                                                                ₹
                                                                {data.price *
                                                                    Math.ceil(
                                                                        this
                                                                            .state
                                                                            .seats /
                                                                            4
                                                                    )}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bus">
                                                        <h3>{data.name}</h3>
                                                        <div className="container">
                                                            <div className="row align-middle">
                                                                <div className="col-5 adr">
                                                                    {
                                                                        data
                                                                            .source
                                                                            .address
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    To
                                                                </div>
                                                                <div className="col-5 adr">
                                                                    {
                                                                        data
                                                                            .destination
                                                                            .address
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 ms-2">
                                                                <span>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .seats
                                                                    }{" "}
                                                                    * ₹
                                                                    {data.price}{" "}
                                                                    :
                                                                </span>
                                                            </div>

                                                            <h4 className="price">
                                                                ₹
                                                                {data.price *
                                                                    this.state
                                                                        .seats}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        <input
                                            type="submit"
                                            className="btn btn-success"
                                            value="Book"
                                        />
                                    </form>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapComp;
