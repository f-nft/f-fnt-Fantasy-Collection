import CommentStyleWrapper from "./Comment.style";
import comments from "../../../../assets/data/blog/comments";
import replayIcon from "../../../../assets/images/blog/icon.png";
const Comment = () => {
  return (
    <CommentStyleWrapper>
      <div className="comment_item_wrap">
        {comments?.map((comment, i) => (
          <div key={i} className="comment_item">
            <div className="commnet_inner">
              <img src={comment.thumb} alt="f-nft comment" />
              <div className="comment_body">
                <div className="comment_author">
                  <a href="# ">{comment.author}</a>
                  <span>{comment.timeStamp}</span>
                </div>
                <p>{comment.text}</p>
                <a href="# " className="replay_btn">
                  <img src={replayIcon} alt="f-nft nft replay" /> replay
                </a>
              </div>
            </div>

            {comment.replys?.map((replay, i) => (
              <div key={i} className="comment_item replay_box">
                <div className="commnet_inner">
                  <img src={replay.thumb} alt="f-nft comment" />
                  <div className="comment_body">
                    <div className="comment_author">
                      <a href="# ">{replay.author}</a>
                      <span>{replay.timeStamp}</span>
                    </div>
                    <p>{replay.text}</p>
                    <a href="# " className="replay_btn">
                      <img src={replayIcon} alt="f-nft nft replay" /> replay
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </CommentStyleWrapper>
  );
};

export default Comment;
