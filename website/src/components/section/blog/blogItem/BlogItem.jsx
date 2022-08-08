import { FaRegComments } from "react-icons/fa";

import BlogItemStyleWrapper from "./BlogItem.style";

const BlogItem = ({ thumbnail, title, timeStamp, categories, excerpt }) => {
  return (
    <BlogItemStyleWrapper className="single_blog_item">
      <div className="blog_thumb">
        <a href="/post">
          <img src={thumbnail} alt="f-nft nft blog" />
        </a>
      </div>
      <div className="blog_content">
        <div className="blog_meta">
          {categories?.map((category, i) => (
            <a key={i} href="/post" className="category_title">
              {i > 0 ? ", " : ""}
              {category.title}
            </a>
          ))}
          <span>.</span>
          <span className="time_stamp">{timeStamp}</span>
        </div>

        <a className="blog_title" href="/post">
          {" "}
          {title}
        </a>
        <p>{excerpt} </p>
        <div className="blog_footer">
          <div className="read_more_btn">
            <a href="/post"> Read more</a>
          </div>
          <div className="comment_icon">
            <a href="# ">
              {" "}
              <FaRegComments />
            </a>{" "}
            05
          </div>
        </div>
      </div>
    </BlogItemStyleWrapper>
  );
};

export default BlogItem;
