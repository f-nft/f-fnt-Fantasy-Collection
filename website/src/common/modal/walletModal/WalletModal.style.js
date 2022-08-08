import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import modalBg from "../../../assets/images/bg/modal_overlay.png";

const modalAnimation = keyframes`${fadeIn}`;

const WalletModalStyleWrapper = styled.div`
  &.modal_overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    justify-content: center;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      height: 50%;
      width: 100%;
      background: #000;
      content: "";
      opacity: 0.92;
      backdrop-filter: blur(33px);
    }
  }

  .mint_modal_box {
    position: relative;
    width: 440px;
    margin: auto;
    animation: 1s ${modalAnimation}; /* ********* */

    &::before {
      border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
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
    border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
    height: 100%;
    width: 100%;
    background: url(${modalBg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 45px;
    padding-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .modal_header {
    h2 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      max-width: 280px;
      margin: auto;
      margin-bottom: 26px;
    }

    button {
      border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 5px;
      background: transparent;
      border: none;
      outline: none;
      height: 45px;
      width: 45px;
      position: absolute;
      right: 0px;
      top: 0px;
      overflow: hidden;
      display: flex;
      justify-content: end;
      align-items: baseline;

      svg {
        margin-top: 5px;
        color: #ffffff;
      }

      &:before {
        content: "";
        background: rgba(255, 255, 255, 0.1);
        height: 150%;
        width: 150%;
        position: absolute;
        right: -35px;
        top: -35px;
        transform: rotate(45deg);
      }
    }
  }

  .modal_body {
    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      padding-bottom: 24px;
    }
  }

  .wallet_list {
    a {
      border: 1px 5px solid black;
    border-color: gold;
    border-width: 1px;
    border-radius: 25px;
      display: flex;
      align-items: center;
      column-gap: 25px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      padding: 15px 30px;
      margin-bottom: 20px;
      position: relative;
      color: #ffffff;
      text-align: left;
      cursor: pointer;

      span {
        position: absolute;
        right: 20px;
      }
    }
  }

  .modal_bottom_text {
    color: rgba(255, 255, 255, 0.8);
    a {
      color: #ffffff;
      margin-left: 7px;
    }
  }

  .modal_bottom_shape {
    position: absolute;
    bottom: 10px;

    &.shape_left {
      left: 10px;
      transform: rotate(-90deg);
    }
    &.shape_right {
      right: 10px;
      transform: rotate(180deg);
    }
  }
`;

export default WalletModalStyleWrapper;
