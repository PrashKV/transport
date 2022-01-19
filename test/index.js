import("leaflet");

const map = L.map("mapid").setView([14.167, 75.0403], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


function juice(params) {
    console.log("juice")
}
var source = new L.esri.Controls.Geosearch({ expanded: true }).addTo(map);
var destination = new L.esri.Controls.Geosearch({
    expanded: true,
    position: "topright",
}).addTo(map);

var results = new L.LayerGroup().addTo(map);

var source_info;
var dest_info;
source.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        source_info = data.results[i];
        results.addLayer(L.marker(data.results[i].latlng));
    }
});
destination.on("results", function (data) {
    //console.log(data);
    if (!source_info) alert("Enter Source!");
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        dest_info = data.results[i];
        results.addLayer(L.marker(data.results[i].latlng));
    }

    //console.log(source_info, dest_info);

    var u = L.Routing.control({
        waypoints: [
            L.latLng(source_info.latlng.lat, source_info.latlng.lng),

            L.latLng(dest_info.latlng.lat, dest_info.latlng.lng),
        ],
        lineOptions: {
            styles: [{ color: "red", opacity: 0.5, weight: 10 }],
        },
        // hide: true,
        // showAlternatives:true
        routeWhileDragging: false,
        // geocoder: L.Control.Geocoder.nominatim()
    });

    u._updateLines = function () {};
    u.on("routeselected", function (e) {
        console.log(
            L.latLng(source_info.latlng.lat, source_info.latlng.lng).distanceTo(
                L.latLng(14.167, 75.0403)
            )
        );
        console.log(source_info, dest_info);
        coordinates = e.route.coordinates;
        var nearbuses = [];

        var min_s;
        var min_d;
        try {
            // console.log(coordinates);
            fetch("http://localhost:8000/api/bus/getbuses")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    data.forEach((bus) => {
                        // console.log(bus)
                        min_s = 9999999;
                        min_d = 9999999;
                        var first = coordinates[0];

                        console.log();
                        x1 = parseFloat(
                            JSON.stringify(bus.destination.lat).split('"')[3]
                        );
                        y1 = parseFloat(
                            JSON.stringify(bus.destination.lng).split('"')[3]
                        );
                        x2 = parseFloat(
                            JSON.stringify(bus.source.lat).split('"')[3]
                        );
                        y2 = parseFloat(
                            JSON.stringify(bus.source.lng).split('"')[3]
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

                        dest_bus = 12742 * Math.asin(Math.sqrt(y));
                        var x =
                            0.5 -
                            c((x2 - first.lat) * p) / 2 +
                            (c(x2 * p) *
                                c(first.lat * p) *
                                (1 - c((y2 - first.lng) * p))) /
                                2;

                        source_bus = 12742 * Math.asin(Math.sqrt(x));
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
                                    (1 - c((y1 - coordi_3.lng) * p))) /
                                    2;

                            dist_dest = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

                            var b =
                                0.5 -
                                c((x2 - coordi_3.lat) * p) / 2 +
                                (c(x2 * p) *
                                    c(coordi_3.lat * p) *
                                    (1 - c((y2 - coordi_3.lng) * p))) /
                                    2;

                            dist_source = 12742 * Math.asin(Math.sqrt(b));
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
                        if (source_bus < dest_bus && min_d < 10 && min_s < 50) {
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

    select_route = (data) => {
        var sorted = data.sort((a, b) => {
            console.log(a.source_to_source);
            if (a.source_to_source > b.source_to_source) return 1;
            if (a.source_to_source < b.source_to_source) return -1;
            return 0;
        });
        f = getAllSubsets(sorted);

        minimum_cost = Number.MAX_SAFE_INTEGER;
        final_array = [];
        selected_index = 0;
        if (f.length === 1) {
            metres = L.latLng(
                source_info.latlng.lat,
                source_info.latlng.lng
            ).distanceTo(L.latLng(dest_info.latlng.lat, dest_info.latlng.lng));
            final_array.push({
                name: "taxi",
                price: metres * 0.005,
                from: source_info.text,
                to: dest_info.text,
            });
            minimum_cost = metres * 0.005;
            console.log(final_array);
        } else {
            for (i = 1; i < f.length; i++) {
                dedicated_array = [];
                dedicated_money = 0;

                //SOURCE TO FIRST POINT - taxi
                coordi_1 = getLatLng(f[i][0]);
                metres = L.latLng(
                    source_info.latlng.lat,
                    source_info.latlng.lng
                ).distanceTo(L.latLng(coordi_1[0], coordi_1[1]));
                //console.log(metres);
                dedicated_money += metres * 0.005;

                dedicated_array.push({
                    name: "taxi",
                    price: metres * 0.005,
                    from: source_info.text,
                    to: f[i][0].source.address,
                });

                //CENTRE PART
                dedicated_money += f[i][0].price;
                dedicated_array.push(f[i][0]);

                if (f[i].length !== 1) {
                    coordi_21 = coordi_1;
                    for (j = 1; j < f[i].length; j++) {
                        if (j !== 1) {
                            coordi_21 = coordi_22;
                        }
                        coordi_22 = getLatLng(f[i][j]);

                        //add taxi
                        metres = L.latLng(
                            coordi_21[2],
                            coordi_21[3]
                        ).distanceTo(L.latLng(coordi_22[0], coordi_22[1]));
                        dedicated_money += metres * 0.005;
                        dedicated_array.push({
                            name: "taxi",
                            price: metres * 0.005,
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
                coordi_3 = getLatLng(f[i][f[i].length - 1]);
                //console.log(f[i]);
                metres = L.latLng(
                    dest_info.latlng.lat,
                    dest_info.latlng.lng
                ).distanceTo(L.latLng(coordi_3[2], coordi_3[3]));
                dedicated_money += metres * 0.005;
                dedicated_array.push({
                    name: "taxi",
                    price: metres * 0.005,
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
        var _waypoints = [];

        _waypoints.push(
            L.latLng(source_info.latlng.lat, source_info.latlng.lng)
        );

        if (f.length !== 1) {
            for (i = 0; i < f[selected_index].length; i++) {
                // console.log(f[selected_index][i]);

                coordi = getLatLng(f[selected_index][i]);
                //console.log(coordi)
                _waypoints.push(L.latLng(coordi[0], coordi[1]));
                _waypoints.push(L.latLng(coordi[2], coordi[3]));
            }
        }
        _waypoints.push(L.latLng(dest_info.latlng.lat, dest_info.latlng.lng));
        console.log(_waypoints)
        var u1 = L.Routing.control({
            waypoints: _waypoints,
            lineOptions: {
                styles: [{ color: "blue", opacity: 1, weight: 5 }],
            },
            // hide: true,
            // showAlternatives:true
            routeWhileDragging: false,
            // geocoder: L.Control.Geocoder.nominatim()
        }).addTo(map);
        // u1.onAdd(map);
    };
});

const getAllSubsets = (theArray) =>
    theArray.reduce(
        (subsets, value) =>
            subsets.concat(subsets.map((set) => [...set, value])),
        [[]]
    );

function getLatLng(bus) {
    x1 = parseFloat(JSON.stringify(bus.destination.lat).split('"')[3]);
    y1 = parseFloat(JSON.stringify(bus.destination.lng).split('"')[3]);
    x2 = parseFloat(JSON.stringify(bus.source.lat).split('"')[3]);
    y2 = parseFloat(JSON.stringify(bus.source.lng).split('"')[3]);
    return [x2, y2, x1, y1];
}


fetch("http://localhost:8000/api/bus/getbuses")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })