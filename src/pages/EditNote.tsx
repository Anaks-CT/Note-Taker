import { NoteForm } from "../components/NoteForm";
import { useNote } from "../hooks/useNote";

export const EditNote = () => {
    const note = useNote()
    return(
        <NoteForm edit id={note.id} markDown={note.markDown} tags={note.tags} title={note.title} />
    )
}

