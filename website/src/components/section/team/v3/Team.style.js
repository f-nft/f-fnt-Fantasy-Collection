import styled from "styled-components";

const TeamStyleWrapper = styled.section`
  background: rgba(25, 35, 40, 0.5);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;

  .v1_team_overlay {
    padding: 113px 0 140px 0;
    position: relative;
    width: 100%;
    height: 100%;
    background: #040c12;
    z-index: 1;
  }

  .f-nft_team_content {
    margin-top: 53px;
    position: relative;
    z-index: 1;
    .row {
      row-gap: 30px;
    }
  }

  @media only screen and (max-width: 667px) {
    .v1_team_overlay {
      padding: 30px 0 100px 0;
    }
  }
`;

export default TeamStyleWrapper;
