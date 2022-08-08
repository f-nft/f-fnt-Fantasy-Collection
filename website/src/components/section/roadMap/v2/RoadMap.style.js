import styled from "styled-components";

const RoadMapStyleWrapper = styled.section`
  padding-top: 132px;
  padding-bottom: 146px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  .v2_roadmap_divider {
    position: absolute;
    top: 0px;
    height: 100%;
    img {
      height: 100%;
    }
  }

  .v2_roadmap_card_list {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 52px;

    /* devider */
    .v2_roadmap_divider {
      position: absolute;
      top: 0px;
    }

    .v2_roadmap_card_item {
      position: relative;
      width: 95%;

      &.v2_roadmap_card_item_even {
        padding: 30px 0px 0px 30px;
        margin-top: 80px;
        margin-left: auto;

        /* corner square shape */
        .v2_roadmap_card_box {
          left: 0px;
          top: 0px;
        }
      }
      &.v2_roadmap_card_item_odd {
        padding: 30px 30px 0px 0px;
        margin: 0 auto 80px 0;

        /* corner square shape */
        .v2_roadmap_card_box {
          right: 0px;
          top: 0px;
        }
      }
      /* corner square shape */
      .v2_roadmap_card_box {
        background: rgba(255, 255, 255, 0.05);
        height: 30px;
        width: 30px;
        position: absolute;
      }

      .v2_roadmap_card_content {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 30px 40px;

        h3 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 24px;
          line-height: 34px;
          color: #8A2BE2;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        p {
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
      }
    }

    .row {
      &:nth-child(2) {
        .col-md-6 {
          .v2_roadmap_card_item_even {
            margin-top: 100px;
          }
        }
      }
    }
  }
  /* bg image  */
  .f-nft_v2_roadmap_mass_gard {
    position: absolute;
    bottom: -400px;
    text-align: center;
    width: 100%;
  }

  @media only screen and (max-width: 767px) {
    .v2_roadmap_card_list {
      .v2_roadmap_divider {
        display: none;
      }
      .v2_roadmap_card_item {
        margin: 0px;
        width: 100%;
        margin-bottom: 80px;
        &.v2_roadmap_card_item_even {
          margin-top: 0px;
        }
      }

      .row {
        &:nth-child(2) {
          .col-md-6 {
            .v2_roadmap_card_item_even {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
`;

export default RoadMapStyleWrapper;
