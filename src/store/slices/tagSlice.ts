import { createSlice } from "@reduxjs/toolkit";
import { ITag } from "../../interface/ITag";

const initialState: ITag[] = [];

const tagSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    onAddTag: (state, { payload: tag }) => [...state, tag],
    onEditTag: (state, { payload: { id, label } }) =>
      state.map((tag) => (tag.id === id ? { ...tag, label } : tag)),
    onDeleteTag: (state, { payload: id }) =>
      state.filter((tag) => tag.id !== id),
  },
});

export const { onAddTag, onDeleteTag, onEditTag } = tagSlice.actions;
export default tagSlice.reducer;
