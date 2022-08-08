import styled from "styled-components";
import teamBg from "../../../../assets/images/bg/v1_team_bg.png";

const TeamStyleWrapper = styled.section`
  background: rgba(25, 35, 40, 0.5);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;

  .v1_team_overlay {
    background: url(${teamBg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    padding: 50px 0 50px;
  }

  .f-nft_team_content {
    margin-top: 53px;
    position: relative;
    z-index: 1;
    .row {
      row-gap: 30px;
    }
  }
`;

export default TeamStyleWrapper;
