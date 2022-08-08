import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Header from "../components/section/header/v1/Header";
import Layout from "../common/layout";
import Banner from "../components/section/banner/v1";
import Counter from "../components/section/counter";
import CharacterSlider from "../components/section/characterSlider/v1";
import HowToMint from "../components/section/howToMint/v1";
import About from "../components/section/about/v1";
import RoadMap from "../components/section/roadMap/v1";
import Team from "../components/section/team/v1";
import FAQ from "../components/section/faq/v1";
import Footer from "../components/section/footer/v1";
import MintNowModal from "../common/modal/mintNowModal";
import WalletModal from "../common/modal/walletModal/WalletModal";
import Partner from "../components/section/partner";
import PriceModal from "../common/modal/priceModal/PriceModal";

const HomeV1 = () => {
  
  const { visibility, walletModalvisibility, priceModalVisibiity } = useModal();
  return (
    <Layout>
       <GlobalStyles /> 
      {visibility && <MintNowModal />}
      {walletModalvisibility && <WalletModal />}
      {priceModalVisibiity && <PriceModal />}
      <Header />
      <Banner />
      <HowToMint />
      <CharacterSlider />
      <Counter />
      <About />
      <RoadMap /> 
      <Team />
      <FAQ />
      <Partner />
      <Footer />
    </Layout>
  );
};

export default HomeV1;
