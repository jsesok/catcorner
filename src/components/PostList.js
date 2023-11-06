import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "../store";
import PostItem from "./PostItem";
import {
  incrementApiRequestCounter,
  setQueryLimitReached,
  resetApiRequestCounter,
  setFirstRequestTime,
  setLastRequestTime,
  setRateLimitMessage
} from "../store";

function PostList() {
  const dispatch = useDispatch();

  const subredditName = useSelector((state) => state.posts.subredditName);
  const posts = useSelector((state) => state.posts.postings);
  const filteredPostings = useSelector((state) => state.posts.filteredPostings);
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const requestCount = useSelector((state) => state.queryLimit.apiRequestCounter);
  const queryLimitReached = useSelector((state) => state.queryLimit.queryLimitReached);
  const rateLimitMessage = useSelector((state) => state.queryLimit.rateLimitMessage);
  const firstRequestTime = useSelector((state) => state.queryLimit.firstRequestTime);
  const lastRequestTime = useSelector((state) => state.queryLimit.lastRequestTime);

  useEffect(() => {
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
    // Fetch data from the Reddit JSON API based on the selected subredditName
    if (!queryLimitReached) {
      fetch(`https://www.reddit.com/r/${subredditName}.json`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const postArray = data.data.children.map((post) => post.data);
          dispatch(updatePosts(postArray));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, subredditName]);

  const displayedPosts = searchTerm ? filteredPostings : posts;

  return (
    <div>
      {!queryLimitReached && <span className="fs-2 fw-semibold h-background">r/{subredditName}</span>}
      {rateLimitMessage && <div className="card p-5 text-center">{rateLimitMessage}</div>}
      <ul className="list-unstyled">
        {!queryLimitReached && displayedPosts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>
      {searchTerm && displayedPosts.length === 0 && <p className="card p-5 text-center">No posts found.</p>}
    </div>
  );
}

export default PostList;
