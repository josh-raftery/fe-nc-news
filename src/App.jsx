import './App.css'
import Article from './Components/Article';
import Home from './Components/Home'
import { Routes, Route } from "react-router-dom";
import Topics from './Components/Topics';
import Topic from './Components/Topic';

function App() {

  return (
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/:article_id" element = {<Article/>}/>
      <Route path = "/topics" element = {<Topics/>}/>
      <Route path = "/topics/:topic" element = {<Topic/>}/>
    </Routes>
  )
}

export default App
