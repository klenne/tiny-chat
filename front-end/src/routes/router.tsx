
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Config from "../pages/config";
import Chat from "../pages/chat";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/config" element={<Config />} />
        <Route path="/welcome" element={<Config welcomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
