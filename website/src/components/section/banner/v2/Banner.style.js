import styled from "styled-components";
import bannerBg from "../../../../assets/images/nft/v2_banner_bG.png";

const BannerStyleWrapper = styled.section`
  background: url(${bannerBg});
  width: 100%;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 192px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .f-nft_v2_baner_content {
    margin-top: 135px;
    position: relative;
    .banner-emot {
      display: block;
      text-align: center;
      margin-bottom: 20px;
    }
    h2 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 60px;
      line-height: 60px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 29px;
      position: relative;
      z-index: 2;
      span {
        color: #ff004c;
      }
    }
    h3 {
      font-size: 40px;
      line-height: 65px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      position: relative;
      margin: 0;
      z-index: 2;
    }

    span {
      display: inline-block;
    }

    .f-nft_v2_timer {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15px;
      z-index: 2;
      h4 {
        font-size: 40px;
        line-height: 65px;
        text-align: center;
        text-transform: uppercase;
        color: #ffffff;
        margin: 0;
      }
    }

    /* timer  */
    .root-react-component-countdown-timer {
      line-height: 65px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
      .countBox {
        font-family: "Bakbak One";
        font-size: 40px !important;
        display: flex;
        flex-direction: row-reverse;
        column-gap: 10px;

        .split{
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .f-nft_v2_baner_buttons {
      margin-top: 41px;
      button {
        margin: 0 auto;
      }
    }

    .v2_baner_stars {
      top: -80px;
      height: 499px;
    }
  }

  @media only screen and (max-width: 991px) {
    padding-bottom: 80px;

    .f-nft_v2_baner_content {
      h2 {
        font-size: 50px;
      }

      h3 {
        font-size: 35px;
      }

      .f-nft_v2_timer {
        h4 {
          font-size: 35px;
        }
      }
    }
  }

  @media only screen and (max-width: 575px) {
    .f-nft_v2_baner_content {
      h2 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 21px;
      }

      .f-nft_v2_timer {
        h4 {
          font-size: 21px;
        }
      }
    }

    .root-react-component-countdown-timer {
      .countBox {
        font-size: 21px !important;
      }
    }
  }
`;

export default BannerStyleWrapper;
