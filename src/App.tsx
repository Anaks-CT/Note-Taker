import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { NewNote } from "./pages/NewNote";
import { backGroundImage1, backGroundImage2, backGroundImage3 } from "./assets";

function App() {
  return (
    <div style={{backgroundImage: `url("${backGroundImage3}")`}} className="h-screen w-full flex flex-col justify-center bg-no-repeat bg-cover bg-center bg-fixed">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id">
            <Route index element={<h1>Show</h1>} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
