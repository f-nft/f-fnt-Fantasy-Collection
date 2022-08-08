import { useModal } from "../../../../utils/ModalContext";
import CountdownTimer from "react-component-countdown-timer";
import Counter from "../../../../common/counter";
import Particle from "../../../../common/particle/v1";
import Button from "../../../../common/button";

import data from "../../../../assets/data/particle/bannerV2Particles";
import BannerStyleWrapper from "./Banner.style";

const Banner = () => {
  const { mintModalHandle } = useModal();
  const settings = {
    count: 5432560,
    showTitle: true,
    size: 60,
    labelSize: 14,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "",
    hourTitle: "",
    minuteTitle: "",
    secondTitle: "",
    id: "countdownwrap",
  };
  return (
    <BannerStyleWrapper className="f-nft_v1_baner_sect" id="home">
      <div className="container">
        <div className="f-nft_v1_baner_content">
          <h2>
            {" "}
            <span className="banner-emot">🎉</span>Public Sale{" "}
            <span>Live !</span>
          </h2>
          <h3>
            <span className="count">
              <Counter end={10000} duration={10000} />
            </span>{" "}
            / 10000 Minted
          </h3>
          <div className="f-nft_v2_timer">
            <h4>TIME LEFT</h4>
            <div className="timer timer_1">
              <CountdownTimer {...settings} />
            </div>
          </div>
          <div className="f-nft_v2_baner_buttons text-center">
            <Button lg variant="mint" onClick={() => mintModalHandle()}>
              Mint Now
            </Button>
          </div>

          <Particle className="v2_baner_stars" particles={data} />
        </div>
      </div>
    </BannerStyleWrapper>
  );
};

export default Banner;
