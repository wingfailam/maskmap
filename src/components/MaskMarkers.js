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
import { requestShops, receiveShops, fetchShops } from "../actions";

function createIcon(url) {
  return new L.Icon({
    iconUrl: url,
    iconSize: [35, 35], // 根據 Icon 的大小自行調整
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // shadowSize: [41, 41]
  });
}
import ReactDOMServer from "react-dom/server";

const locationGrey = createIcon("./img/locationGrey.png");
const locationIconRed = createIcon("./img/locationRed.png");

const MaskMarkers = () => {
  const mounted = useRef(false);
  const selectedStoreMounted = useRef(false);
  const map = useMap();
  const dispatch = useDispatch();
  const selectedShops = useSelector((state) => state.shops.data);
  const selectedStore = useSelector((state) => state.store);

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
    }
  };

  useEffect(() => {
    if (mounted.current === false) {
      mounted.current = true;
      /* 下面是 componentDidMount*/

      dispatch(fetchShops());

      /* 上面是 componentDidMount */
    } else {
      /* 下面是componentDidUpdate */

      const markers = L.markerClusterGroup();
      markers.addLayer(
        L.geoJSON(selectedShops, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: locationGrey,
            });
          },
          onEachFeature: onEachFeature,
        })
      );
      map.addLayer(markers);

      /* 上面是componentDidUpdate */
    }

    return () => {
      /* 下面是 componentWillUnmount */
      /* 上面是 componentWillUnmount */
    };
  }, [selectedShops]);

  useEffect(() => {
    let selectedStoreMarker;
    if (selectedStoreMounted.current === false) {
      selectedStoreMounted.current = true;
      /* 下面是 componentDidMount*/

      /* 上面是 componentDidMount */
    } else {
      /* 下面是componentDidUpdate */
      /* 上面是componentDidUpdate */
    }

    if (selectedStore.properties && selectedStore.properties.name) {
      const coordinates = selectedStore.geometry.coordinates;
      const reversedCoordinates = [coordinates[1], coordinates[0]];
      map.flyTo(reversedCoordinates, 17);

      const popup = () =>
        "<div class='popupContainer'>" +
        "<div class='main'>" +
        "<h5>" +
        selectedStore.properties.name +
        "</h5>" +
        "<p>" +
        selectedStore.properties.address +
        "</p>" +
        "<p>" +
        selectedStore.properties.note +
        "</p>" +
        "<p>" +
        selectedStore.properties.phone +
        "</p>" +
        "</div>" +
        "<div class='amoutLeft'>" +
        "<img src='../svgs/child.svg' width='50px' height='50px'/>" +
        "<h4>" +
        selectedStore.properties.mask_child +
        "</h4>" +
        "</div>" +
        "<div class='amoutRight'>" +
        "<img src='../svgs/adult.svg' width='50px' height='50px'/>" +
        "<h4>" +
        selectedStore.properties.mask_adult +
        "</h4>" +
        "</div>" +
        "<div class='tel'>" +
        "<a class='tel-button' href='tel:+886" +
        selectedStore.properties.phone +
        "'>" +
        "<img src='../svgs/tel.svg' width='25px' height='25px'/>" +
        "</a>" +
        "</div>" +
        "<div class='update'>" +
        "更新時間：" +
        selectedStore.properties.updated +
        "</div>" +
        "<a class='google' href='https://www.google.com/maps/search/" +
        selectedStore.properties.name +
        "%20" +
        selectedStore.properties.address +
        "' target='_blank'>" +
        "<img src='../svgs/vecotr.svg' width='20px' height='20px' />" +
        " 規劃路線" +
        "</a>" +
        "</div>";
      selectedStoreMarker = L.marker(reversedCoordinates, {
        icon: locationIconRed,
      })
        .addTo(map)
        .bindPopup(popup)
        .openPopup();
    }

    return () => {
      /* 下面是 componentWillUnmount */

      if (selectedStoreMarker) {
        map.removeLayer(selectedStoreMarker);
      }

      /* 上面是 componentWillUnmount */
    };
  }, [selectedStore]);

  return true;
};

export default MaskMarkers;
