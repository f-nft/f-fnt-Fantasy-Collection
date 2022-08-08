import styled from "styled-components";
import quoteBg from "../../../../assets/images/blog/quote.png";
const BlogDetailsStyleWrapper = styled.div`
  .blog_post_details_wrapper {
    padding-top: 60px;
    padding-bottom: 140px;
  }
  color: rgba(255, 255, 255, 0.8);
  p {
    font-family: "Inter";
    font-weight: 500;
    font-size: 16px;
    margin: 20px 0;
  }
  a {
    display: inline-block;
    font-family: "Bakbak One";
    color: #ffffff;
    transition: all 0.4s;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #ffffff;
    margin: 40px 0 25px;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }

  .blog_post_meta {
    display: flex;
    align-items: center;
    column-gap: 50px;
    text-transform: uppercase;
    margin: 50px 0 10px;
    a,
    span {
      font-family: "Bakbak One";
      display: flex;
      align-items: center;
      column-gap: 15px;
      img {
        height: 20px;
      }
      svg {
        font-size: 1.2rem;
      }
    }
  }

  .post_title {
    width: 90%;
  }

  blockquote,
  .blockquote {
    display: flex;
    align-items: center;
    position: relative;
    margin: 30px 0 20px;
    p {
      font-style: italic;
      font-weight: 500;
      font-size: 22px;
      line-height: 36px;
      padding-left: 65px;
      color: #ffffff;
      margin: 0;
    }

    &::before {
      position: absolute;
      height: 86px;
      width: 20px;
      left: 0;
      top: auto;
      background: url(${quoteBg});
      background-size: contain;
      background-repeat: no-repeat;
      content: "";
    }
  }

  .blog_description {
    img {
      margin: 25px 0;
    }

    ul {
      font-weight: 500;
      li {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 25px;
        &::before {
          position: absolute;
          height: 8px;
          width: 8px;
          left: 0;
          top: 50%;
          border-radius: 50%;
          background-color: #3a3b48;
          content: "";
          transform: translate(0, -50%);
        }

        span {
          margin-right: 5px;
        }
      }

      li + li {
        margin-top: 20px;
      }
    }
  }

  /* tags and share wrapper  */
  .post_tags_list {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 30px 0 40px;

    a {
      display: flex;
      align-items: center;
      column-gap: 10px;
      text-transform: uppercase;
    }

    .tag_items {
      padding-right: 130px;
    }
  }

  .related_posts_wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    row-gap: 30px;
    column-gap: 30px;

    .related_post_item {
      display: flex;
      align-items: center;
      column-gap: 15px;
      background: #11181e;
      row-gap: 15px;
      font-size: 18px;
      padding: 10px 25px 10px 10px;
      .related_post__title {
        display: flex;
        flex-direction: column;

        span {
          font-size: 14px;
          color: #8A2BE2;
          text-transform: uppercase;
        }
      }

      &.next {
        padding: 10px 10px 10px 25px;
        flex-direction: row-reverse;
        .related_post__title {
          text-align: right;
        }
      }
    }
  }

  .comment_section_title {
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0;
  }

  @media (max-width: 1024px) {
    .related_posts_wrapper {
      .related_post_item {
        padding-right: 18px;

        &.next {
          padding-left: 18px;
        }

        font-size: 16px;
      }
    }
  }

  @media (max-width: 667px) {
    .post_title {
      width: 100%;
    }
    blockquote,
    .blockquote {
      &::before {
        top: 0;
      }
    }

    .related_posts_wrapper {
      flex-direction: column;
      justify-content: center;
      .related_post_item {
        width: 100%;
      }
    }
  }

  @media (max-width: 540px) {
    .post_tags_list {
      flex-direction: column-reverse;
      row-gap: 20px;
      .tag_items {
        padding-right: 0;
      }

      .share_butn {
        margin-left: 0;
      }
    }
  }
`;

export default BlogDetailsStyleWrapper;
