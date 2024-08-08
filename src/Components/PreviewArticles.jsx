import { useState } from "react"
import { Link } from "react-router-dom"

function PreviewArticles({articles, title}){

    return (
        <div className="preview">
            <div className="card bg-base-70 w-65 shadow-xl">
            <div className="card-body">
                <h2 style={{
                    fontSize: "40px",
                    justifyContent: "center"
                }} 
                className="card-title">{title}</h2>
            </div>
        </div>
            {articles.map((article) => {
                return (
                    <Link key={article.article_id} to = {`/${article.article_id}`}>
                        <div className="card bg-base-70 w-65 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title">{article.title}</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default PreviewArticles