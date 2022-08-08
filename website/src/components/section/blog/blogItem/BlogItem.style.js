import styled from "styled-components";

const BlogItemStyleWrapper = styled.article`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Bakbak One";
  a,
  p,
  span {
    color: inherit;
    display: block;
  }
  a,
  span {
    font-family: "Bakbak One";
  }

  .blog_thumb {
    overflow: hidden;
    img {
      transition: all 0.4s;
    }
    &:hover {
      img {
        transform: scale(106%);
      }
    }
  }
  .blog_content {
    padding: 32px 30px;
    background: #11181e;
    .blog_meta {
      display: flex;
      align-items: center;
      column-gap: 6px;
      text-transform: uppercase;
      margin-bottom: 10px;
      .category_title {
        color: #8A2BE2;
      }

      .time_stamp {
        font-size: 14px;
      }
    }

    .blog_title {
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 15px;

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    p {
      font-weight: 500;
    }

    .blog_footer {
      color: #ffffff;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      a {
        text-transform: uppercase;
        transition: all 0.4s;

        &:hover {
          color: rgba(255, 255, 255, 0.7);
        }
      }

      .comment_icon {
        display: flex;
        align-items: center;
        column-gap: 10px;

        svg {
          font-size: 18px;
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .blog_content {
      .blog_title {
        font-size: 20px;
      }
    }
  }
`;

export default BlogItemStyleWrapper;
