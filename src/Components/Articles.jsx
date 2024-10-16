import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useContext, useEffect, useState } from "react";
import { getArticles } from "../api";
import { ErrorContext } from "../contexts/Error";
import Filters from "./Filters.jsx";
import Opaque from "./Opaque.jsx";
import Loading from "./Loading.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

function Articles() {
  const {isDark} = useContext(ThemeContext)

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [titleInput, setTitleInput] = useState("")
  const [search,setSearch] = useState("")
  const [isLoading, setisLoading] = useState(true)
  const [checkbox, setCheckBox] = useState({
    topic: "",
    sort_by: "",
    order: "",
  });
  const [title, setTitle] = useState("");
  const [maxPages, setMaxPages] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    isDark ? "/assets/filter-night.png" : "/assets/filter.png"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { setError } = useContext(ErrorContext);

  useEffect(() =>{
    setImgSrc(isDark ? "/assets/filter-night.png" : "/assets/filter.png");
  },[isDark])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newCheckbox = { ...checkbox };
    let newSearch = ""

    if (params.get("topic")) newCheckbox.topic = params.get("topic");
    if (params.get("sort_by")) newCheckbox.sort_by = params.get("sort_by");
    if (params.get("order")) newCheckbox.order = params.get("order");

    if(params.get("title")){
      newSearch = params.get("title")
    } 

    setSearch(newSearch)
    setCheckBox(newCheckbox);
  }, [location.search]);

  useEffect(() => {
    const params = {}

    for(let key in checkbox){
      let value = checkbox[key]
      if(value){
        params[key] = value
      }
    }

    if(search){
      params.title = search
    }

    if (page) params.p = page;
    if (limit) params.limit = limit;

    getArticles(params)
      .then((articles) => {
        setisLoading(false)
        setTitle(() => {
          let titleArr = []
          if(checkbox.topic){
            titleArr.push(`${checkbox.topic[0].toUpperCase()}${checkbox.topic.slice(1)}`) 
          } 
          if(titleInput){
            titleArr.push(titleInput)
          }
          return titleArr.join(' · ')
        })
        setTotalCount(articles[0].total_count);
        if (!pagination) {
          setArticles(articles);
        } else {
          setArticles((currArticles) => {
            return [...currArticles, ...articles];
          });
        }
      })
      .catch((err) => {
        setError([{ code: 404, msg: "Not Found" }]);
        navigate("/error");
      });
  }, [checkbox, page, limit, pagination,titleInput,search]);

  useEffect(() => {
    setisLoading(true)
    const params = new URLSearchParams();

    if (checkbox.topic) params.set("topic", checkbox.topic);
    if (checkbox.sort_by) params.set("sort_by", checkbox.sort_by);
    if (checkbox.order) params.set("order", checkbox.order);
    if (search) params.set("title", search)

    navigate({
      pathname: "/",
      search: params.toString(),
    });
  }, [checkbox, navigate]);

  function newPage() {
    setPagination(true);
    if (page * limit < totalCount) {
      setPage((currPage) => {
        return currPage + 1;
      });
    }
  }

  useEffect(() => {
    if(totalCount){
      if(page * limit > totalCount){
        setMaxPages(true)
      }   
    }
  },[page,totalCount])

  const handleMouseEnter = () => {
    setImgSrc(isDark ? "/assets/filter.png" : "/assets/filter-night.png");
  };

  const handleMouseLeave = () => {
    setImgSrc(isDark ? "/assets/filter-night.png" : "/assets/filter.png");
  };

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="articles-container" style={{ marginTop: "88px", marginLeft: "1rem" }}>
      {showFilters && (
        <>
          <Filters
            setTitle={setTitle}
            checkbox={checkbox}
            setCheckBox={setCheckBox}
            setShowFilters={setShowFilters}
            setTitleInput={setTitleInput}
            setPage={setPage}
            setPagination={setPagination}
            setMaxPages={setMaxPages}
          />
          <Opaque />
        </>
      )}
      <div className="filter-container flex justify-between items-center">
        <h2 style={{marginLeft: "7%"}} className="card-title">{title}</h2>
        <button
          onClick={() => setShowFilters(true)}
          className="filter-button btn btn-outline flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Filter & Sort
          <img
            style={{ width: "25px", marginLeft: "8px" }}
            src={imgSrc}
            alt="Filter Icon"
          />
        </button>
      </div>
      <div className="articles-div">
        <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {articles.map((article) => {
            return (
              <div
                key={article.article_id}
                className="article-card card card-compact bg-base-100 shadow-xl"
              >
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
                      <p>
                        {article.comment_count}
                        <img
                          style={{
                            marginRight: "0.5rem",
                            marginLeft: "0.3rem",
                            marginTop: "0.1rem",
                            width: "25px",
                          }}
                          src={
                            isDark
                              ? "/assets/comment-night.png"
                              : "/assets/comments.png"
                          }
                        />
                      </p>
                      <p>
                        {article.votes}
                        {isDark ? (
                          <img
                            style={{ width: "25px" }}
                            src={
                              article.votes >= 0
                                ? "/assets/upvote-night.png"
                                : "/assets/downvote-night.png"
                            }
                          />
                        ) : (
                          <img
                            style={{ width: "25px" }}
                            src={
                              article.votes >= 0
                                ? "/assets/upvote.png"
                                : "/assets/downvote.png"
                            }
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{marginBottom: "2rem" }} className="more-pages">
        {!maxPages && (
          <button
            style={{ marginTop: "2rem"}}
            onClick={newPage}
            className="btn btn-active btn-primary btn-wide"
          >
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default Articles;
