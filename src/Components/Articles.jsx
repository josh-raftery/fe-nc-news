import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getArticles } from "../api";
import SortBy from "./SortBy";
import Order from "./Order";
import { ErrorContext } from "../contexts/Error";

function Articles({topicInput}){

    const [articles, setArticles] = useState([])
    const [orderInput, setOrderInput] = useState("")
    const [sortByInput, setSortByInput] = useState("")
    const { setError } = useContext(ErrorContext)
    const navigate = useNavigate()

    useEffect(() => {
        const params = {}
        if(topicInput){
            params.topic = topicInput
        }
        if(orderInput){
            params.order = orderInput
        }
        if(sortByInput){
            params.sort_by = sortByInput
        }
        getArticles(params)
        .then((articles) => {
            setArticles(articles)
        })
        .catch((err) => {
            setError([{code: 404, msg: 'Not Found'}])
            navigate('/error')
        })
    }, [topicInput,orderInput,sortByInput]);

    return (
        <div>
            <div 
            className="flex"
            style={{
                marginTop: "1rem",
                marginBottom: "1rem"
            }}
            >
                <SortBy setSortByInput={setSortByInput}/>
                <Order setOrderInput={setOrderInput}/>
            </div>
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