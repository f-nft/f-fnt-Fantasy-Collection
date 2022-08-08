import FooterBottomStyleWrapper from "./FooterBottom.style";
import data from "../../../../../assets/data/socialProfile";
import backToTopIcon from "../../../../../assets/images/icon/back_to_top.svg";
import footerShapesLeft from "../../../../../assets/images/icon/footer_shapes_left.png";
import footerShapesRight from "../../../../../assets/images/icon/footer_shapes_right.png";

const FooterBottom = () => {
  return (
    <FooterBottomStyleWrapper className="footer_bottom">
      <div className="footer_bottom_content">
        <span className="footer_shapes_left">
          <img src={footerShapesLeft} alt="f-nft nft footer" />
        </span>
        <span className="footer_shapes_right">
          <img src={footerShapesRight} alt="f-nft nft footer" />
        </span>
        <div className="container">
          <div className="footer_menu">
            <div className="bottom_footer_left">
              <div className="copyright_text">
                Copyright ©2022 f-nft, All rights reserved.
              </div>
            </div>
            <a href="# " className="bact_to_top_btn">
              <img src={backToTopIcon} alt="f-nft nft back to top" />
            </a>
            <div className="bottom_footer_right">
              <ul>
                {data?.map((item, i) => (
                  <li key={i}>
                    <a href={item.url}>
                      {item.thumb ? (
                        <img src={item.thumb} alt="f-nft nft social" />
                      ) : (
                        item.icon
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FooterBottomStyleWrapper>
  );
};

export default FooterBottom;
