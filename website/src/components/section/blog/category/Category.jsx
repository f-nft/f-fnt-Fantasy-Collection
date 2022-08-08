import CategoryWrapper from "./Category.style";
import SectionTitle from "../../../../common/sectionTitle";
import categories from "../../../../assets/data/blog/categories";
const Category = () => {
  return (
    <CategoryWrapper>
      <SectionTitle subtitle="Categories" className="widget_title" />

      <div className="category_list">
        {categories?.map((category, i) => (
          <a key={i} href={category.url}>
            {category.title}
            <span>{`(${category.postCount})`}</span>
          </a>
        ))}
      </div>
    </CategoryWrapper>
  );
};

export default Category;
