import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import PaginationStyleWrapper from "./Pagination.style";

const Pagination = () => {
  return (
    <PaginationStyleWrapper className="pagination_wrapper">
      <a href="# ">
        <FiChevronLeft />
      </a>
      <a href="# ">1</a>
      <a href="# ">2</a>
      <a href="# " className="active">
        3
      </a>
      <a href="# ">4</a>
      <a href="# ">5</a>
      <a href="# ">
        <FiChevronRight />
      </a>
    </PaginationStyleWrapper>
  );
};

export default Pagination;
