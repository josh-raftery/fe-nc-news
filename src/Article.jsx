import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Article(){

    const [article, setArticle] = useEffect({})
    const {article_id} = useParams()

    console.log(article_id)
}

export default Article