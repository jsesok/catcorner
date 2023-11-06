import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./slices/PostsSlice";
import {
  changeSubredditName,
  updatePosts,
  setSearchTerm,
  expandPost,
  collapsePost,
} from "./slices/PostsSlice";
import CommentsReducer from "./slices/CommentsSlice";
import {
  setCommentsForPost,
  toggleCommentVisibility,
} from "./slices/CommentsSlice";
import {
  incrementApiRequestCounter,
  resetApiRequestCounter,
  setQueryLimitReached,
  setFirstRequestTime,
  setLastRequestTime,
  setRateLimitMessage,
} from "./slices/QueryLimitSlice";
import QueryLimitReducer from "./slices/QueryLimitSlice";

const store = configureStore({
  reducer: {
    posts: PostsReducer,
    comments: CommentsReducer,
    queryLimit: QueryLimitReducer,
  },
});

export {
  store,
  PostsReducer,
  CommentsReducer,
  QueryLimitReducer,
  changeSubredditName,
  updatePosts,
  setSearchTerm,
  setCommentsForPost,
  expandPost,
  collapsePost,
  toggleCommentVisibility,
  incrementApiRequestCounter,
  resetApiRequestCounter,
  setQueryLimitReached,
  setFirstRequestTime,
  setLastRequestTime,
  setRateLimitMessage,
};
