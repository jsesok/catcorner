import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areCommentsVisible: {},
  commentsByPostId: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentsForPost: (state, action) => {
      const { postId, comments } = action.payload;
      state.commentsByPostId[postId] = comments;
    },
    toggleCommentVisibility: (state, action) => {
      const postId = action.payload; // payload - post ID
      state.areCommentsVisible[postId] = !state.areCommentsVisible[postId]; // toggle visibility for the specific post
    },
  },
});

export const { setCommentsForPost, toggleCommentVisibility } =
  commentsSlice.actions;
export default commentsSlice.reducer;
