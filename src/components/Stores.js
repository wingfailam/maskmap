import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Store from "./Store";
import { auto } from "@popperjs/core";

const StoresContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding: 20px;
`;
const Lodaer = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #828282; /* Blue */
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

const Stores = () => {
  const stores = useSelector((state) => state.shops.data.features);
  const here = useSelector((state) => state.location.location);

  if (stores.length !== 1) {
    const storesWithDistance = stores.map((store) => {
      const temp = store;
      temp.properties.distance = distance(
        here.lat,
        here.lng,
        store.geometry.coordinates[1],
        store.geometry.coordinates[0],
        "K"
      );
      return temp;
    });
    const sortedStores = storesWithDistance.sort((a, b) => {
      if (a.properties.distance < b.properties.distance) {
        return -1;
      } else if (a.properties.distance > b.properties.distance) {
        return 1;
      } else {
        return 0;
      }
    });

    const sortedStoresSlice = sortedStores.slice(0, 15);
    const result = sortedStoresSlice.map((store) => (
      // Store(sortedStoresSlice)
      <Store key={store.properties.id} store={store} />
    ));

    return <StoresContainer>{result}</StoresContainer>;
  } else {
    return <Lodaer />;
  }
};
export default Stores;
