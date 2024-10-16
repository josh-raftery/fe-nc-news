import './App.css'
import Article from './Components/Article';
import Home from './Components/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import Topics from './Components/Topics';
import Topic from './Components/Topic';
import Nav from './Components/Nav';
import Error from './Components/Error';
import PostArticle from './Components/PostArticle';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/topics" element = {<Topics/>}/>
        <Route path = "/topics/:topic" element = {<Topic />}/>
        <Route path = "/error" element = {<Error/>}/>
        <Route path = "/postArticle" element = {<PostArticle/>}/>
        <Route path = "/:article_id" element = {<Article />}/>
        <Route path = "*" element = {<Navigate to="/error"/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
