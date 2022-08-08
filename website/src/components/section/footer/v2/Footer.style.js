import styled from "styled-components";
import footerBG from "../../../../assets/images/nft/v2_footer_bg.png";

const FooterStyleWrapper = styled.footer`
  padding-top: 105px;
  position: relative;

  &::before {
    position: absolute;
    background: url(${footerBG});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    content: "";
    height: 76%;
    width: 100%;
    bottom: 0px;
  }
`;

export default FooterStyleWrapper;
