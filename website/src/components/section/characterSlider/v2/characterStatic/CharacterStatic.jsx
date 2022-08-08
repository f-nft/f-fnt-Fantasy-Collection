import data from "../../../../../assets/data/characterSlider/dataV2";
import CharacterStaticStyleWrapper from "./CharacterStatic.style";

const CharacterStatic = () => {
  return (
    <CharacterStaticStyleWrapper>
      {data?.map((item, i) =>
        i <= 3 ? (
          <div key={i} className="character_item_wrap">
            <div className="character_item_thumb">
              <img src={item.thumb} alt="f-nft nft character" />
            </div>
            <div className="character_item_blank"></div>
          </div>
        ) : (
          <div key={i} className="character_item_wrap">
            <div className="character_item_blank"></div>
            <div className="character_item_thumb">
                <img src={item.thumb} alt="f-nft nft character" />
            </div>
          </div>
        )
      )}
    </CharacterStaticStyleWrapper>
  );
};

export default CharacterStatic;
