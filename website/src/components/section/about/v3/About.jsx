import SectionTitle from "../../../../common/sectionTitle";

import data from "../../../../assets/data/about/dataV2";

import AboutStyleWrapper from "./About.style";

const About = () => {
  const { aboutDescription1, aboutDescription2, artists } = data;
  return (
    <AboutStyleWrapper id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="v1_about_us_right_sect">
              <SectionTitle title="ABOUT US" subtitle="THE STORY " />
              <div className="v1_about_us_right_text">
                <p>{aboutDescription1}</p>
                <p>{aboutDescription2}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-left-item">
              <SectionTitle
                subtitle="Meet The Artists"
                className="about_section_title"
              />
              <div className="ab-content">
                {artists?.map((item, i) => (
                  <div key={i} className="ab-item-box mr-30">
                    <img
                      className="author-thumbnail"
                      src={item.thumb}
                      alt="f-nft nft about"
                    />
                    <div className="ab-text pt-20">
                      <h5>
                        {item.name}
                        <img src={item.icon} alt="f-nft nft about icon" />
                      </h5>
                    </div>
                    <span>{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutStyleWrapper>
  );
};

export default About;
