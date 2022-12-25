import React from "react";
import EditForm from "page/EditForm";
import ReactHookForm from "page/ReactHookForm";
import ResolverForm from "page/ResolverForm";
import NoHookForm from "./page/NoHookForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="create" element={<EditForm mode="create" />} />
        <Route path=":id/edit" element={<EditForm mode="edit" />} />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
    // <ResolverForm />
    // <ReactHookForm />
  );
}

export default App;
