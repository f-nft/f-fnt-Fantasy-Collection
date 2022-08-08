import sectionTitleShape from "../../assets/images/icon/title_shapes.svg";
import sectionTitleShape2 from "../../assets/images/icon/title_shapes2.svg";

import SectionTitleWrapper from "./SectionTitle.style";

const SectionTitle = ({ title, subtitle, isCenter, ...props }) => {
  return (
    <SectionTitleWrapper {...props}>
      {subtitle && (
        <h2>
          {isCenter ? <img src={sectionTitleShape2} alt="" /> : ""}
          {subtitle}{" "}
          <img src={sectionTitleShape} alt="f-nft nft section title shape" />{" "}
        </h2>
      )}
      {title && <h3>{title}</h3>}
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
