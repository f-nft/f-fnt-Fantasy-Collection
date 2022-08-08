import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";

import openseaIcon from "../images/icon/opensea.svg";
import mediumIcon from "../images/icon/med.svg";

const data = [
  {
    thumb: openseaIcon,
    url: "https://opensea.io/collection/fantasy-collections",
  },
  {
    icon: <FaTwitter />,
    url: "https://twitter.com/Fashion__NFT",
  },
  {
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/in/f-nft-project-887624231/",
  },
  {
    icon: <FaFacebook />,
    url: "https://www.facebook.com/f.nft.metaverse/",
  },
  {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/fnft2022",
  },
  {
    icon: <FaTelegramPlane />,
    url: "https://t.me/fashion_nft",
  },
  {
    thumb: mediumIcon,
    url: "https://medium.com/@pnft56061/f-nft-revolution-of-fashion-33d1f796860a",
  },
];

export default data;
