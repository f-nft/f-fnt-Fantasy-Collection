import SectionTitle from "../../../../common/sectionTitle";
import sectionBgMesh from "../../../../assets/images/nft/Mesh-Grad.png";
import data from "../../../../assets/data/howToMint";

import HowToMintWrapper from "./HowToMint.style";

const HowToMint = () => {
  return (
    <HowToMintWrapper>
      <div className="container how_to_mint_container">
        <SectionTitle
          classNameName="md-pb-20"
          title="HOW TO MINT"
          subtitle="EASY STEPS"
        />
        <div className="how_to_mint_shadow">
          <img src={sectionBgMesh} alt="" />
        </div>
        <div className="how_to_mint_content">
          <ul>
            {data?.map((item, i) => (
              <li key={i}>
                <h4 className={item.mintColor}>{item.num}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HowToMintWrapper>
  );
};

export default HowToMint;
