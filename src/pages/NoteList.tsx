import { Link } from "react-router-dom";
import { ITag } from "../interface/ITag";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../interface/IStore";
import { SearchForm } from "../components/SearchForm";
import { NoteCard } from "../components/NoteCard";

type SimplifiedNote = {
  tags: ITag[]
  title: string
  id: string
}

type props = {
  notes : SimplifiedNote[]
}


export const NoteList = ({notes}: props) => {
  // state for title
  const [title, setTitle] = useState("");

  // state to show all the tags created in the store
  const availableTags = useSelector((state: IStore) => state.tags) as ITag[];

  // state for selected tags when searching
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  // function to filter the notes when searched by the user
  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          // filter the notes if the title entered is "" which means all the notes
          (title === "" ||
            // filter the notes if according to what the current entered title is by the user
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          // filter the notes if there are no selected tags by the user which means all the the notes
          (selectedTags.length === 0 ||
            // here we take all the selected tags and check the notes which contain all that selected tags and filter the notes
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            ))
      ),
    // we fetch the filtered notes if anyone of the attribute changes here for memoization
    [title, selectedTags, notes]
  );

  console.log(filteredNotes, notes)

  return (
    <div className="max-w-xl mx-auto p-7 bg-white shadow-md rounded-lg items-center mb-4">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <div className="space-x-2">
          <Link to="/new">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
              Create
            </button>
          </Link>
          <button className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200">
            Edit Tags
          </button>
        </div>
      </div>
      <SearchForm
        availableTags={availableTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setTitle={setTitle}
        title={title}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {filteredNotes.map((note) => (
          <div key={note.id} className="mt-7">
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </div>
  );
};
