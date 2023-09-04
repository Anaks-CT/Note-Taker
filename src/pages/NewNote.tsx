import CreatableReactSelect from 'react-select/creatable'
import {Link} from 'react-router-dom'

export const NewNote = () => {
  return (
    <form className="max-w-xl mx-auto p-7 bg-white shadow-md rounded-lg ">
      <div className="grid grid-cols-2 gap-6 items-center">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter a title..."
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <CreatableReactSelect
            isMulti
            className="mt-1 w-full"
            styles={{
              control: (provided) => ({
                ...provided,
                border: '1px solid #E2E8F0',
                borderRadius: '0.375rem',
                boxShadow: 'none',
              }),
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="markdown" className="block text-sm font-medium text-gray-700">
          Body
        </label>
        <textarea
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
  )
}
