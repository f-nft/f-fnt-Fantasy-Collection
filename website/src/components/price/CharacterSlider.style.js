import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const modalAnimation = keyframes`${fadeIn}`;

const CharacterSliderWrapper = styled.section`
&.modal_overlay {
  position: fixed;
  height: 50%;
  width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;

  &::before {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #000;
    content: "";
    opacity: 0.79;
    backdrop-filter: blur(39px);
  }
}

.mint_modal_box {
  position: fixed;
  width: 390px;
  margin:auto;
  margin-top: 150px;
  animation: 2s ${modalAnimation}; /* ********* */
  &::before {
    backdrop-filter: blur(39px);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #171c21;
    content: "";
  }
}

.mint_modal_content {
  height: 50%;
  width: 50%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

  .slick-slider {
    .slick-list {
      margin: 0;
      height: 100%;
    }

    .slick-slide {
      height: auto; // ← that must not be ignored
    }
    .slick-track {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
    }
  }
  .slick__slider__item {
    padding: 0 5px;
  }

`;

export default CharacterSliderWrapper;
