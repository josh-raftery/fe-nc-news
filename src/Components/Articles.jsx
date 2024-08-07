import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../api";
import SortBy from "./SortBy";
import Order from "./Order";

function Articles({topicInput}){

    const [articles, setArticles] = useState([])
    const [orderInput, setOrderInput] = useState("")
    const [sortByInput, setSortByInput] = useState("")

    useEffect(() => {
        console.log(topicInput, ' topicInput')
        getArticles(topicInput)
        .then((articles) => {
            setArticles(articles)
        });
    }, [topicInput]);

    return (
        <div>
            <SortBy setSortByInput={setSortByInput}/>
            <Order setOrderInput={setOrderInput}/>
            <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => {
                    return (
                        <Link key = {article.article_id} to = {`/${article.article_id}`} >
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
        </div>
  );
}

export default Articles