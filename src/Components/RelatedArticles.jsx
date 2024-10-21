import { useEffect, useState } from "react"
import { getArticles } from "../api"
import PreviewArticles from "./PreviewArticles"
import Loading from "./Loading"

function RelatedArticles({topic}){
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getArticles({topic, limit: 10})
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topic])

    if(isLoading){
        return <Loading/>
    }

    return <PreviewArticles articles={articles} title="Related Articles"/>
}

export default RelatedArticles