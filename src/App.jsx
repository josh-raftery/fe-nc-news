import './App.css'
import Article from './Components/Article';
import Home from './Components/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import Topics from './Components/Topics';
import Topic from './Components/Topic';
import Nav from './Components/Nav';
import Error from './Components/Error';
import { useEffect, useState } from 'react';
import PostArticle from './Components/PostArticle';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {

  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('theme')))

  return (
    <>
      <Nav setIsDark={setIsDark} isDark={isDark} />
      <Routes>
        <Route path = "/" element = {<Home isDark={isDark}/>}/>
        <Route path = "/topics" element = {<Topics/>}/>
        <Route path = "/topics/:topic" element = {<Topic isDark={isDark}/>}/>
        <Route path = "/error" element = {<Error/>}/>
        <Route path = "/postArticle" element = {<PostArticle/>}/>
        <Route path = "/:article_id" element = {<Article isDark={isDark} />}/>
        <Route path = "*" element = {<Navigate to="/error"/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
