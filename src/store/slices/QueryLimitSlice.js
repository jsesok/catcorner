import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiRequestCounter: 0,
  queryLimitReached: false,
  firstRequestTime: 0,
  lastRequestTime: 0,
  rateLimitMessage: "",
};

const QueryLimitSlice = createSlice({
  name: "queryLimit",
  initialState,
  reducers: {
    incrementApiRequestCounter: (state) => {
      state.apiRequestCounter += 1;
    },
    resetApiRequestCounter: (state) => {
      state.apiRequestCounter = 0;
      state.queryLimitReached = false;
    },
    setQueryLimitReached: (state, action) => {
      state.queryLimitReached = action.payload;
    },
    setFirstRequestTime: (state) => {
      state.firstRequestTime = new Date().getTime();
    },
    setLastRequestTime: (state) => {
      state.lastRequestTime = new Date().getTime();
    },
    setRateLimitMessage: (state, action) => {
      state.rateLimitMessage = action.payload;
    },
  },
});

export const {
  incrementApiRequestCounter,
  resetApiRequestCounter,
  setQueryLimitReached,
  setFirstRequestTime,
  setLastRequestTime,
  setRateLimitMessage,
} = QueryLimitSlice.actions;

export default QueryLimitSlice.reducer;
