import { useDispatch, useSelector } from "react-redux";
import { setCommentsForPost, toggleCommentVisibility } from "../store";
import CommentItem from "./CommentItem";
import {
  incrementApiRequestCounter,
  setQueryLimitReached,
  resetApiRequestCounter,
  setFirstRequestTime,
  setLastRequestTime,
  setRateLimitMessage
} from "../store";

function CommentsList({ postId }) {
  const dispatch = useDispatch();
  const commentsForPost = useSelector((state) => state.comments.commentsByPostId[postId] || []);
  const subredditName = useSelector((state) => state.posts.subredditName);
  const showComments = useSelector((state) => state.comments.areCommentsVisible[postId]);
  const requestCount = useSelector((state) => state.queryLimit.apiRequestCounter);
  const queryLimitReached = useSelector((state) => state.queryLimit.queryLimitReached);
  const rateLimitMessage = useSelector((state) => state.queryLimit.rateLimitMessage);
  const firstRequestTime = useSelector((state) => state.queryLimit.firstRequestTime);
  const lastRequestTime = useSelector((state) => state.queryLimit.lastRequestTime);

  // Fetch and set comments for the specific post
  const fetchComments = () => {
    if (showComments) {
      dispatch(toggleCommentVisibility(postId));
      return;
    }
    console.log("First", firstRequestTime);
    console.log("Last",lastRequestTime);
    console.log("Request number:", requestCount);
    if (lastRequestTime - firstRequestTime <= 60000) {
      if (requestCount > 10) {
        dispatch(setRateLimitMessage("You're going too fast, wait a minute!"));
        dispatch(setQueryLimitReached(true));
        setTimeout(() => {
          dispatch(setRateLimitMessage(''));
          dispatch(resetApiRequestCounter());
          dispatch(setLastRequestTime());
          dispatch(setFirstRequestTime());
        }, 60000);
      }
    } else {
      dispatch(resetApiRequestCounter());
      dispatch(setQueryLimitReached(false));
      setRateLimitMessage("");
    }
    if (!queryLimitReached) {
      fetch(`https://www.reddit.com/r/${subredditName}/comments/${postId}.json`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const TopLevelCommentsArray = data[1].data.children.map((comment) => comment.data);
          // Dispatch the action to set comments for the specific post
          dispatch(setCommentsForPost({ postId, comments: TopLevelCommentsArray }));
          dispatch(toggleCommentVisibility(postId));
          dispatch(incrementApiRequestCounter());
          if (requestCount === 1) {
            dispatch(setFirstRequestTime())
          }
          dispatch(setLastRequestTime());
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  return (
    <div className="pt-2">
      <div className="comments-btn">
        <button onClick={fetchComments} className="btn rounded-pill btn-color">Comments</button>
      </div>
    <ul>
      {showComments && !rateLimitMessage &&
        commentsForPost.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      }
    </ul>
    </div>
  );
}

export default CommentsList;
