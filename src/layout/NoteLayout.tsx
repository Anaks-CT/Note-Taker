import { Navigate, Outlet, useParams } from "react-router";
import { IRawNote } from "../interface/IRawNote";

type NoteLayoutProps = {
  notes: IRawNote[];
};
// this is a layout for the inner routes written in app.tsx
export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  // taking the id from route
  const { id } = useParams();
  // checking if the id is present inside the notes
  const note = notes.find((n) => n.id === id);

  // if the id note valid we will be navigated back to home page with replace true to not come back
  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};
