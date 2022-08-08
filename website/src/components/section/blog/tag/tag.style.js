import styled from "styled-components";

const TagStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 10px;
  row-gap: 10px;

  a {
    font-family: "Inter";
    display: inline-block;
    background: #1d242a;
    padding: 15px 15px;
    font-style: italic;
    font-size: 14px;
    text-transform: capitalize;
  }
`;

export default TagStyleWrapper;
