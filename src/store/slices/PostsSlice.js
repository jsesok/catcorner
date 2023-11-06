import { createSlice } from "@reduxjs/toolkit";

const defaultSubreddit = "CatAdvice";

const initialState = {
  subredditName: defaultSubreddit,
  postings: [],
  filteredPostings: [],
  searchTerm: "",
  expandedOrCollapsedPostings: {}
};

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changeSubredditName: (state, action) => {
      state.subredditName = action.payload;
    },
    updatePosts: (state, action) => {
      state.postings = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredPostings = state.postings.filter((post) =>
        post.title.toLowerCase().includes(action.payload)
      );
    },
    expandPost: (state, action) => {
      state.expandedOrCollapsedPostings[action.payload] = true;
    },
    collapsePost: (state, action) => {
      state.expandedOrCollapsedPostings[action.payload] = false;
    },
  },
});

export const { changeSubredditName, updatePosts, setSearchTerm, expandPost, collapsePost } =
  PostsSlice.actions;
export default PostsSlice.reducer;
