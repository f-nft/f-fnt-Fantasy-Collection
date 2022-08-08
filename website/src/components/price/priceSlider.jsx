import { Slider, SliderItem } from "../../common/slider/Slider";
import priceData from "../../assets/data/characterSlider/PriceSlider";
import CharacterSliderWrapper from "./CharacterSlider.style";

const PriceSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "5px",
    infinite: true,
    slidesToShow: 1,
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
        //breakpoint for medium screen
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 592,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 241,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 50,
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
        {priceData?.map((item, i) => (
          <SliderItem key={i}>
            <div className="character-thumb">
              <img src={item.thumb} alt="f-nft price" />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </CharacterSliderWrapper>
  );
};

export default PriceSlider;
