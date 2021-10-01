// import "bootstrap";\
import styled from "@emotion/styled";
import "../styles.css";
import L from "leaflet";
import "leaflet.markercluster";
import {
  useMap,
  useMapEvents,
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLocation, receiveLocation } from "../actions";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
    iconSize: [35, 35], // 根據 Icon 的大小自行調整
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
    // shadowSize: [41, 41]
  });
}

const location_icon = createIcon("https://i.imgur.com/df9q5j6.png");
const location_icon_blue = createIcon("https://i.imgur.com/wzWsH3D.png");

const LocationMarker = () => {
  // const [position, setPosition] = useState(null);

  const map = useMap();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.location);

  useEffect(() => {
    dispatch(requestLocation());
    map.locate().on("locationfound", function (e) {
      // setPosition(e.latlng);
      dispatch(receiveLocation(e.latlng));
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return location === null ? null : (
    <div>
      <Marker position={location} icon={location_icon_blue}>
        <Popup>You're here</Popup>
      </Marker>
    </div>
  );
};
export default LocationMarker;
