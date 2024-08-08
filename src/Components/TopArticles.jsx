import { useEffect, useState } from "react"
import { getArticles } from "../api"
import { Link } from "react-router-dom"
import PreviewArticles from "./PreviewArticles"
import Loading from "./Loading"

function TopArticles(){
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        getArticles({
            sort_by: "votes",
            order: "desc",
            limit: 5
        })
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    return <PreviewArticles articles={articles} title="Top Stories" />
}

export default TopArticles