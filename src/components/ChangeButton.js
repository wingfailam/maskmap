import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../actions";

const ChangeButtonContainer = styled.button`
  position: absolute;
  right: 15px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1000;
  border: 1px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  &: hover {
    background-color: #e0e0e0;
  }
`;

const ChangeButton = () => {
  const dispatch = useDispatch();
  const change = () => {
    console.log("test");
    dispatch(setPage());
  };
  return (
    <ChangeButtonContainer onClick={change}>
      <span class="fa fa-exchange-alt"></span>
      {/* <span class="fa fa-map-marker"></span> */}
    </ChangeButtonContainer>
  );
};
export default ChangeButton;
