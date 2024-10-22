import { useEffect, useState } from "react"
import { getArticles } from "../api"
import PreviewArticles from "./PreviewArticles"
import Loading from "./Loading"

function RelatedArticles({topic, windowSize}){
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    

    useEffect(() => {
        setIsLoading(true)
        getArticles({topic, limit: 5})
        .then((articles) => {
            console.log(articles, 'related articles')
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topic])

    if(isLoading){
        return <Loading/>
    }

    return <PreviewArticles key="preview-articles" articles={articles} title="Related Articles" windowSize={windowSize}/>
}

export default RelatedArticles