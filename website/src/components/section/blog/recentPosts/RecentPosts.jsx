import RecentPostsStyleWrapper from "./RecentPosts.style";
import SectionTitle from "../../../../common/sectionTitle";
import data from "../../../../assets/data/blog/blogItems";

const RecentPosts = () => {
  const { posts } = data;
  return (
    <RecentPostsStyleWrapper className="recent_post_list">
      <SectionTitle subtitle="Recent Posts" className="widget_title" />
      {posts?.map(
        (post, i) =>
          i < 3 && (
            <div key={i} className="recent_post_item">
              <img src={post.thumbnail} alt="f-nft nft post thumb" />
              <div className="post_title">
                <span>{post.timeStamp}</span>
                <a href="# "> {post.title} </a>
              </div>
            </div>
          )
      )}
    </RecentPostsStyleWrapper>
  );
};

export default RecentPosts;
