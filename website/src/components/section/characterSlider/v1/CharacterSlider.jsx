import { Slider, SliderItem } from "../../../../common/slider/Slider";
import data from "../../../../assets/data/characterSlider/characterSlider";

import CharacterSliderWrapper from "./CharacterSlider.style";

const CharacterSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <CharacterSliderWrapper>
      <Slider {...settings}>
        {data?.map((item, i) => (
          <SliderItem key={i}>
            <div className="character-thumb">
              <img src={item.thumb} alt="f-nft nft character" />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </CharacterSliderWrapper>
  );
};

export default CharacterSlider;
