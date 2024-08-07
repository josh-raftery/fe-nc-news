import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import Articles from "./Articles";

function Home() {

  const [articles, setArticles] = useState([])
  const [topicInput, setTopicInput] = useState("")

  useEffect(() => {
    getArticles()
    .then((articles) => {
        setArticles(articles)
    });
  }, []);

  return (
    <div>
        <Articles setTopicInput={setTopicInput} />
    </div>
  )
}

export default Home;
