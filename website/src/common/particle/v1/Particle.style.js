import styled, {keyframes} from "styled-components";

const star1 = keyframes`
        0%,
        100% {
            top: 0%;
        }

        50% {
            top: 3%;
    }
`;
const star2 = keyframes`
        0%,
    100% {
        top: 20%;
    }

    50% {
        top: 23%;
    }
`;
const star6 = keyframes`
      0%,
    100% {
        bottom: 15%;
    }

    50% {
        bottom: 18%;
    }
`;
const star7 = keyframes`
      0%,
    100% {
        bottom: 0%;
    }

    50% {
        bottom: 3%;
    }
`;
const star9 = keyframes`
      0%,
    100% {
        bottom: 14%;
    }

    50% {
        bottom: 17%;
    }
`;

const ParticleStyleWrapper = styled.div`
  height: 356px;
  width: 100%;
  position: absolute;
  top: -150px;
  z-index: 0;
  .particle_stars {
    position: relative;
    height: 100%;
    /* width: 100%; */
    span {
      position: absolute;
    }
    .star_1 {
      top: 0%;
      right: 5%;
      animation: ${star1} 4s infinite;
    }
    .star_2 {
      top: 20%;
      left: 0%;
      animation: ${star2} 5s infinite;
    }
    .star_3 {
      top: 34%;
      left: 20%;
      /* animation: star3 4s infinite; */
    }
    .star_4 {
      top: 50%;
      left: 44%;
      /* animation: star4 4s infinite; */
    }
    .star_5 {
      bottom: 26%;
      right: 27%;
      /* animation: star5 4s infinite; */
    }
    .star_6 {
      bottom: 15%;
      right: 10%;
      animation: ${star6} 3.5s infinite;
    }
    .star_7 {
      bottom: 0px;
      left: 10%;
      animation: ${star7} 3.5s infinite;
    }

    .star_8 {
      top: 10%;
      right: 20%;
    }

    .star_9 {
      bottom: 15%;
      right: 38%;
      animation: ${star9} 4.5s infinite;
    }
    .star_10 {
      top: 25%;
      left: 35%;
    }

    .star_11 {
      bottom: 18%;
      left: 20%;
    }
    .star_12 {
      bottom: 35%;
      left: 30%;
    }
  }
`;

export default ParticleStyleWrapper;
