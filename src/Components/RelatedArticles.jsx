import { useEffect, useState } from "react"
import { getArticles } from "../api"
import PreviewArticles from "./PreviewArticles"
import Loading from "./Loading"

function RelatedArticles({topic, windowSize, narrow}){
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [maxPages,setMaxPages] = useState(0)
    const [end,setEnd] = useState(false)

    const limit = 7

    useEffect(() => {

        if(page === Math.ceil(maxPages)){
            setEnd(true)
        } 
           
        setIsLoading(true)
        getArticles({topic, limit, p: page})
        .then((articles) => {
            if(!maxPages){
                setMaxPages(articles[0].total_count / limit)
            }
            if(page > 1){
                setArticles((currArticles) => [...currArticles,...articles])
            }else{
                setArticles(articles)
            }
            setIsLoading(false)
        })
    }, [topic,page])

    if(isLoading){
        return <Loading/>
    }

    return <PreviewArticles narrow={narrow} key="preview-articles" articles={articles} title="Related Articles" windowSize={windowSize} setPage={setPage} end={end} />
}

export default RelatedArticles