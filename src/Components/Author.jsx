import { useEffect, useState } from "react"
import { getUser } from "../api"

function Author({author}){

    const [articleAuthor, setArticleAuthor] = useState({})

    useEffect(() => {
        getUser(author)
        .then((user) => {
            setArticleAuthor(user)
        })
    })

    return(
        <div className="author-div">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={articleAuthor.avatar_url} />
                </div>
                <h1 style=
                {{
                    marginTop: "0.7rem",
                    marginLeft: "1rem"
                }}
                >Written by: {articleAuthor.username}</h1>
            </div>
        </div>
    )
}

export default Author