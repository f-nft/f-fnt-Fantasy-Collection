import { FiSearch } from "react-icons/fi";
import titleShape from "../../assets/images/icon/home-shape.png";
import PageHeaderStyleWrapper from "./PageHeader.style";
const PageHeader = () => {
  return (
    <PageHeaderStyleWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="breadcrumb_area">
              <div className="breadcrumb_menu">
                <a href="# ">Home</a> <span>.</span> Latest blog
                <img
                  className="heading_shape"
                  src={titleShape}
                  alt="f-nft nft heading shape"
                />
              </div>
              <h2 className="breadcrumb_title text-uppercase">Latest blog</h2>
            </div>
          </div>

          <div className="col-md-7">
            <div className="breadcrumb_form">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  id="Search"
                  name="search"
                  placeholder="Search by articles , categories"
                />
                <button>
                  <FiSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;
