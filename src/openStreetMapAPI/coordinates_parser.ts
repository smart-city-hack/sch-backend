function createBoundingBox(longitude: number, latitude:number, left: number, right: number) {
    return[latitude + left, longitude + right];
}

export function getBoundingBoxCoordinates(coordinate: string) {
    var Coordinates = require('coordinate-parser');
    var position = new Coordinates(coordinate);
 
    var latitude = position.getLatitude();
    var longitude = position.getLongitude();

    var leftUpper = createBoundingBox(longitude, latitude, -0.01, -0.01);
    var leftLower = createBoundingBox(longitude, latitude, -0.01, 0.01);
    var rightUpper = createBoundingBox(longitude, latitude, 0.01, -0.01);
    var rightLower = createBoundingBox(longitude, latitude, 0.01, 0.01);

    // return [leftUpper, leftLower, rightUpper, rightLower];
    // latitude south, longitude west, latitude north, longitude east
    return [leftLower[0], rightUpper[1], rightUpper[0], leftLower[1]];
}


var coordinates = "52:31:19.1712N 13:24:47.6784E";
var result = getBoundingBoxCoordinates(coordinates);
console.log(result);
