import CommentBoxStyleWrapper from "./CommentBox.style";
import Button from "../../../../common/button";
const CommentBox = () => {
  return (
    <CommentBoxStyleWrapper>
      <div className="form-heading">
        <h4 className="mb-10">Leave a Reply</h4>
        <p className="mb-40">
          Your email address will not be published. Required fields are marked
        </p>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="input-button">
            <input type="text" id="name" placeholder="Your name" required />
            <label htmlFor="name">Your name *</label>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="input-button">
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required
            />
            <label htmlFor="email">Email Address *</label>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-button">
            <input
              type="text"
              id="site"
              placeholder="example@gmail.com"
              required
            />
            <label>Website</label>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-button comment-button">
            <input
              type="text"
              id="Comment"
              className="textarea"
              placeholder="Type your comment"
              required
            />
            <label>Comment *</label>
          </div>
        </div>

        <div className="comment_btn">
          <Button lg variant="mint">
            Post Comment
          </Button>
        </div>
      </div>
    </CommentBoxStyleWrapper>
  );
};

export default CommentBox;
