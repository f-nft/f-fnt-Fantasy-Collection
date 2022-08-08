import { FaDiscord } from "react-icons/fa";
import Button from "../../../../common/button";

import bgShape1 from "../../../../assets/images/icon/square_shape_1.png";
import bgShape2 from "../../../../assets/images/icon/square_shape_2.png";

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
  ];
  return (
    <CTAStyleWrapper>
      <div className="f-nft_v2_cta_sect">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="f-nft_cta_title">
                <h3>Join Our community &amp; get Early access</h3>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="join_comunity_btns">
                <Button lg variant="mint" className="wishlist_btn">
                  Whitelist Now
                </Button>
                <Button lg variant="blue" className="join_discord_btn" href="https://discord.gg/FzCKUn3R">
                  {" "}
                  <FaDiscord /> Join Discord
                </Button>
              </div>
            </div>
          </div>
          <div className="cta_particles">
            {particleShapes?.map((shape, i) => (
              <span key={i} className={`star_${i + 1} particle_rotated`}>
                <img src={shape} alt="f-nft nft background particle" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <img
        src={bgShape2}
        className="bg-shape shape-left shape-top"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-left shape-bottom"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape2}
        className="bg-shape shape-right shape-top"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-right shape-bottom"
        alt="f-nft bg shape"
      />
    </CTAStyleWrapper>
  );
};

export default CTA;
