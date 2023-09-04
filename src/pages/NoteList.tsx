import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { ITag } from "../interface/ITag";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../interface/IStore";

export const NoteList = () => {
  // state for title
    const [title, setTitle] = useState("")
    
  // state to show all the tags created in the store
  const availableTags = useSelector((state: IStore) => state.tags) as ITag[];

  // state for selected tags when searching
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  return (
    <div className="flex flex-col ">
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
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <ReactSelect
              value={selectedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              options={availableTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => ({
                    label: tag.label,
                    id: tag.value,
                  }))
                );
              }}
              isMulti
              className="mt-1 w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
