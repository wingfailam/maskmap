import styled from "@emotion/styled";
import { ReactComponent as ChildIconPath } from "../svgs/child.svg";
import { ReactComponent as AdultIconPath } from "../svgs/adult.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "../actions";

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
      if (dist < 1) {
        dist = Math.round(dist * 1000) + "m";
      } else {
        dist = dist.toFixed(1) + "k";
      }
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

// distance(e.latlng.lat, e.latlng.lng, 22.749014, 120.309906, "K")

const StoreContainer = styled.div`
  display: grid;
  grid-template-rows: 5fr 1fr;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas:
    "main amoutLeft amoutRight"
    "update update . ";
  /* grid-gap:10px; */
  span {
    margin-left: 10px;
    font-size: 1rem;
    color: #555;
  }
  p {
    margin-bottom: 0.25rem;
    color: #828282;
  }
  border-radius: 0.5rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  cursor: pointer;
`;

const StoreContainerLeft = styled.div`
  grid-area: "main";
`;
const ChildIcon = styled(ChildIconPath)`
  display: block;
  width: 50px;
  height: 50px;
`;
const AdultIcon = styled(AdultIconPath)`
  width: 50px;
  height: 50px;
`;

const AmountContainerLeft = styled.div`
  /* justify-content: center; */
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  grid-area: amoutLeft;
  color: #828282;
`;
const AmountContainerRight = styled.div`
  /* justify-content: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-area: amoutRight;
  color: #828282;
`;

const UpdatedTime = styled.div`
  grid-area: update;
  color: #828282;
  font-size: 0.5rem;
`;
const store1 = {
  type: "Feature",
  properties: {
    id: "5903250176",
    name: "弘大美妝藥局",
    phone: "(04)22859180",
    address: "臺中市南區南門路１１５號１樓",
    mask_adult: 580,
    mask_child: 1440,
    updated: "2021/09/14 22:57:41",
    available:
      "星期一上午看診、星期二上午看診、星期三上午看診、星期四上午看診、星期五上午看診、星期六上午看診、星期日上午休診、星期一下午看診、星期二下午看診、星期三下午看診、星期四下午看診、星期五下午看診、星期六下午休診、星期日下午休診、星期一晚上看診、星期二晚上看診、星期三晚上看診、星期四晚上看診、星期五晚上看診、星期六晚上休診、星期日晚上休診",
    note: "早上9點10分到中午12點提供防疫口罩販售，星期日休息",
    custom_note: "",
    website: "",
    county: "臺中市",
    town: "南區",
    cunli: "南門里",
    service_periods: "NNNNNNYNNNNNYYNNNNNYY"
  },
  geometry: {
    type: "Point",
    coordinates: [120.679768, 24.122218]
  }
};

const Store = (props) => {
  const store = props.store;
  const dispatch = useDispatch();
  const onStoreClick = (store) => {
    dispatch(selectStore(store));
  };

  return (
    <StoreContainer onClick={() => onStoreClick(store)}>
      <StoreContainerLeft>
        <h5>
          {store.properties.name}
          <span>
            {store.properties.distance < 1
              ? Math.round(store.properties.distance * 1000) + "m"
              : store.properties.distance.toFixed(1) + "k"}
          </span>
        </h5>

        <p>{store.properties.address}</p>
        <p>{store.properties.phone}</p>
      </StoreContainerLeft>
      <AmountContainerLeft>
        <ChildIcon />
        <h4>{store.properties.mask_child}</h4>
        {/* <p>test</p>
        <p>test</p> */}
      </AmountContainerLeft>
      <AmountContainerRight>
        <AdultIcon />
        <h4>{store.properties.mask_adult}</h4>
      </AmountContainerRight>
      <UpdatedTime>更新時間：{store.properties.updated}</UpdatedTime>
    </StoreContainer>
  );
};
export default Store;
