import { useOutletContext } from "react-router"
import { INote } from "../interface/INote"

// this hook is used to use the context mention inside the NoteLayout so that we can call it in the sub routes

export const useNote = () => useOutletContext<INote>()
  

