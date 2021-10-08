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
  Popup,
} from "react-leaflet";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidth } from "../actions";
import LocationMarker from "../components/LocationMarker";
import MaskMarkers from "../components/MaskMarkers";
import Modal from "../components/Modal";
import Stores from "../components/Stores";
import ChangeButton from "../components/ChangeButton";

// 建議使用 Thomas 設定的參數，沒有遇到 Icon 變形的問題。
function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
    iconSize: [35, 35], // 根據 Icon 的大小自行調整
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // shadowSize: [41, 41]
  });
}

const location_icon = createIcon("https://i.imgur.com/df9q5j6.png");
const location_icon_blue = createIcon("https://i.imgur.com/wzWsH3D.png");

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    display: block;
  }
`;
const Left = styled.div`
  background-color: #fff;
  height: 100%;
  width: 400px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    // display: ${(props) => (props.page ? "block" : "none")};
    // visibility: ${(props) => (props.page ? "visible" : "hidden")};
    // position: ${(props) => (props.page ? "visible" : "hidden")};
    ${(props) => {
      const visible = props.page;
      return (
        "visibility:" +
        (visible ? "visible" : "hidden") +
        ";" +
        "position:" +
        (visible ? "relative" : "absolute") +
        ";" +
        (visible ? "" : "top: -5000px;") +
        (visible ? "" : "left: -5000px;")
      );
    }}

    width: 100%;
  }
`;
const Right = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    // display: ${(props) => (props.page ? "none" : "block")};
    // visibility: ${(props) => (props.page ? "hidden" : "visible")};
    // position: ${(props) => (props.page ? "visible" : "hidden")};
    ${(props) => {
      const visible = !props.page;
      return (
        "visibility:" +
        (visible ? "visible" : "hidden") +
        ";" +
        "position:" +
        (visible ? "relative" : "absolute") +
        ";" +
        (visible ? "" : "top: -5000px;") +
        (visible ? "" : "left: -5000px;")
      );
    }}
  }
`;
// const Test = styled.div`
//   position: absolute;
//   right: 10px;
//   top: 10px;
//   width: 50px;
//   height: 50px;
//   background-color: #fff;
//   z-index: 10000;
// `;

export default function App() {
  const page = useSelector((state) => state.rwd.page);
  const dispatch = useDispatch();
  const checkWidth = () => dispatch(setWidth(window.innerWidth));
  useEffect(() => {
    checkWidth();
  }),
    [];
  window.addEventListener("resize", checkWidth);
  return (
    <AppContainer>
      <Modal />
      <Left page={page}>
        <Stores />
      </Left>
      <Right page={page}>
        <MapContainer
          center={[25.0477541, 121.5140006]}
          zoom={15}
          scrollWheelZoom={true}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; 口罩地圖 by <a href="https://github.com/wingfailam">wingfailam</a>'
            // url="http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            url="https://api.mapbox.com/styles/v1/pandaoao/ckuib6yuz54fd17qm2bkxqeqt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFuZGFvYW8iLCJhIjoiY2t1aWI0dGgwMm1oejMycTZ2YWt5dWw3OSJ9.zMxDIA087Tqzl8DdTIr0Gg"
          />
          <LocationMarker />
          <MaskMarkers />
        </MapContainer>
      </Right>
      <ChangeButton />
    </AppContainer>
  );
}
