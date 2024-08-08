import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getArticles } from "../api";
import SortBy from "./SortBy";
import Order from "./Order";
import { ErrorContext } from "../contexts/Error";
import TopicsDropDown from "./TopicsDropdown.jsx";

function Articles({topicInput}){

    const [articles, setArticles] = useState([])
    const [orderInput, setOrderInput] = useState("")
    const [sortByInput, setSortByInput] = useState("")
    const [topicsDropDown, setTopicsDropDown] = useState("")
    const [isTopicDropDown, setIsTopicDropDown] = useState(false)
    const { setError } = useContext(ErrorContext)
    const [isSorted, setIsSorted] = useState(false)
    const [isOrdered, setIsOrdered] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const params = {}
        if(topicInput){
            params.topic = topicInput
        }
        if(orderInput){
            params.order = orderInput
        }
        if(sortByInput){
            params.sort_by = sortByInput
        }
        if(topicsDropDown){
            params.topic = topicsDropDown
        }
        getArticles(params)
        .then((articles) => {
            setArticles(articles)
        })
        .catch((err) => {
            setError([{code: 404, msg: 'Not Found'}])
            navigate('/error')
        })
    }, [topicInput,orderInput,sortByInput,topicsDropDown]);

    function handleClear(){
        setTopicsDropDown("")
        setIsTopicDropDown(false)

        setSortByInput("")
        setIsSorted(false)

        setOrderInput("")
        setIsOrdered(false)
    }

    return (
        <div style={{marginLeft:"1rem"}}>
                <div 
                className="sort-order-div"
                style={{
                    marginTop: "1rem",
                    marginBottom: "1rem"
                }}
                >
                    {!topicInput && <TopicsDropDown topicsDropDown={topicsDropDown} setTopicsDropDown={setTopicsDropDown} isTopicDropDown = {isTopicDropDown} setIsTopicDropDown = {setIsTopicDropDown} />}
                    <SortBy setSortByInput={setSortByInput} isSorted = {isSorted} setIsSorted = {setIsSorted} />
                    <Order setOrderInput={setOrderInput} isOrdered = {isOrdered} setIsOrdered = {setIsOrdered} />
                    <button onClick={handleClear} class="btn btn-outline">Clear</button>
                </div>
                <div className="articles-div">
                <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => {
                        return (
                            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                                <Link key = {article.article_id} to = {`/${article.article_id}`} >
                                    <figure>
                                        <img
                                        src={article.article_img_url}
                                        alt={article.title}
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{article.title}</h2>
                                        <p><em>{article.topic}</em></p>
                                        <div className="card-actions justify-end">
                                        <button className="btn btn-primary">View more</button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
  );
}

export default Articles