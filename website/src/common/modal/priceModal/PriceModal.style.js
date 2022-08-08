import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import modalBg from "../../../assets/images/bg/modal2_overlay.png";

const modalAnimation = keyframes`${fadeIn}`;
const PriceModalStyleWrapper = styled.div`
  &.modal_overlay {
    position: absolute;
    height: max-content;
    width: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    justify-content: center;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      background: #000000;
      content: "";
      opacity: 0.92;
      backdrop-filter: blur(33px);
    
    }
  }

  .mint_modal_box {
    position: relative;
    margin-top: 80px;
    width: 100%;
    margin-bottom: 80px;
   
    animation: 3s ${modalAnimation}; /* ********* */

    &::before {
      backdrop-filter: blur(5px);
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #171c21;
      content: "";

    }
  }
  .mint_modal_content {
    height: auto;
    width: 100%;
    background: url(${modalBg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }
  /* add media screen query for small devices */
  @media screen and (max-width: 768px) {
    .mint_modal_box {
      width: 100%;
      margin-bottom: 20px;
      margin-top: 20px;
      height: 220px;
    }
    .mint_modal_content {
      padding-bottom: 10px;
      height: 100%;
  }
`;

export default PriceModalStyleWrapper;
