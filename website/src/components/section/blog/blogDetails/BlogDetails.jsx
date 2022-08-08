import { useModal } from "../../../../utils/ModalContext";
import { FiShare2 } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import BlogDetailsStyleWrapper from "./BlogDestails.style";
// components
import Tag from "../tag/Tag";
import Comment from "../comment/Comment";
import CommentBoxment from "../commentBox/CommentBox";
import Sidebar from "../sidebar/Sidebar";

//images
import postThumb from "../../../../assets/images/blog/blog-detail.png";
import postThumb2 from "../../../../assets/images/blog/blog-img2.png";
import postThumb3 from "../../../../assets/images/blog/blog-img3.png";
import avatarIcon from "../../../../assets/images/blog/user.png";
import postThumb4 from "../../../../assets/images/blog/blog.png";
import postThumb5 from "../../../../assets/images/blog/blog2.png";

const BlogDetails = () => {
  const { shareModalHandle } = useModal();
  return (
    <BlogDetailsStyleWrapper>
      <div className="blog_post_details_wrapper">
        <div className="container">
          <div className="row">
            {/* post details col  */}
            <div className="col-lg-8 col-md-12">
              <div className="post_thumbnail">
                <img src={postThumb} alt="f-nft nft blog" />
              </div>
              <div className="blog_post_meta">
                <a href="# " className="post_author">
                  <img src={avatarIcon} alt="blog post avatar" />
                  f0nft
                </a>
                <span>
                  {" "}
                  <FaCalendarAlt /> 18 JULY, 2022
                </span>
              </div>
              <h1 className="post_title">
                It’s the Great Chance to Invest in Metaverse NFT
              </h1>
              <div className="blog_description">
                <p className="text-white">
                  Because of NFTs, the perception of online gaming and in-game asset purchases is changing. Because non-fungible tokens, are unique in nature and can be created to retain value beyond the game in which they were created, blockchain-based games have the potential to significantly expand the gaming industry. Props that enhance the gaming experience, such as characters, avatars, sound effects, city streets, and so on, can now be easily created as NFTs in three-dimensional space. 
                </p>
                <p>
                  Our goal is to launch a mixed-media Nft project with the goal of providing a new and reliable system-based technology in the form of a 3D Nft fantasy fashion. Experts will discuss the economy with Nft fantasy fashion, offer crypto advice, and take part in our play to earn game. Anyone with this Nft is welcome to join our community. We directly promote transparent and secure transactions and reward our investors, and we’re about to launch a new platform where investors can make a lot of money. 
                </p>
                <div>
                  <h4>Play-to-Earn</h4>
                  <p>
                    People have been making money from video games for years through practises like “gold farming” and unofficial marketplaces for in-game items, but the advent of blockchain technology and NFTs has changed the game completely. 
                  </p>
                  <p>
                    Non-fungible tokens, or NFTs, are cryptographically distinct tokens that can be used to prove ownership of content like images or music. Users can take ownership of in-game items such as virtual clothing or land plots in Blockchain games. {" "}
                  </p>
                </div>
                <div className="blockquote">
                  <p>
                    These are online games that, like any other game, reward you with objects, but these objects are NFTs, which means they are exchangeable and immutable, and thus sellable! Our project is about to help you and help investors to make money.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="item-image">
                      <img src={postThumb2} alt="blog item thumb" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="item-image1">
                      <img src={postThumb3} alt="blog item thumb" />
                    </div>
                  </div>
                </div>
                <h4>IGO Facts</h4>
                <p>
                  Let’s take a closer look at the Heroes Chained IGO information
                  and GamFi holders’ opportunity
                  <br /> to buy $GF tokens before market listing through the IGO
                  on the Launchpad on January 17.
                </p>
                <ul>
                  <li>
                    <span>Name: </span>Fantasy NFT
                  </li>
                  <li>
                    <span>Token Type:</span> NFT
                  </li>
                  <li>
                    <span>Total supply: </span>10,000
                  </li>
                  <li>
                    <span>Initial Mcap: </span>$679K
                  </li>
                  <li>
                    <span>IGO Date: </span>JUNE 30
                  </li>
                  <li>
                    <span>Allocation:</span> $400K (including 5% success fee)
                  </li>
                  <li>
                    <span>IGO Price:</span> $0.35
                  </li>
                  <li>
                    <span>Vesting:</span>20% at TGE, then 13,33% every month for
                    6 months
                  </li>
                </ul>
                <h4>About MintO</h4>
                <p>
                  Randomised words which don't look even slightly believable. If
                  you are going to use a passage
                  <br /> , you need to be sure there isn't
                  anything embarrassing.
                  <br /> making it over 2,000 years old.{" "}
                </p>
              </div>

              {/* // tags  */}
              <div className="post_tags_list">
                <Tag />
                <div className="share_butn">
                  <a href="# " onClick={(e) => shareModalHandle(e)}>
                    <FiShare2 /> Share
                  </a>
                </div>
              </div>

              {/* related posts  */}
              <div className="related_posts_wrapper">
                <a href="# " className="related_post_item">
                  <img src={postThumb4} alt="f-nft nft post" />
                  <div className="related_post__title">
                    <span>PREVIOUS</span>
                    How to Create Your 1st Crypto NFTs 🎉
                  </div>
                </a>
                <a href="# " className="related_post_item next">
                  <img src={postThumb5} alt="f-nft nft post" />

                  <div className="related_post__title">
                    <span>Next</span>
                    The new token is launching planet
                  </div>
                </a>
              </div>

              {/* comments  */}
              <div className="post_comments_wrapper">
                <h4 className="comment_section_title">3 Comments</h4>
                <Comment />
              </div>

              {/* comment box */}

              <CommentBoxment />
            </div>

            {/* **********sidebar*********** */}
            <div className="col-lg-4 col-md-12">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </BlogDetailsStyleWrapper>
  );
};

export default BlogDetails;
