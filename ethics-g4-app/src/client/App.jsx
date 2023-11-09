import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactDOM from 'react-dom/client';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import UsersDemo from "./pages/UsersDemo";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function App() {
  

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="usersdemo" element={<UsersDemo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
