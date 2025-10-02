import { createSlice } from "@reduxjs/toolkit";

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    list: [],
    searchTerm: "",
    sortBy: "name",
  },
  reducers: {
    addCandidate: (state, action) => {
      state.list.push(action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addCandidate, setSearchTerm, setSortBy } = candidatesSlice.actions;
export default candidatesSlice.reducer;
