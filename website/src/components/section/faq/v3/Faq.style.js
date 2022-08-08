import styled from "styled-components";

const FAQStyleWrapper = styled.section`
  position: relative;
  padding-bottom: 130px;

  .f-nft_title_text {
    font-family: "Bakbak One";
    color: #fff;
    margin-top: 50px;
    span {
      display: block;
      a {
        text-decoration: none;
        color: #00fca1;
        padding-left: 10px;
        font-family: 'Bakbak One';
      }
    }
  }

  .f-nft_faq_content {
    width: 100%;
    margin: auto;
    position: relative;
  }

  .f-nft_faq_questions {
    position: relative;

    .faq_questions {
      position: relative;
      z-index: 1;

      .accordion__item + .accordion__item {
        margin-top: 10px;
      }
    }
  }
  .accordion__item {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
  }
  .accordion__header {
    h5 {
      display: flex;
      align-items: center;
      height: 76px;
      margin-bottom: 0px;
      padding: 0 29px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 24px;
      line-height: 34px;
      text-transform: none;
    }
  }

  .accordion__body {
    p {
      padding: 0px 48px 24px 29px;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 0px;
      max-width: 100%;
    }
  }

  .faq_bg_wattermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }

  @media only screen and (max-width: 991px) {
    .accordion__header {
      h5 {
        font-size: 18px;
        line-height: 28px;
      }
    }
  }

  @media only screen and (max-width: 667px) {
    .section_title {
      width: 70%;
    }
    .f-nft_title_text {
      margin: 30px 0 57px 0;
    }
  }

  @media only screen and (max-width: 500px) {
    .accordion__header {
      h5 {
        font-size: 20px;
        line-height: 25px;
      }
    }

    .accordion__body {
      p {
        font-size: 14px;
        line-height: 25px;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .accordion__header {
      h5 {
        font-size: 18px;
      }
    }
  }
`;

export default FAQStyleWrapper;
