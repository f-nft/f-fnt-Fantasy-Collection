import { useModal } from "../../../../utils/ModalContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../../../../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import logo from "../../../../assets/images/logo.png";

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });

    return () => {
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);
  return (
    <>
      <NavWrapper className="f-nft_header" id="navbar">
        <div className="container">
          {/* Main Menu Start */}
          <div className="f-nft_menu_sect">
            <div className="f-nft_menu_left_sect">
              <div className="logo">
                <a href="/">
                  <img src={logo} alt="f-nft nft logo" style={{ maxWidth: '39%' }} />
                </a>
              </div>
            </div>
            <div className="f-nft_menu_right_sect f-nft_v1_menu_right_sect">
              <div className="f-nft_menu_list">
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#roadmap">Roadmap</a>
                  </li>
                  <li>
                    <a href="#team">Team</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li className="submenu">
                    <a href="# ">Blog +</a>
                    <div className="sub_menu_sect">
                      <ul className="sub_menu_list">
                        {/* <li>
                        <a href="/">Home One</a>
                      </li>
                      <li>
                        <a href="/home-two">Home Two</a>
                      </li>
                      <li>
                        <a href="/home-three">Home Three</a>
                      </li> */}
                        <li>
                          <a href="/blogs">Latest Blog</a>
                        </li>
                        <li>
                          <a href="/post">Blog Details</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="f-nft_menu_btns">
                <button className="menu_btn" onClick={() => handleMobileMenu()}>
                  <MdNotes />
                </button>
                <Button sm variant="outline" className="join_btn"
                  onClick={() => {
                    window.open("https://discord.gg/FzCKUn3R", "_blank");
                  }
                  }>
                  <FaDiscord /> Join
                </Button>
                <Button
                  sm
                  variant="hovered"
                  className="connect_btn"
                  onClick={() => walletModalHandle()}
                >
                  <FaWallet /> Connect
                </Button>
              </div>
            </div>
          </div>
          {/* <!-- Main Menu END --> */}
          {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
        </div>
      </NavWrapper>
    </>
  );
};

export default Header;
