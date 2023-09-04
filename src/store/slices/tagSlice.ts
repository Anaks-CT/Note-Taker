import { createSlice } from "@reduxjs/toolkit";
import { ITag } from "../../interface/ITag";

const initialState: ITag[] = [];

const tagSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    onAddTag: (state, { payload: tag }) => [...state, tag],
  },
});

export const { onAddTag } = tagSlice.actions;
export default tagSlice.reducer;
