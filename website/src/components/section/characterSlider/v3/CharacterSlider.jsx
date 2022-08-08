import { Slider, SliderItem } from "../../../../common/slider/Slider";
import data from "../../../../assets/data/characterSlider/dataV3";

import CharacterSliderWrapper from "./CharacterSlider.style";

const CharacterSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <CharacterSliderWrapper>
      <Slider {...settings}>
        {data?.map((thumb, i) => (
          <SliderItem key={i}>
            <div className="character-thumb">
              <img src={thumb} alt="f-nft nft character" />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </CharacterSliderWrapper>
  );
};

export default CharacterSlider;
