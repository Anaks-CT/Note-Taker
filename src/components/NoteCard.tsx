import { Link } from "react-router-dom";
import { ITag } from "../interface/ITag";

type SimplifiedNote = {
  tags: ITag[];
  title: string;
  id: string;
};

export const NoteCard = ({ id, tags, title }: SimplifiedNote) => {
  return (
    <Link
      to={`/${id}`}
      className="block md:h-56 md:w-40 w-full text-reset text-decoration-none transition-transform bg-white p-4 shadow-md rounded-lg duration-100 hover:translate-y-[-5px] hover:shadow-md"
    >
      <div className="py-2">
        <div className="flex flex-col h-100 items-center justify-center">
          <span className="text-lg">{title}</span>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center items-center mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm bg-blue-200 text-blue-800 py-1 px-2 rounded-full m-1"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
