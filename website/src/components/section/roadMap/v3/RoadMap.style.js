import styled from "styled-components";
import roadMapBg from "../../../../assets/images/bg/roadmap3.png";
const RoadMapStyleWrapper = styled.section`
  background-repeat: no-repeat;
  padding-bottom: 60px;
  background-position: left top 220px;
  position: relative;

  &::before {
    position: absolute;
    background: url(${roadMapBg});
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    left: 0px;
    bottom: -350px;
    content: "";
  }

  .v3_roadmap_content {
    padding-top: 53px;
    row-gap: 20px;
  }

  .f-nft_roadmap_item {
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .f-nft_roadmap_content {
    width: calc(100% - 385px);
    height: 170px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 20px 20px;
  }

  .roadmap_parcentage {
    width: 215px;
    height: 170px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Bakbak One";
    color: #343a3e;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    z-index: 1;
    font-size: 69px;

    &::before {
      position: absolute;
      left: auto;
      top: auto;
      width: 170px;
      height: 130px;
      background: #1d242b;
      content: "";
      z-index: -1;
    }
    .parcentage {
      margin-top: 35px;
      font-size: 48px;
    }
  }

  .f-nft_roadmap_text {
    position: relative;
    z-index: 9;
    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }

  .roadmap_heading {
    h5 {
      margin-bottom: 15px;
      color: #fff;
      font-size: 24px;
      transition: 0.4s;
    }

    img {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .roadmap_img {
    display: flex;
    width: 170px;
    height: 170px;
    justify-content: center;
    align-items: center;
    background: #11181e;
    margin-left: 20px;
  }

  @media only screen and (max-width: 1024px) {
    .f-nft_roadmap_item {
      height: auto;
    }
    .f-nft_roadmap_content {
      height: 200px;
    }

    .roadmap_parcentage,
    .roadmap_img {
      height: 199px;
    }
  }

  @media only screen and (max-width: 992px) {
    .f-nft_roadmap_item {
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
    }

    .f-nft_roadmap_content {
      height: auto;
      width: calc(100% - 190px);
      flex-flow: nowrap;
    }

    .roadmap_parcentage {
      order: 1;
      margin-top: 20px;
      width: 100%;

      &::before {
        width: 90%;
      }
    }

    .roadmap_img {
      position: absolute;
      height: 196px;
      width: 170px;
      right: 0px;
      top: 0;
    }
  }

  @media only screen and (max-width: 740px) {
    .roadmap_img {
      height: 252px;
    }
  }
  @media only screen and (max-width: 480px) {
    .f-nft_roadmap_item {
      column-gap: 0;
      row-gap: 20px;
    }

    .f-nft_roadmap_text {
      h5 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
    }

    .roadmap_img {
      position: relative;
      width: 50%;
      height: 170px;
      margin-left: 0;
    }

    .roadmap_parcentage {
      width: 50%;
      height: 170px;
      margin-top: 0;
      order: inherit;
      &::before {
        width: 100%;
        height: 100%;
      }
    }

    .f-nft_roadmap_content {
      width: 100%;
      order: 1;
    }
  }

  @media only screen and (max-width: 375px) {
    .roadmap_parcentage {
      font-size: 65px;
    }
  }
`;

export default RoadMapStyleWrapper;
