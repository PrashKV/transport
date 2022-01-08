import("leaflet");
// import("https://unpkg.com/leaflet@1.2.0/dist/leaflet.js");

const map = L.map("mapid").setView([14.167, 75.0403], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// L.marker([57.74, 11.94]).addTo(map)

var searchControl = new L.esri.Controls.Geosearch().addTo(map);

var results = new L.LayerGroup().addTo(map);

searchControl.on("results", function (data) {
    console.log(data);
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});

// L.Routing.control({
//     waypoints: [
//         L.latLng(51.497711244479525, 11.94),
//         L.latLng(57.6792, 11.949)
//     ],
//     routeWhileDragging: true
// }).addTo(map);
var ui = L.Routing.control({ waypoints: [L.latLng(0, 0), L.latLng(0, 0)] });
var u = L.Routing.control({
    waypoints: [
        L.latLng(14.164394986217852, 75.02954287621655), //sagar
        //L.latLng(12.9716, 77.5946) ,// bengaluru
        L.latLng(12.303109071931553, 76.647084077888),
    ],
    lineOptions: {
        styles: [{ color: "blue", opacity: 1, weight: 5 }],
    },
    hide: true,
    // showAlternatives:true
    routeWhileDragging: false,
    // geocoder: L.Control.Geocoder.nominatim()
});
ui.on("routesfound", function (e) {
    //     // console.log(routes)

    var routes = e.routes;

    alert("Found " + routes.length + " route(s).");
    console.log("hi\n");
    var min = 999999;
    var index = 0;
    for (var i = 0; i < routes.length; i++) {
        if (min > routes[i].summary.totalDistance) {
            min = routes[i].summary.totalDistance;
            index = i;
        }
    }
    var dummy = routes[index];
    console.log(dummy);
    dummy.instructions = [];
    e.routes = [];
    e.routes[0] = dummy;
    console.log(min, index);
    console.log(e);
    return e;
});
//.on("routesfound", (e) => {
//  var routes = e.routes
// alert("Found " + routes.length + " route(s).");
//console.log("ki")
//console.log(e);
//}).on("RoutingResultEvent",(e)=>{
//console.log("skdfjnbdsf")
//})
// .addTo(map)
u.on("routesfound", function (e) {
    console.log("routes found");
});

u._updateLines = function () { }
console.log("this", u);
u.onAdd(map);
map.on("click", (ev) => {
    const { latlng } = ev;
    const { lat, lng } = latlng;
    console.log(ev);
    // L.Routing.waypoint(51.497711244479525, 11.94)
    // console.log(L.Routing.waypoint(98))
    L.marker([lat, lng]).addTo(map);
});

console.log(
    L.Routing.waypoint({
        latLng: L.latLng(14.164394986217852, 75.02954287621655),
        //L.latLng(12.303109071931553, 76.647084077888),
    })
);
