import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";

function Home() {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles().then((articles) => {
    console.log(articles)
      setArticles(articles)
    });
  }, []);

  return (
    <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
            return (
                <Link to = {`/${article.article_id}`} >
                    <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                        src={article.article_img_url}
                        alt={article.title}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{article.title}</h2>
                        <p><em>{article.topic}</em></p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">View more</button>
                        </div>
                    </div>
                    </div>
                </Link>
            )

        })}
    </div>
  );
}

export default Home;
