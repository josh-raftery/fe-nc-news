import { useEffect, useState } from "react"
import { getUser } from "../api"

function Author({author,windowWidth}){

    const [articleAuthor, setArticleAuthor] = useState({})

    useEffect(() => {
        getUser(author)
        .then((user) => {
            setArticleAuthor(user)
        })
    })

    return(
        <div className="author-div flex-shrink-0  gap-3">
            <img className="author-img" src={articleAuthor.avatar_url} />
            {windowWidth > 400 && <p className="mt-4" >by <b>{articleAuthor.username}</b></p>}
        </div>
    )
}

export default Author