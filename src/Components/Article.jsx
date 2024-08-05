import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticle } from "../api"
import Comments from "./Comments"
import Loading from "./Loading"

function Article(){

    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)

    const {article_id} = useParams()

    useEffect(() => {
        getArticle(article_id)
        .then((article) => {
            setArticle(article)
            setLoading(false)
        });
    },[])


    if(loading){
        return (
            <Loading/>
        )
      }

    return (
    
    <>
        <div className="article">
            <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={article.article_img_url}
                alt={article.title}
                />
            </figure>
            <div className="card-body w-50">
                <p>{article.created_at}</p>
                <p>{article.topic}</p>
                <h2 className="card-title">{article.title}</h2>
                <p>{article.body}</p>
                {/* <h2 className="card-title">£{item.price/100}</h2> */}
                <p>Written by: {article.author}</p>
            </div>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-accent">X</button>
                {/* I will make these buttons appear conditionally once I have made a component for users and only allow it if user === author */}
                </div>

            </div>
        </div>
        <Comments article_id={article.article_id} />
    </>    
    )
}

export default Article