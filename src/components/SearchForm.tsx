import ReactSelect from "react-select";
import { ITag } from "../interface/ITag";

type SearchFormProps = {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    selectedTags: ITag[]   
    setSelectedTags: React.Dispatch<React.SetStateAction<ITag[]>>
    availableTags: ITag[]
}

export const SearchForm = ({title, setTitle, selectedTags, availableTags, setSelectedTags}: SearchFormProps) => {
  return (
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
  )
}
