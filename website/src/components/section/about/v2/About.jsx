import SectionTitle from "../../../../common/sectionTitle";
import Counter from "../../../../common/counter";

import aboutImageLeft from "../../../../assets/images/nft/about_image_left.png";
import aboutImageRight from "../../../../assets/images/nft/about_image_right.png";
import AboutInfoCardList from "../aboutInfoCardList";
import AboutStyleWrapper from "./About.style";

const About = () => {
  return (
    <AboutStyleWrapper className="v2_about_us_section" id="about">
      <div className="v2_about_overlay"></div>
      <div className="container">
        <SectionTitle
          className="text-center"
          isCenter={true}
          title="About Us"
          subtitle="THE STORY"
        />
        <div className="v2_about_us_content">
          <div className="v2_about_us_text">
            <p>
            Non-fungible Tokens (NFTs) are a method of proving digital ownership. Here are the top three things we think you should know about them as an artist or art collector so you can use them safely and easily. They are based on blockchain technology. These are transaction-recording distributed public ledgers. Each NFT is uniquely identified and stored on the blockchain with an identification code and metadata. “Metadata” means “data about data” in this context, and it is simply some additional information that describes the NFT and is stored alongside it. 
They’re a great way to identify digital assets and keep track of their supply. Whether you’ve made a piece of music, a digital piece of art, or a video, “minting” it as an NFT allows you to prove ownership. Digital assets used to be relatively easy to steal. This is significant because it means that artists will no longer be cheated out of royalties, and collectors will no longer have to worry about investing in a fake asset.
            </p>
            <p>
            NFTs, also known as immutable tokens, are based on Blockchain technology. With this technology, all visual, written, and audio works can be stored in digital format. The term “next-generation token” (NFT) is used to describe assets created using blockchain technology. 
The Ethereum blockchain contains the majority of NFTs. Ethereum is a Cryptocurrency similar to Bitcoin and Dogecoin, but it also supports non-fungible tokens (NFTs). An NFT is distinguished by the fact that it is linked to the token. The metadata on NFTs is processed using a cryptographic hash function, which is a mathematical algorithm that generates a unique string of letters and numbers. NFTs are also used to make asset interoperability possible across multiple platforms.
            </p>

            <div className="counter-wrap">
              <h4>
                To be minted <Counter end="10,000" />{" "}
              </h4>
              <h4>
                Attributes <Counter end="555" />
              </h4>
            </div>
          </div>
          <div className="v2_about_img v2_about_img_left">
            <span>
              <img src={aboutImageLeft} alt="nft about" />
            </span>
          </div>
          <div className="v2_about_img v2_about_img_right">
            <span>
              <img src={aboutImageRight} alt="nft thumb" />
            </span>
          </div>
        </div>

        {/* about card */}
        <AboutInfoCardList />
      </div>
    </AboutStyleWrapper>
  );
};

export default About;
