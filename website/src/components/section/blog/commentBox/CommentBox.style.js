import styled from "styled-components";

const CommentBoxStyleWrapper = styled.div`
  color: #ffffff;
  margin-top: 60px;
  label,
  h4 {
    text-transform: uppercase;
  }

  .form-heading {
    margin-bottom: 40px;
    h4 {
      margin: 0 0 10px;
    }
    p {
      margin: 0;
    }
  }

  .input-button {
    margin-bottom: 40px;
    position: relative;
    padding-top: 40px;

    label {
      position: absolute;
      left: 0;
      top: 0;
      color: #ffffff;
      font-weight: 700;
      text-transform: uppercase;
    }

    input {
      background: transparent;
      width: 100%;
      border: 1px solid #2e2f3c;
      padding: 15px 20px;
      color: #fff;

      &:focus {
        outline: none;
      }
    }
  }
`;

export default CommentBoxStyleWrapper;
