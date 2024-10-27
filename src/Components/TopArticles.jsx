import { useEffect, useState } from "react"
import { getArticles } from "../api"
import PreviewArticles from "./PreviewArticles"
import Loading from "./Loading"

function TopArticles({windowSize, narrow}){
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [maxPages,setMaxPages] = useState(0)
    const [end,setEnd] = useState(false)

    const limit = 7

    useEffect(() => {
        setIsLoading(true)
        if(page === Math.ceil(maxPages)){
            setEnd(true)
        }   
        getArticles({
            sort_by: "votes",
            order: "desc",
            limit: 7,
            p: page
        })
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
    }, [page])

    if(isLoading){
        return <Loading/>
    }

    return <PreviewArticles  narrow={narrow} key="Top-Articles" articles={articles} title="Top Stories" windowSize={windowSize} setPage={setPage} end={end}/>
}

export default TopArticles