import { getBoundingBoxCoordinates}  from "./coordinates_parser";
import axios from "axios";

function prepareData(coordinates: string) {
    let bounding_box = `(${getBoundingBoxCoordinates(coordinates)})`;
    return bounding_box;
}

const serverApi = axios.create({
  baseURL: "https://www.overpass-api.de",
  timeout: 90000,
});

export const getOpenMapData = (coordinates: string) => {
  return serverApi
    .get("/api/interpreter", {
      params: {
        data: `[out:json];node[\"traffic_signals:sound\"=\"yes\"]${prepareData(coordinates)};out body;`
      }
    })
    .then((res) => {
      return res.data.elements; 
    });
};

// getOpenMapData("52:31:19.1712N 13:24:47.6784E");