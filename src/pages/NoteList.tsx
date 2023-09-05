import { Link } from "react-router-dom";
import { ITag } from "../interface/ITag";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../interface/IStore";
import { SearchForm } from "../components/SearchForm";
import { NoteCard } from "../components/NoteCard";

type SimplifiedNote = {
  tags: ITag[];
  title: string;
  id: string;
};

type Props = {
  notes: SimplifiedNote[];
};

export const NoteList = ({ notes }: Props) => {
  // state for title
  const [title, setTitle] = useState("");

  // state to show all the tags created in the store
  const availableTags = useSelector((state: IStore) => state.tags) as ITag[];

   // state for selected tags when searching
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  // Number of notes per page
  const pageSize = 3; 
  // current page 
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the notes for the current page
  const currentNotes = filteredNotes.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredNotes.length / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-xl mx-auto p-7 bg-white shadow-md rounded-lg items-center mb-4 w-full">
      <div className="flex items-center justify-between mb-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 md:gap-40 ">
        {currentNotes.map((note) => (
          <div key={note.id} className="mt-7 flex justify-center md:block">
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${currentPage === 1 && "hidden"} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages && "hidden"} px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
