import styled from "styled-components";
import AboutBG from "../../../../assets/images/bg/h1_about_us_bg.png";

const AboutStyleWrapper = styled.section`
  background: url(${AboutBG});
  background-size: cover;
  background-position: center left;
  background-repeat: no-repeat;
  min-height: 901px;
  padding-top: 110px;
  p {
    margin-bottom: 0;
  }

  /* right */
  .v1_about_us_right_text {
    margin-top: 46px;

    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.8);
      padding-bottom: 20px;
    }
  }

  .v1_about_us_left_sect {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 560px;
    width: 100%;

  }

    .v1_about_us_img1 {
      max-width: 230px;
      height: 230px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin: auto;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
    }

    .v1_about_us_img_card1 {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      height: 328px;
      width: 270px;
      padding: 24px;
      position: absolute;
      top: 50px;
      left: 30px;
      transform: rotate(-15deg);
      z-index: 1;
    }

    .v1_about_us_img1_shapes {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
    }

    .v1_about_us_img1_shapes_left {
      .shape_1 {
        background: rgba(255, 255, 255, 0.1);
        height: 15px;
        width: 115px;
      }

      .shape_2 {
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.1);
        height: 8px;
        width: 75px;
      }
    }

    .v1_about_us_img1_shapes_right {
      .shape_3 {
        background: rgba(255, 255, 255, 0.1);
        height: 28px;
        width: 28px;
        border-radius: 50%;
      }
    }

    .v1_about_us_img_card2 {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      height: 279px;
      width: 230px;
      padding: 20px;
      position: absolute;
      top: 150px;
      right: 20px;
      transform: rotate(15deg);
      z-index: 0;
    }

    .v1_about_us_img2 {
      max-width: 195px;
      height: 195px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
    }

    .v1_about_us_img2_shapes {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
    }

    .v1_about_us_img2_shapes_left {
      .shape_1 {
        background: rgba(255, 255, 255, 0.1);
        height: 13px;
        width: 98px;
      }

      .shape_2 {
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.1);
        height: 7px;
        width: 64px;
      }

      .shape_3 {
        background: rgba(255, 255, 255, 0.1);
        height: 24px;
        width: 24px;
        border-radius: 50%;
      }
    } 

  /* list */

  .about_us_text_card_sect {
    margin-top: 120px;
  }
    .about_us_text_card {
      background: rgba(255, 255, 255, 0.05);
      width: 100%;
      min-height: 220px;
      padding: 35px;

      h3 {
        font-family: "Bakbak One";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 40px;
        color: #ffffff;

        img {
          padding-right: 10px;
        }

        span {
          margin-right: 13px;
        }
      }

      p {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        max-width: 289px;
        color: rgba(255, 255, 255, 0.8);
        padding-top: 18px;
      }
    }
  

  @media only screen and (max-width: 1199px) {
    .v1_about_us_right_text {
      margin-top: 30px;
    }
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .v1_about_us_img_card1 {
      left: 10px;
      top: 75px;
      height: 295px;
      width: 240px;
    }

    .v1_about_us_img_card2 {
      height: 255px;
      width: 205px;
    }

    .v1_about_us_img2 {
      height: 170px;
    }
    .v1_about_us_img1 {
      height: 190px;
    }

    .about_us_text_card {
      h3 {
        font-size: 20px;
        line-height: 40px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        span {
          max-width: 40px;
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    padding-top: 65px;

    .about_us_text_card_sect {
      margin-top: 60px;

      &.md-mt-0 {
        margin-top: 0;
      }
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .v1_about_us_img_card1 {
      left: 10px;
      top: 75px;
      height: 216px;
      width: 160px;
      padding: 16px;
    }

    .v1_about_us_img_card2 {
      height: 216px;
      width: 160px;
      padding: 16px;
    }

    .v1_about_us_img1 {
      height: 135px;
    }
    .v1_about_us_img2 {
      height: 135px;
    }

    .v1_about_us_img1_shapes_left {
      .shape_1 {
        height: 12px;
        width: 88px;
      }
    }
    .v1_about_us_img1_shapes_right {
      .shape_3 {
        height: 23px;
        width: 23px;
      }
    }

    .about_us_text_card {
      padding: 27px;
      h3 {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        font-size: 20px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .v1_about_us_img_card1,
    .v1_about_us_img_card2 {
      position: static;
    }

    .v1_about_us_left_sect{
        margin: 50px 0; 
    }

    .about_us_text_card {
      margin-bottom: 30px;

      p {
        max-width: 100%;
      }
    }
  }

  @media only screen and (max-width: 575px) {
    .v1_about_us_right_text {
      margin-top: 10px;
      p {
        font-size: 13px;
        line-height: 24px;
        padding-bottom: 10px;
      }
    }

    .v1_about_us_left_sect {
      max-width: 400px;
      margin: auto;
      min-height: 345px;
    }

    .v1_about_us_img_card1 {
      left: 10%;
      top: 75px;
      height: 216px;
      width: 160px;
      padding: 16px;
    }

    .v1_about_us_img_card2 {
      right: 10%;
      height: 216px;
      width: 160px;
      padding: 16px;
    }

    .v1_about_us_img1 {
      height: 135px;
    }
    .v1_about_us_img2 {
      height: 135px;
    }

    .v1_about_us_img1_shapes_left {
      .shape_1 {
        height: 12px;
        width: 88px;
      }
    }

    .v1_about_us_img1_shapes_right {
      .shape_3 {
        height: 23px;
        width: 23px;
      }
    }

    .v1_about_us_img2_shapes_left {
      .shape_1 {
        height: 12px;
        width: 88px;
      }
    }

    .v1_about_us_img2_shapes_right {
      .shape_3 {
        height: 23px;
        width: 23px;
      }
    }
  }

  @media (max-width: 375px) {
    .v1_about_us_left_sect {
      height: 480px;
    }
    .v1_about_us_img_card1 {
      left: 15px;
    }
    .v1_about_us_img_card2 {
      right: 15px;
      top: 245px;
    }

    .about_us_text_card {
      h3 {
        font-size: 20px;
        line-height: 40px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        span {
          max-width: 40px;
        }
      }
    }
  }
`;

export default AboutStyleWrapper;
