import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MainHeader from "./Components/MainHeader";
import AboutPage from "./Components/AboutPage";
import ContactPage from "./Components/ContactPage";
import MyWorksPage from "./Components/MyWorksPage";
import MyBlogs from "./Components/blog components/MyBlogs";
import CreatePost from "./Components/blog components/CreatePost";
import Login from "./Components/Login";
import { UserContextProvider } from "./userContext";
import ViewPost from './Components/blog components/ViewPost'
import EditPost from "./Components/blog components/EditPost";
// import Error404Page from "./Components/Error404Page";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/myworks" element={<MyWorksPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<ViewPost/>} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
