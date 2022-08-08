import SectionTitle from "../../../../common/sectionTitle"; 
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
