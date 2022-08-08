import styled from "styled-components";
import AboutBG from "../../../../assets/images/bg/about-bg3.png";

const AboutStyleWrapper = styled.section`
  background: url(${AboutBG});
  background-size: cover;
  background-position: center top -50px;
  background-repeat: no-repeat;
  padding: 110px 0 80px 0;

  p {
    margin-bottom: 0;
  }

  .about_section_title {
    margin-bottom: 30px;
    h2 {
      color: #ffffff;
    }
  }

  /* right */
  .v1_about_us_right_text {
    margin-top: 46px;

    p {  
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.8);
      padding-bottom: 20px;
    }
  }

  .ab-content{
    display: flex;
  }

  .ab-item-box + .ab-item-box {
    margin-left: 30px;
  }

  .ab-item-box {
    padding: 20px 20px;
    background: #212027;

    .ab-text {
      margin-top: 20px;
      h5 {
        color: #fff;
        font-size: 24px;
        transition: 0.4s;
        margin: 0;

        img {
          margin-left: 10px;
        }
      }
    }
    span {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  /* left  */
  .about-left-item {
    padding-left: 45px;
  }

  @media only screen and (max-width: 1199px) {
    .v1_about_us_right_text {
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: 991px) {
    .about-left-item {
      padding-left: 0;
      margin-top: 30px;
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
  }

  @media only screen and (max-width: 480px) {
    .about-left-item {
      .ab-item-box + .ab-item-box {
        margin-top: 30px;
        margin-left: 0;
      }
      .ab-content {
        display: block;
        .ab-item-box {
          .author-thumbnail {
            width: 100%;
          }
        }
      }
    }
  }
`;

export default AboutStyleWrapper;
