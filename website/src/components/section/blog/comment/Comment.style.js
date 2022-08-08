import styled from "styled-components";
const CommentStyleWrapper = styled.div`
  margin-top: 60px;
  .comment_item {
    .commnet_inner {
      display: flex;
      column-gap: 15px;
      row-gap: 15px;
      background: #11181e;
      margin-bottom: 20px;
      padding: 30px 30px;

      .comment_author {
        display: flex;
        flex-direction: column;
        font-size: 1.25rem;
        font-family: "Bakbak One";

        span {
          font-size: 14px;
          font-family: "Inter";
          font-weight: 500;
        }
      }

      img {
        height: 50px;
        width: 50px;
      }

      .comment_body {
        p {
          margin-bottom: 15px;
        }

        .replay_btn {
          display: flex;
          align-items: center;
          font-family: "Inter";
          text-transform: uppercase;
          font-size: 14px;
          column-gap: 10px;
          img {
            height: 18px !important;
            width: 18px !important;
          }
        }
      }
    }

    &.replay_box {
      display: flex;
      justify-content: end;
      .commnet_inner {
        width: 85%;
      }
    }
  }
`;

export default CommentStyleWrapper;
