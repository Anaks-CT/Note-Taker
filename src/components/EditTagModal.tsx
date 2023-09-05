import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../interface/IStore";
import { onDeleteTag } from "../store/slices/tagSlice";

type EditTagsModalProps = {
  show: boolean;
  handleClose: () => void;
};

export const EditTagModal = ({
  handleClose,
  show,
}: EditTagsModalProps) => {

    // taking all tags from store
    const availableTags = useSelector((state: IStore) => state.tags)

    const dispatch = useDispatch()
    


  return (
    <div
      className={`fixed inset-0 ${
        show ? "block" : "hidden"
      } z-10 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full ${
            show ? "sm:scale-100" : "sm:scale-95"
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Tags
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form className="space-y-2">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tag.label}
                    className="flex-grow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                  />
                  <button
                    className="flex-shrink-0 p-1 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring w-9"
                    onClick={() => dispatch(onDeleteTag(tag.id))}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </form>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
