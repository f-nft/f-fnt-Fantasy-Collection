import SidebarStyleWrapper from "./Sidebar.style";
import SectionTitle from "../../../../common/sectionTitle";
import Category from "../category/Category";
import RecentPosts from "../recentPosts/RecentPosts";
import Tag from "../tag/Tag";
const Sidebar = () => {
  return (
    <SidebarStyleWrapper className="sidebar_wrapper">
      <Category />
      <RecentPosts />
      <div className="tags_wrapper">
        <SectionTitle subtitle="Tags" className="widget_title" />
        <Tag />
      </div>
    </SidebarStyleWrapper>
  );
};

export default Sidebar;
