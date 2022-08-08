import styled from "styled-components";

const FAQStyleWrapper = styled.section`
  padding-bottom: 120px;
  padding-top: 130px;

  .faq-title {
    width: 70%;
    margin: 0 auto;
  }

  .f-nft_faq_content {
    max-width: 770px;
    width: 100%;
    margin: auto;
    position: relative;
  }

  .f-nft_faq_questions {
    margin-top: 57px;
    position: relative;
    .faq_bear_img {
      position: absolute;
      top: 80px;
      right: -163px;
      z-index: 2;
    }

    .faq_questions {
      position: relative;
      z-index: 1;

      .accordion__item + .accordion__item {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
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
      color: rgba(255, 255, 255, 0.8);
      height: 76px;
      padding: 0 29px;
      font-size: 24px;
      line-height: 34px;
      margin-bottom: 0px;
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
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

  @media only screen and (max-width: 991px) {
    .f-nft_faq_questions {
      .faq_bear_img {
        display: none;
      }
    }

    .accordion__header {
      h5 {
        font-size: 18px;
        line-height: 28px;
      }
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
    .faq-title {
      width: 80% !important;
    }
    .accordion__header {
      h5 {
        font-size: 18px;
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .faq-title {
      h2 {
        font-size: 15px;
      }
      width: 100% !important;
    }
  }
`;

export default FAQStyleWrapper;
