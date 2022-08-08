import { FaDiscord } from "react-icons/fa";
import SectionTitle from "../../../../common/sectionTitle";
import Button from "../../../../common/button";
import data from "../../../../assets/data/socialProfile";

import hoverShape from "../../../../assets/images/icon/hov_shape_s.svg";
import particleShape1 from "../../../../assets/images/icon/star_1.svg";
import particleShape2 from "../../../../assets/images/icon/star_2.svg";
import particleShape3 from "../../../../assets/images/icon/star_3.svg";
import particleShape4 from "../../../../assets/images/icon/star_4.svg";
import particleShape5 from "../../../../assets/images/icon/star_5.svg";
import particleShape6 from "../../../../assets/images/icon/star_6.svg";
import particleShape7 from "../../../../assets/images/icon/star_7.svg";

import CTAStyleWrapper from "./Cta.style";

const CTA = () => {
  const particleShapes = [
    particleShape6,
    particleShape3,
    particleShape1,
    particleShape7,
    particleShape4,
    particleShape2,
    particleShape5,
    particleShape7,
    particleShape4,
    particleShape2,
    particleShape5,
  ];
  return (
    <CTAStyleWrapper>
      <div className="container">
        <SectionTitle
          className="f-nft_title_section text-center"
          title="Join Our community &amp; get Early access"
        ></SectionTitle>
        <div className="title-emo">🤙</div>
        <div className="f-nft_v1_cta_content">
          <div className="join_comunity_btns">
            <Button lg variant="mint" className="wishlist_btn">
              Whitelist is Ended
            </Button>
            <Button lg variant="blue" className="join_discord_btn"
              onClick={() => {
                window.open("https://discord.gg/FzCKUn3R", "_blank");
              }
              }
            >
              <FaDiscord /> Join Discord
            </Button>
          </div>
          <div className="cta_social_links">
            <ul>
              {data?.map((item, i) => (
                <li key={i}>
                  <a href={item.url}>
                    {item.thumb ? (
                      <img src={item.thumb} alt="f-nft nft profiles" />
                    ) : (
                      item.icon
                    )}
                  </a>
                  <img
                    className="social_hover_shape"
                    src={hoverShape}
                    alt="f-nft nft hover"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer_stras_sect">
            <div className="footer_stars">
              {particleShapes?.map((shape, i) => (
                <span key={i} className={`star_${i + 1}`}>
                  <img src={shape} alt="f-nft nft background particle" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CTAStyleWrapper>
  );
};

export default CTA;
