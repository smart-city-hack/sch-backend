import { getOpenMapData } from "./api_connector";

async function getNextTrafficLight(coordinates: string) {
    var Coordinates = require('coordinate-parser');
    var position = new Coordinates(coordinates);

    var latitude = position.getLatitude();
    var longitude = position.getLongitude();

    let data = await getOpenMapData(coordinates);

    var next_latitude = data[0];
    console.log(next_latitude);

    var next_longitude = data[1];
    console.log(next_longitude);

    var distance = getDistanceFromLatLonInKm(latitude, longitude, next_latitude, next_longitude);
    console.log(distance);

    return distance;
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
return deg * (Math.PI/180)
}


getNextTrafficLight("52:31:19.1712N 13:24:47.6784E");