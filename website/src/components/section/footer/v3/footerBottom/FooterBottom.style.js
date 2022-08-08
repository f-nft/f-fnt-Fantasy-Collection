import styled from "styled-components";

const FooterBottomStyleWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  .footer_bottom_content {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer_shapes_left {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    z-index: 0;
  }
  .footer_shapes_right {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    z-index: 0;
  }
  .footer_menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100px;
    position: relative;
    z-index: 1;
  }
  .bottom_footer_left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;

    .copyright_text {
      color: rgba(255, 255, 255, 0.8);
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 40px;
    }
  }
  .bact_to_top_btn {
    display: flex;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  .bottom_footer_right {
    max-width: 394px;
    width: 100%;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin: 0 0 0 auto;
      padding: 0;
      li {
        &:hover {
          a {
            color: #ffffff;

            img {
              opacity: 1;
            }
          }
        }
      }

      a {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        font-size: 16px;
        line-height: 40px;
        text-align: right;
        transition: 0.4s;
        text-decoration: none;
        img {
          width: 20px;
          opacity: 0.7;
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    padding: 50px 0px;

    .top-footer-content {
      .footer_image {
        padding-right: 55px;
      }
    }

    .bottom_footer_left {
      .copyright_text {
        text-align: center;
      }
    }

    .footer_shapes_right,
    .footer_shapes_left {
      display: none;
    }
    .footer_menu {
      flex-direction: column-reverse;
      row-gap: 20px;
    }
  }
`;

export default FooterBottomStyleWrapper;
