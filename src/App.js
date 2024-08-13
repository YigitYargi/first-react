import logo from './logo.svg';
import './App.css';
import Post from "./Post.js";
import Header from "./Header.js";
import { Route, Routes } from "react-router-dom";
import Layout from './Layout.js';
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { UserContextProvider } from './UserContext.js';
import NewPost from './pages/NewPost.js';
import PostPage from './pages/PostPage.js';
import EditPostPage from './pages/EditPostPage.js';
import ProfilePage from './pages/ProfilePage.js';
import EditProfilePage from './pages/EditProfilePage.js';
import React, {useState, useEffect, useRef} from 'react';






function App() {
  

  
  return (
    
    <UserContextProvider>
      
      <Routes>
        
        <Route path="/" element={<Layout /> } >
        <Route index element={<HomePage />} />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/create" element={<NewPost /> } />
        <Route path="/post/:id" element={<PostPage /> } />
        <Route path="/edit/:id" element={<EditPostPage /> } />
        <Route path="/editprofilepage" element={ <EditProfilePage /> } />
        <Route path="/profilepage" element={ <ProfilePage /> } />
      </Route>    
    </Routes>
      
  


      </UserContextProvider>
    
    


    
  );

    
  

}

export default App;

