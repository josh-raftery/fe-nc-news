import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getArticles } from "../api";
import SortBy from "./SortBy";
import Order from "./Order";
import { ErrorContext } from "../contexts/Error";
import TopicsDropDown from "./TopicsDropdown.jsx";
import { UserContext } from "../contexts/User.jsx";
import Author from "./Author.jsx";

function Articles({ isDark, topicInput }) {
    const [articles, setArticles] = useState([]);
    const [orderInput, setOrderInput] = useState("");
    const [sortByInput, setSortByInput] = useState("");
    const [topicsDropDown, setTopicsDropDown] = useState("");
    const [isTopicDropDown, setIsTopicDropDown] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [limit, setlimit] = useState(10)
    const [maxPages, setMaxPages] = useState(false)
    const { user } = useContext(UserContext)
    const [userData] = user

    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        const params = {};
        if (topicInput) {
            params.topic = topicInput;
        }
        if (orderInput) {
            params.order = orderInput;
        }
        if (sortByInput) {
            params.sort_by = sortByInput;
        }
        if (topicsDropDown) {
            params.topic = topicsDropDown;
        }
        if(page){
            params.p = page
        }
        if(limit){
            params.limit = limit
        }
        getArticles(params)
            .then((articles) => {
                setTotalCount(articles[0].total_count)
                console.log(pagination)
                if(!pagination){
                    setArticles(articles);
                } else{
                    setArticles((currArticles) => {
                        return [...currArticles,...articles]
                    })
                }
            })
            .catch((err) => {
                setError([{ code: 404, msg: "Not Found" }]);
                navigate("/error");
            });
    }, [topicInput, orderInput, sortByInput, topicsDropDown , page, limit, pagination]);

    function handleClear() {
        setTopicsDropDown("");
        setIsTopicDropDown(false);

        setSortByInput("");
        setIsSorted(false);

        setPagination(false)
        setPage(1)
        setMaxPages(false)

        setOrderInput("");
        setIsOrdered(false);
    }

    useEffect(() => {
        if(totalCount){
            if((page * limit) >= totalCount){
                setMaxPages(true)
            }
        }
    },[page])

    function newPage(){
        setPagination(true)
        if((page * limit) < totalCount){
            setPage((currPage) => {
                return currPage + 1
            }) 
        }
    }

    return (
        <div style={{ marginLeft: "1rem" }}>
            <div
                className="sort-order-div"
                style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                }}
            >
                {!topicInput && (
                    <TopicsDropDown
                        setPagination={setPagination}
                        setPage={setPage}
                        setMaxPages={setMaxPages}
                        topicsDropDown={topicsDropDown}
                        setTopicsDropDown={setTopicsDropDown}
                        isTopicDropDown={isTopicDropDown}
                        setIsTopicDropDown={setIsTopicDropDown}
                    />
                )}
                <SortBy 
                setPagination={setPagination}
                setPage={setPage}
                setMaxPages={setMaxPages}
                setSortByInput={setSortByInput} 
                isSorted={isSorted} 
                setIsSorted={setIsSorted} 
                />
                <Order 
                setPagination={setPagination}
                setPage={setPage}
                setMaxPages={setMaxPages}
                setOrderInput={setOrderInput} 
                isOrdered={isOrdered} 
                setIsOrdered={setIsOrdered} />
                <button onClick={handleClear} className="btn btn-outline">
                    Clear
                </button>
            </div>
            <div className="articles-div">
                <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => {
                        return (
                            <div key={article.article_id} className="card card-compact bg-base-100 w-96 shadow-xl">
                                <Link key={article.article_id} to={`/${article.article_id}`}>
                                    <figure>
                                        <img src={article.article_img_url} alt={article.title} />
                                    </figure>
                                    <div className="card-body"> 
                                        <h2 className="card-title">{article.title}</h2>
                                        <p>
                                            <em>{article.topic}</em>
                                        </p>
                                        <div className="article-info">
                                            <p>{article.comment_count}<img style={{marginRight: "0.5rem",marginLeft: "0.3rem", marginTop: "0.1rem" , width: "25px"}} src={isDark ? './assets/comment-night.png' : "./assets/comments.png"} /></p>
                                            <p>{article.votes}{isDark ? 
                                            <img style={{width: "25px"}} src={article.votes >= 0 ? './assets/upvote-night.png' : './assets/downvote-night.png'} /> 
                                            : 
                                            <img style={{width: "25px"}} src={article.votes >= 0 ? './assets/upvote.png' : './assets/downvote.png'} />}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="more-pages">
                {!maxPages && <button style={{marginTop: "2rem", marginBottom: "2rem"}} onClick={newPage} className="btn btn-active btn-primary btn-wide">More</button>}
            </div>
        </div>
    );
}

export default Articles;
