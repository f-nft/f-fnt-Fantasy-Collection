import styled from "styled-components";

const RoadMapStyleWrapper = styled.section`
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  .v1_roadmap_divider {
    width: 100%;
    margin-top: 53px;
    img {
      width: 100%;
    }
  }

  .v1_roadmap_contents_inner {
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: grab;
  }

  .v1_roadmap_contents {
    margin-top: 33px;
  }

  .v1_roadmap_contents_text {
    .roadmap_step {
      display: flex;
      column-gap: 10px;
      align-items: center;
      h3 {
        font-family: "Bakbak One";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;
        text-transform: uppercase;
        color: #8A2BE2;
        margin-bottom: 0;
      }
    }

    h4 {
      font-family: "Bakbak One";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 34px;
      color: #ffffff;
      margin-bottom: 24px;
    }

    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: rgba(255, 255, 255, 0.8);
      max-width: 270px;
      margin-bottom: 0;
    }
  }

  .f-nft_roadmap_mass_gard {
    position: absolute;
    right: 0px;
    top: 50%;
    z-index: 0;
  }

  @media only screen and (max-width: 991px) {
    padding-bottom: 80px;

    @media only screen and (max-width: 767px) {
      .v1_roadmap_contents_text {
        p {
          max-width: 100%;
        }
      }
    }
  }
`;

export default RoadMapStyleWrapper;
