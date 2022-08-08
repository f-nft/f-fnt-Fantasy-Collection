import styled from "styled-components";
import footerBG from "../../../../assets/images/bg/v1_footer_bg.png";

const FooterStyleWrapper = styled.footer`
  background: url(${footerBG});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .f-nft_v1_main_footer {
    position: relative;
    min-height: 400px;
    width: 100%;

    .f-nft_v1_main_footer_overlay {
      background: linear-gradient(
        180deg,
        rgba(2, 15, 21, 0) 0%,
        rgba(17, 14, 20, 0.270833) 50.52%,
        #040c12 100%
      );
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
    }

    .three_charectre_img {
      text-align: center;
      padding-top: -350px;
      padding-bottom: 100px;
    }

    /* footer bottom */
    .footer_bottom {
      position: absolute;
      bottom: 0px;
      width: 100%;
      min-height: 100px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
    }

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

      .copiright_text {
        p {
          margin: 0 0 0 10px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          margin-bottom: 0;
        }
      }
    }
    .bact_to_top_btn {
      background: transparent;
      border: none;
      outline: none;
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
  }
  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .f-nft_v1_main_footer {
      .bottom_footer_right {
        ul {
          justify-content: right;
        }
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    .f-nft_v1_main_footer {
      .bottom_footer_right {
        ul {
          li + li {
            padding-left: 20px;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .f-nft_v1_main_footer {
      .bottom_footer_right {
        ul {
          justify-content: right;
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .f-nft_v1_main_footer {
      .bottom_footer_left {
        .copiright_text a {
          font-size: 14px;
          padding-left: 22px;
        }

        .footer_logo {
          max-width: 79px;
        }
      }

      .bottom_footer_right {
        max-width: 100px;
        ul {
          li + li {
            padding-left: 5px;
          }
          li {
            a {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .f-nft_v1_main_footer {
      .footer_bottom {
        min-height: 100px;
      }
      .footer_menu {
        padding: 20px 0px;
        flex-direction: column-reverse;
        padding-bottom: 40px;
      }

      .footer_shapes_left,
      .footer_shapes_right {
        display: none;
      }

      .bact_to_top_btn {
        position: absolute;
        bottom: 10px;
      }
      .bottom_footer_right {
        margin: 10px auto 10px auto;
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .f-nft_v1_main_footer {
      .bottom_footer_left {
        .copiright_text {
          margin-left: 26px;
        }
      }

      .footer_menu {
        row-gap: 12px;
      }
    }
  }
`;

export default FooterStyleWrapper;
