import styled from "styled-components";

const CharacterSliderWrapper = styled.section`
  padding: 20px 40px;
  position: relative;
  z-index: 1;

  .slick-slider {
    .slick-list {
      margin: 0 -15px;
    }

    .slick-slide {
      height: auto; // ← that must not be ignored
    }
    .slick-track {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;
    }
  }
  .slick__slider__item {
    padding: 0 15px;
  }

  .character-thumb {
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export default CharacterSliderWrapper;
