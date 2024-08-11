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

function App() {

  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('theme')))

  return (
    <div data-theme={isDark ? "dark" : "cupcake"}>
      <Nav setIsDark={setIsDark} isDark={isDark} />
      <Routes>
        <Route path = "/" element = {<Home isDark={isDark}/>}/>
        <Route path = "/topics" element = {<Topics/>}/>
        <Route path = "/topics/:topic" element = {<Topic isDark={isDark}/>}/>
        <Route path = "/error" element = {<Error/>}/>
        <Route path = "/postArticle" element = {<PostArticle/>}/>
        <Route path = "/:article_id" element = {<Article isDark={isDark} />}/>
        <Route path = "*" element = {<Navigate to="/error"/>}/>
      </Routes>
    </div>
  )
}

export default App
