import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { useRef, useState, FormEvent } from "react";
import { ITag } from "../interface/ITag";
import { onCreateNote } from "../store/slices/noteSlice";
import { v4 as uuidV4 } from "uuid";
import { onAddTag } from "../store/slices/tagSlice";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../interface/IStore";

export const NoteForm = () => {

  // taking all the tags from the redux store
  const tags = useSelector((state: IStore) => state.tags) as ITag[]
  
  // using dispatch function to call method inside the slice
  const dispatch = useDispatch()

  // to store the current title and body details inside the ref
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);

  // state for tags
  const [selectedtags, setSelectedTags] = useState<ITag[]>([])

  // calling the onsubmit function and passing the values here
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // creating new note using the note slice method to create new note
    dispatch(
      // here we give ! to let the react know that it is a required field and the data is sure to get
      onCreateNote({
        title: titleRef.current!.value,
        markDown: markDownRef.current!.value,
        tags: selectedtags
      })
    )
  }

  return (
    <form className="max-w-xl mx-auto p-7 bg-white shadow-md rounded-lg " onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6 items-center">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter a title..."
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          

          {/* all we are doing down below is that we are passing as the value as label and value which the react select expects and when storing the value we store it as a label and id */}
          <CreatableReactSelect
            // react select expects a label and a value as like a regular select element do
            value={selectedtags.map(tag => ({label: tag.label, value: tag.id}))}

            // onchange to modify our values and we are storing as a label and an id
            onChange={tags => setSelectedTags(tags.map(tag => ({label: tag.label, id: tag.value})))}

            // when new tag is created
            onCreateOption={label => {
              console.log(label)
              // creating new tag
              const newTag = {id: uuidV4(), label}
              dispatch(onAddTag(newTag))
              // adding the created tag to the selected tag
              setSelectedTags(prev => [...prev, newTag])
            }}

            // stating all the available tags in the options
            options={tags.map(tag => ({label: tag?.label, value: tag?.id}))}
            isMulti
            className="mt-1 w-full"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
                boxShadow: "none",
              }),
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="markdown"
          className="block text-sm font-medium text-gray-700"
        >
          Body
        </label>
        <textarea
          ref={markDownRef}
          id="markdown"
          name="markdown"
          required
          rows={15}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter the note content..."
        />
      </div>
      <div className="mt-6 flex justify-end space-x-4 items-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Save
        </button>
        <Link
          to=".."
          className="text-gray-600 px-3 py-2 hover:bg-gray-400 bg-gray-300 font-medium transition duration-300 focus:outline-none focus:ring focus:ring-blue-200 rounded"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};
