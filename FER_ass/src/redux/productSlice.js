import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    totalCount: 0,
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setTotalCount } = productSlice.actions;
export default productSlice.reducer;
