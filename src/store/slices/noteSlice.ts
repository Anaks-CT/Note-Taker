import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { IRawNote } from "../../interface/IRawNote";
import { ITag } from "../../interface/ITag";

const initialState: IRawNote[] = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    onCreateNote: (state, { payload: { tags, ...data } }) => [
      ...state,
      { ...data, id: uuidV4(), tagIds: tags.map((tag: ITag) => tag.id) },
    ],
    onEditNote: (state, { payload: { id, tags, ...data } }) =>
      state.map((note) =>
        note.id === id
          ? { ...note, ...data, tagIds: tags.map((tag: ITag) => tag.id) }
          : note
      ),
    onDeleteNote: (state, {payload : id}) => state.filter(note => note.id !== id)
  },
});

export const { onCreateNote, onEditNote, onDeleteNote } = noteSlice.actions;
export default noteSlice.reducer;
