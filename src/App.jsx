import './App.css'
import Article from './Components/Article';
import Home from './Components/Home'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/:article_id" element = {<Article/>}/>
    </Routes>
  )
}

export default App
