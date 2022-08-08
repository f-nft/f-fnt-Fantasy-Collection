import TagStyleWrapper from "./tag.style";
import tags from "../../../../assets/data/blog/tags";
const Tag = () => {
  return (
    <TagStyleWrapper className="tag_items">
      {tags?.map((tag, i) => (
        <a key={i} href={tag.url}>
          {" "}
          {tag.title}
        </a>
      ))}
    </TagStyleWrapper>
  );
};

export default Tag;
