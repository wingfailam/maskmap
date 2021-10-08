import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../actions";

const ModalContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 65%; /* Could be more or less, depending on screen size */
  height: 20%;
  border-radius: 10px;
`;
const Close = styled("span")`
  position: absolute;
  right: 10px;
  top: 10px;
  line-height: 28px;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Modal = () => {
  const show = useSelector((state) => state.location.showModal);

  const dispatch = useDispatch();

  const closeModalContainer = () => {
    dispatch(showModal(false));
  };

  return (
    <ModalContainer show={show} onClick={closeModalContainer}>
      <ModalContent>
        <Close onClick={closeModalContainer}>&times;</Close>

        <h5>開啟定位功能才會顯示離你最近的附近藥局哦！</h5>
      </ModalContent>
    </ModalContainer>
  );
};
export default Modal;
