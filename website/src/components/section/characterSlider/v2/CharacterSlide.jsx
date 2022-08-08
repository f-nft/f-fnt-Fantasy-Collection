import useWindowDimensions from "../../../../utils/UseWindowDimensions";

import CharacterStatic from "./characterStatic/CharacterStatic";
import CharacterSlider from "./slideCharacter/CharacterSlider";

const CharacterSlide = () => {
  const { width } = useWindowDimensions();

  return <>{width >= 991 ? <CharacterStatic /> : <CharacterSlider />}</>;
};

export default CharacterSlide;
