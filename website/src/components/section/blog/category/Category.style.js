import styled from "styled-components";

const CategoryWrapper = styled.div`
  .category_list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    a {
      transition: 0.4s;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);

      span {
        margin-left: 7px;
      }
      &:hover {
        color: #ffffff;
      }
    }
  }
`;

export default CategoryWrapper;
