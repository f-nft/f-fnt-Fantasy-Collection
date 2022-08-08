import CTA from "../../cta/v1";
import FooterBottom from "../footerBottom/v1";

import FooterStyleWrapper from "./Footer.style";
const Footer = () => {
  return (
    <FooterStyleWrapper>
      <CTA />
      <FooterBottom />
    </FooterStyleWrapper>
  );
};

export default Footer;
