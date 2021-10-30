import { getOpenMapData } from "./api_connector"

export async function getNextTrafficLight(coordinates: string) {
    var Coordinates = require('coordinate-parser')
    var position = new Coordinates(coordinates)


    var latitude = position.getLatitude()
    var longitude = position.getLongitude()

    let data: any[] = await getOpenMapData(coordinates)

    let distance = -1;
    for(let element of data) {
        var pot_lat = element.lat;
        var pot_lon = element.lon;

        distance = getDistanceFromLatLonInKm(latitude, longitude, pot_lat, pot_lon);
        if(distance > 0.05)
            break;
    }

    return distance
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1)  // deg2rad below
    var dLon = deg2rad(lon2 - lon1)
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    return d
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}


getNextTrafficLight("52:31:19.1712N 13:24:47.6784E")