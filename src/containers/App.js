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
import LocationMarker from "../components/LocationMarker";
import MaskMarkers from "../components/MaskMarkers";
import Stores from "../components/Stores";
// 建議使用 Thomas 設定的參數，沒有遇到 Icon 變形的問題。
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

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const Left = styled.div`
  flex: 4;
  background-color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <AppContainer>
      <Left className="col-4">
        <Stores />
      </Left>

      <MapContainer
        center={[23.97565, 120.973882]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ flex: 8 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <LocationMarker />
        <MaskMarkers />
      </MapContainer>
    </AppContainer>
  );
}
