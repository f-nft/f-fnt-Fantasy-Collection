import styled from "styled-components";

const PaginationStyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;

  &.pagination_wrapper {
    margin-top: 40px;
  }

  a {
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 500;
    border: 1px solid #2e2f3c;
    transition: all 0.4s;

    svg {
      font-size: 1.3rem;
    }

    &:hover,
    &.active {
      background-color: #2e2f3c;
      color: #8A2BE2;
    }

    &.active {
      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export default PaginationStyleWrapper;
