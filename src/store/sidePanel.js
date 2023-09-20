import { createSlice } from "@reduxjs/toolkit";

const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState: {
    option: "question"
  },
  reducers: {
    setOption: (state, action) => {
      state.option = action.payload;
    }
  }
});

export const { setOption } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;
