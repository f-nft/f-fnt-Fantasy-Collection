import SectionTitle from "../../../common/sectionTitle";
import data from "../../../assets/data/partnerData";
import PartnerStyledWrapper from "./Partner.style";

const Partner = () => {
  return (
    <PartnerStyledWrapper>
      <div className="our_partners_sect">
        <div className="container">
          <SectionTitle
            isCenter={true}
            subtitle="AS SEEN IN"
            title="Our Partners"
            className="text-center"
          />
          <div className="our_partnar_content">
            <ul>
              {data?.map((logo, i) => (
                <li key={i}>
                  <img src={logo} alt="" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PartnerStyledWrapper>
  );
};

export default Partner;
