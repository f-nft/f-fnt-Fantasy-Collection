import styled, { keyframes } from "styled-components";
import sectionBgImage from "../../../../assets/images/bg/h1_banner_bg.png";

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const BannerV1Wrapper = styled.section`
  background: url(${sectionBgImage});
  min-height: 900px;
  width: 100%;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  padding-top: 179px;
  
  .f-nft_v1_baner_left {
    margin-top: 200px;
    max-width: 500px;
    width: 100%;
    min-height: 550px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 500;
      font-size: 60px;
      line-height: 80px;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: -5px;
    }

    h2 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 50px;
      line-height: 80px;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: -5px;
    }

    h3 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 60px;
      text-transform: uppercase;
      color: #ffffff;
    }

    .banner_buttons {
      display: fixed;
      column-gap: 5px;
      margin-top: 1px;
      align-items: center;
      justify-content: center;
      z-index: 1;

    }

    .coin-info {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      span {
        font-family: "Bakbak One";
        font-size: 16px;
        line-height: 18px;
        text-transform: uppercase;
        color: rgba(255, 255, 33, 0.8);

        & .highlighted {
          color: #ffe600;
        }
      }
    }
  }

  .f-nft_v1_baner_right {
    max-width: 500px;
    width: 100%;
    margin-left: auto;
    margin-top: 200px;

    .mint_live_circle_sect {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      width: 140px;
      border-radius: 50%;
      border: none;
      position: absolute;
      top: -65px;
      left: -65px;
      z-index: 1;

      .mint_live_circle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        .mint_live_text {
          animation: ${rotate} 20s linear infinite;
          position: absolute;
        }
      }
    }

    .f-nft_v1_baner_right_img_sect {
      position: relative;
      width: 100%;
      height: 550px;
      display: flex;
      align-items: center;
      justify-content: center;

      .f-nft_v1_baner_right_img_bg {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .f-nft_v1_baner_right_img {
        position: relative;
        z-index: 1;
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    .f-nft_v1_baner_left {
      h2 {
        font-size: 50px;
        line-height: 65px;
      }

      h3 {
        font-size: 34px;
        line-height: 38px;
      }

      .baner_buttons {
        margin-top: 40px;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .f-nft_v1_baner_left {
      margin-top: 0px;
      justify-content: flex-start;
    }

    .f-nft_v1_baner_right {
      margin: 70px auto;
      padding: 0px 68px;
      max-width: 568px;
      width: 100%;

      .f-nft_v1_baner_right_img {
        width: 55%;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .f-nft_v1_baner_left {
      h2 {
        font-size: 40px;
        line-height: 20px;
        margin-bottom: 5px;
      }

      h3 {
        font-size: 28px;
        line-height: 38px;
        
      }

      .banner_buttons{
        margin-top: 25px;
      }
    }

    .f-nft_v1_baner_right {
      padding-right: 0px;

      .f-nft_v1_baner_right_img_sect {
        height: 480px;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .f-nft_v1_baner_left {
      h2 {
        font-size: 37px;
      }

      h3 {
        font-size: 22px;
      }

      .coin-info {
        font-size: 14px;
        line-height: 29px;
      }

      .banner_buttons{
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        
            .f-nft-btn + .f-nft-btn {
                margin-top: 20px;
            }
        }
    }

    .f-nft_v1_baner_right {
      padding-left: 34px;

      .mint_live_circle_sect{
        height: 90px;
        width: 90px;
        top: -36px;
        left: -40px;
    }
    }
  }

  @media (max-width: 375px) {
    .f-nft_v1_baner_left {
      h2 {
        font-size: 35px;
      }
      h3 {
        font-size: 22px;
      }
    }
  }

  @media (max-width: 360px) {
    .f-nft_v1_baner_left {
      margin-top: 100px;
      h2 {
       padding-top: 10px;
        font-size: 34px;
      }
      .coin-info {
        font-size: 13px;
      }
    }
  }

  .modal {
    position: fixed;
    top: 150px;
    left: 150px;
    width: 50%;
    height: 50%;
    background: greenyellow;
  }
  
  @media screen and (max-height: 450px) {
    .overlay a {font-size: 20px}
    .overlay .closebtn {
      font-size: 40px;
      top: 15px;
      right: 35px;
    }
  }

`;

export default BannerV1Wrapper;
