import {useModal} from "../utils/ModalContext"
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import Banner from "../components/section/banner/v3";
import CharacterSlider from "../components/section/characterSlider/v3";
import About from "../components/section/about/v3";
import HowToMint from "../components/section/howToMint/v2";
import RoadMap from "../components/section/roadMap/v3";
import Team from "../components/section/team/v3";
import FAQ from "../components/section/faq/v3";
import NewsLetter from "../components/section/newsLetter";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import MintNowModal from "../common/modal/mintNowModal" 
import WalletModal from "../common/modal/walletModal/WalletModal" 
const HomeV3 = () => {
  const { visibility, walletModalvisibility } = useModal();
  return (
    <>
      <Layout>
      <GlobalStyles />
      {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
        <Header />
        <Banner />
        <CharacterSlider />
        <About />
        <HowToMint />
        <RoadMap />
        <Team />
        <FAQ />
        <NewsLetter />
        <CTA />
        <Footer />
      </Layout>
    </>
  );
};

export default HomeV3;
