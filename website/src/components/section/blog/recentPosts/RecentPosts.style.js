import styled from "styled-components";

const RecentPostsStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 40px;
  .recent_post_item {
    display: flex;
    align-items: center;
    column-gap: 15px;
    img {
      height: 100px;
      width: 100px;
      object-fit: cover;
    }

    span {
      margin-bottom: 10px;
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
    }

    a {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 475px) {
    .recent_post_item {
      span {
        margin-bottom: 0;
      }

      a {
        font-size: 15px;
      }

      img {
        width: 70px;
        height: 70px;
      }
    }
  }
`;

export default RecentPostsStyleWrapper;
