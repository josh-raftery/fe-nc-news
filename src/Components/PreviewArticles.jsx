import { Link } from "react-router-dom"

function PreviewArticles({articles, title}){

    return (
        <div className="pt-2 pr-4 pb-2">
            <h2>{title}</h2>
            {articles.map((article) => {
                return (
                    <Link key={article.article_id} to = {`/${article.article_id}`}>
                        <div className="" >
                            <img src={article.article_img_url} ></img>
                            <h2>{article.title}</h2>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default PreviewArticles