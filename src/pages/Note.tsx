import { useDispatch } from "react-redux";
import { useNote } from "../hooks/useNote";
import { Link, useNavigate } from "react-router-dom";
import { onDeleteNote } from "../store/slices/noteSlice";
import { toast } from "react-hot-toast";

export const Note = () => {

// hook to get the current note in the route
  const note = useNote();
const dispatch = useDispatch()
const navigate = useNavigate()

  return (
    <div className="max-w-xl md:-w-[700px] mx-auto p-7 w-full bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4 ">
        <div>
          <h1 className="md:text-2xl text-lg font-semibold">{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full m-1 truncate"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-x-2">
          <Link to={`/${note.id}/edit`}>
            <button className="md:px-4 md:py-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
              Edit
            </button>
          </Link>
          <button className="md:px-4 md:py-2 px-2 py-1 bg-white text-red-600 border border-red-400 rounded hover:bg-red-100 focus:outline-none focus:ring focus:ring-red-200"
            onClick={() => {
                dispatch(onDeleteNote(note.id))
                toast.success("Note Deleted Successfully")
                navigate('/')
            }}
          >
            Delete
          </button>
          <Link to="/">
            <button className="md:px-4 md:py-2 px-2 py-1 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="prose">{note.markDown}</div>
    </div>
  );
};
