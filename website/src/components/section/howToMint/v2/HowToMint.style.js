import styled from "styled-components";

const HowToMintWrapper = styled.section` 
    padding-bottom: 100px;
    margin-top: 0; 

  .how_to_mint_container {
    position: relative;

    .how_to_mint_shadow {
      position: absolute;
      top: -370px;
      left: -130px;
      max-width: 687px;
      width: 100%;
      height: 547px;
      z-index: 0;
    }

    .how_to_mint_content {
      position: relative;
      z-index: 1;

      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        li {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          h4 {
            font-family: "Bakbak One";
            font-style: normal;
            font-weight: 400;
            font-size: 100px;
            line-height: 140px;
            text-transform: uppercase;
            color: transparent;

            &.green {
              -webkit-text-stroke: 1px rgba(0, 255, 163, 0.7);
            }
            &.blue {
              -webkit-text-stroke: 1px rgba(88, 101, 242, 0.7);
            }
            &.yellow {
              -webkit-text-stroke: 1px rgba(255, 230, 0, 0.7);
            }
            &.red {
              -webkit-text-stroke: 1px rgba(255, 0, 76, 0.7);
            }
          }

          p {
            font-family: "Bakbak One";
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 40px;
            color: #ffffff;
            max-width: 148px;
            width: 100%;
            margin-left: 35px;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    .how_to_mint_container {
      .how_to_mint_content {
        ul {
          li {
            p {
              margin-left: 20px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    padding-bottom: 50px;
    .how_to_mint_container {
      .how_to_mint_content {
        ul {
          li {
            h3 {
              font-size: 35px;
            }
            h4 {
              font-size: 65px;
              line-height: 95px;
            }
            p {
              font-size: 18px;
              line-height: 27px;
              margin-left: 15px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .how_to_mint_container {
      .how_to_mint_content {
        ul {
          flex-wrap: wrap;
          li {
            width: 50%;
            p {
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .how_to_mint_container {
      .how_to_mint_content {
        ul {
          flex-wrap: nowrap;
          flex-direction: column;
          li {
            width: 100%;
          }
        }
      }
    }
  }
`;

export default HowToMintWrapper;
