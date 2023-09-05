import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { backGroundImage1, backGroundImage2, backGroundImage3 } from "./assets";
import { EditNote, NewNote, Note, NoteList } from "./pages";
import { useSelector } from "react-redux";
import { IStore } from "./interface/IStore";
import { useMemo } from "react";
import { ITag } from "./interface/ITag";
import { IRawNote } from "./interface/IRawNote";
import { NoteLayout } from "./layout/NoteLayout";

function App() {
  // taking notes from redux store
  const notes = useSelector((state: IStore) => state.notes) as IRawNote[];

  // taking tags from redux store
  const tags = useSelector((state: IStore) => state.tags) as ITag[];

  // converting the notes with tagids into notes with actual tags
  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        // adding the tag which contains the tag id
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
      // refethning the data if anyone of the attributes changes for memoization
    [notes, tags]
  );

  return (
    <div
      style={{ backgroundImage: `url("${backGroundImage3}")` }}
      className="h-full min-h-screen w-full flex flex-col justify-center bg-no-repeat bg-cover bg-center bg-fixed "
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteList notes={notesWithTags} />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note note={notesWithTags}/>} />
            <Route path="edit" element={<EditNote/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
