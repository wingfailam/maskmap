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
import { requestShops, receiveShops } from "../actions";
import { main } from "@popperjs/core";

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

const MaskMarkers = () => {
  const map = useMap();
  const dispatch = useDispatch();
  const selectedStore = useSelector((state) => state.store);
  // const selectedGeometry = useSelector(
  //   (state) => state.shops.data.features
  // ).find((element) => element.properties.id == selectedID).geometry;
  // console.log(selectedGeometry);
  if (Object.entries(selectedStore).length !== 0) {
    // map.flyTo(selectedStore.geometry.coordinates.reverse(), map.getZoom());
    // console.log(selectedStore.geometry.coordinates.reverse());
    const coordinates = selectedStore.geometry.coordinates;
    const reversedCoordinates = [coordinates[1], coordinates[0]];
    map.flyTo(reversedCoordinates, 17);
    // console.log("selectedStore", [coordinates[1],coordinates[0]];
    // console.log("reversedCoordinates", reversedCoordinates);
  }
  const fetchMask = () => {
    const link =
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";
    return fetch(link)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };
  // const test = () => {
  //   return <div className="popupContainer">
  //     <h5></h5>
  //   </div>;
  // };
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(
        "<div class='popupContainer'>" +
          "<div class='main'>" +
          "<h5>" +
          feature.properties.name +
          "</h5>" +
          "<p>" +
          feature.properties.address +
          "</p>" +
          "<p>" +
          feature.properties.note +
          "</p>" +
          "<p>" +
          feature.properties.phone +
          "</p>" +
          "</div>" +
          "<div class='amoutLeft'>" +
          "<img src='../svgs/child.svg' width='50px' height='50px'/>" +
          "<h4>" +
          feature.properties.mask_child +
          "</h4>" +
          "</div>" +
          "<div class='amoutRight'>" +
          "<img src='../svgs/adult.svg' width='50px' height='50px'/>" +
          "<h4>" +
          feature.properties.mask_adult +
          "</h4>" +
          "</div>" +
          "<div class='tel'>" +
          "<a class='tel-button' href='tel:+886" +
          feature.properties.phone +
          "'>" +
          "<img src='../svgs/tel.svg' width='25px' height='25px'/>" +
          "</a>" +
          "</div>" +
          "<div class='update'>" +
          "更新時間：" +
          feature.properties.updated +
          "</div>" +
          "<a class='google' href='https://www.google.com/maps/search/" +
          feature.properties.name +
          "%20" +
          feature.properties.address +
          "' target='_blank'>" +
          "<img src='../svgs/vecotr.svg' width='20px' height='20px' />" +
          " 規劃路線" +
          "</a>" +
          "</div>"
      );
      // layer.markerID = feature.properties.id;
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(requestShops());
      const [data] = await Promise.all([fetchMask()]);
      dispatch(receiveShops(data));
      // console.log("data", data);
      // console.log(position);

      // L.geoJSON(data).addTo(map);

      var markers = L.markerClusterGroup();

      markers.addLayer(
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: location_icon });
          },

          onEachFeature: onEachFeature
        })
      );

      // console.log("markers", markers);

      // for (var i = 0; i < data.features.length; i++) {

      //   var name = data.features[i].properties.name;

      //   let lnglat = data.features[i].geometry.coordinates;
      //   var marker = L.marker(new L.LatLng(lnglat[1], lnglat[0]), { title: name });
      //   marker.bindPopup(name);
      //   markers.addLayer(marker);
      // }

      map.addLayer(markers);
    };
    fetchingData();
  }, []);
  return 0;
};

export default MaskMarkers;
