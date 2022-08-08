import BlogListStyleWrapper from "./BlogList.style";
import BlogItem from "../blogItem/BlogItem";
import Pagination from "../pagination/Pagination";
import data from "../../../../assets/data/blog/blogItems";
const BlogList = () => {
  const { posts } = data;
  return (
    <BlogListStyleWrapper>
      <div className="blog_lists_wrapper">
        <div className="container">
          <div className="row blog_items_row">
            {posts?.map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <BlogItem {...post} />
              </div>
            ))}
          </div>
          <div className="row">
            <Pagination />
          </div>
        </div>
      </div>
    </BlogListStyleWrapper>
  );
};

export default BlogList;
