import styled from "styled-components";

const CharacterStaticStyleWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #08171f;
  padding: 50px 15px;
  position: relative;
  z-index: 1;

  .character_item_wrap {
    width: 25%;
    height: 170px;
    display: flex;
    .character_item_blank,
    .character_item_thumb {
      width: 50%;
      height: 100%;
    }
    .character_item_thumb {
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default CharacterStaticStyleWrapper;
