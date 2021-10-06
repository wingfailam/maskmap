import * as types from "../constants/ActionTypes";

const shops = (
  state = {
    isFetching: false,
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            id: "5901010076",
            name: "榮星藥局",
            phone: "(02)27124696",
            address: "臺北市松山區南京東路４段１３３巷５弄１號",
            mask_adult: 320,
            mask_child: 780,
            updated: "2021/09/14 22:57:41",
            available:
              "星期一上午看診、星期二上午看診、星期三上午看診、星期四上午看診、星期五上午看診、星期六上午看診、星期日上午看診、星期一下午看診、星期二下午看診、星期三下午看診、星期四下午看診、星期五下午看診、星期六下午看診、星期日下午看診、星期一晚上看診、星期二晚上看診、星期三晚上看診、星期四晚上看診、星期五晚上看診、星期六晚上看診、星期日晚上休診",
            note: "-",
            custom_note: "",
            website: "",
            county: "臺北市",
            town: "松山區",
            cunli: "東勢里",
            service_periods: "NNNNNNNNNNNNNNNNNNNNY",
          },
          geometry: {
            type: "Point",
            coordinates: [121.555235, 25.052137],
          },
        },
      ],
    },
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_SHOPS:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_SHOPS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default shops;
