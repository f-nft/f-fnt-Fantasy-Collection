import styled, { keyframes } from "styled-components"; 

const rotate = keyframes`
        0% {
    transform: rotate(0deg); 
  }
  100% {
    transform: rotate(360deg); 
  }  
`;

const CTAStyleWrapper = styled.section`
  position: relative;
  background: #10171d;
  padding: 75px 0;

  .f-nft_cta_title {
    position: relative;
    z-index: 1;

    h3 {
      font-size: 48px;
      line-height: 67px;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 0;
    }
  }

  .join_comunity_btns {
    display: flex;
    column-gap: 30px;
  }

  /* particles */
  .cta_particles {
    .star_1 {
      position: absolute;
      left: 27%;
      bottom: 35px;
    }

    .star_2 {
      position: absolute;
      top: 40px;
      left: 12%;
    }
    .star_3 {
      position: absolute;
      right: 15%;
      top: 50px;
    }
    .star_4 {
      position: absolute;
      top: 70px;
      right: 47%;
    }
    .star_5 {
      position: absolute;
      top: 70px;
      right: 32%;
    }
    .star_6 {
      position: absolute;
      right: 20%;
      bottom: 55px;
    }
    .star_7 {
      position: absolute;
      right: 12%;
      bottom: 40px;
    }

    .particle_rotated {
      animation: ${rotate} 30s linear infinite;
    }
  }

  /* background shape  */

  .bg-shape {
    position: absolute;

    &.shape-left {
      left: 0;
    }

    &.shape-top {
      top: 0;
    }
    &.shape-bottom {
      bottom: 0;
    }

    &.shape-right {
      right: 0;
      transform: rotate(90deg);
    }
  }

  @media only screen and (max-width: 768px) {
    .join_comunity_btns {
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 667px) {
    .f-nft_cta_title {
      h3 {
        font-size: 40px;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 100px 0;
    .f-nft_cta_title {
      h3 {
        font-size: 32px;
        line-height: 1.6;
      }
    }

    .join_comunity_btns {
      justify-content: center;
      button {
        img {
          height: 16px;
        }

        .shape-left {
          left: 3px;
        }
        .shape-right {
          right: 3px;
        }
      }
    }
  }

  @media only screen and (max-width: 360px) {
    .join_comunity_btns {
      flex-direction: column;
      row-gap: 15px;
      button {
        width: 170px;
        height: 50px;
      }
    }
  }
`;

export default CTAStyleWrapper;
