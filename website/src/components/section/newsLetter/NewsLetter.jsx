import SectionTitle from "../../../common/sectionTitle";
import BlogItem from "../blog/blogItem/BlogItem";
import data from "../../../assets/data/blog/blogItems";

import NewsLetterStyleWrapper from "./NewsLetter.style";
const NewsLetter = () => {
  const { posts } = data;
  return (
    <NewsLetterStyleWrapper>
      <div className="container">
        <SectionTitle
          title="Blog Post"
          subtitle="Latest Articles"
          className="section_title"
        />
        <div className="row">
          {posts?.map(
            (post, i) =>
              i < 3 && (
                <div key={i} className="col-lg-4 col-md-6">
                  <BlogItem {...post} />
                </div>
              )
          )}
        </div>
      </div>
    </NewsLetterStyleWrapper>
  );
};

export default NewsLetter;
