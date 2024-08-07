import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getArticle, incArticleVotes } from "../api";
import Comments from "./Comments";
import Loading from "./Loading";
import { ErrorContext } from "../contexts/Error";

function Article() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [upvote, setUpvote] = useState(false)
  const [downVote, setDownvote] = useState(false)
  const [votes, setVotes] = useState(0)

  const { article_id } = useParams();
  const { setError } = useContext(ErrorContext)

  const navigate = useNavigate()
  

  if(!Number(article_id)){
    setError([{
        msg: "Bad Request",
        code: 400
      }])
    return (
        <Navigate to="/error" replace/>
    )
  }

  useEffect(() => {
    getArticle(article_id)
    .then((article) => {
      setArticle(article);
      setLoading(false);
      setVotes(article.votes)
    })
    .catch((err) => {
      setError([{code: 404, msg: 'Not Found'}])
      navigate('/error')
    })
  }, []);

  if (loading) {
    return <Loading />;
  }

  function handleUpvote(){
    setUpvote(true)
    let increment = 1
    
    if(downVote){
      increment ++
      setDownvote(false)
    }

    setVotes((currVotes) => {
        return currVotes + increment
    })

    incArticleVotes(article.article_id,increment)
    .catch(() => {
        setVotes((currVotes) => {
            return currVotes - 1
        })
        setUpvote(false)
    })
  }

  function handleDownvote(){
    setDownvote(true)
    let increment = -1

    if(upvote){
      increment --
      setUpvote(false)
    }

    setVotes((currVotes) => {
      return currVotes + increment
    })

    incArticleVotes(article.article_id,increment)
    .catch(() => {
        setVotes((currVotes) => {
            return currVotes + 1
        })
        setDownvote(false)
    })
  }

  return (
    <>
      <div className="article">
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="figure-container">
            <img src={article.article_img_url} alt={article.title} />
            <div className="card-actions button-container">
              {/* I will make these buttons appear conditionally once I have made a component for users and only allow it if user === author */}
            </div>
          </figure>
          <div className="votes-btn">
            <button onClick={handleUpvote} className={!upvote ? "btn btn-neutral" : "btn btn-accent"} >+</button>
            <div className="badge">{votes}</div>
            <button onClick={handleDownvote} className={!downVote ? "btn" : "btn btn-error"} >-</button>
          </div>
          <div className="card-body w-50">
            <p>{article.created_at}</p>
            <p>{article.topic}</p>
            <h2 className="card-title">{article.title}</h2>
            <p>{article.body}</p>
            <p>Written by: {article.author}</p>
          </div>
          <div className="card-actions justify-end">
            <button className = "btn btn-primary">Edit</button>
            <button className="btn btn-accent">X</button>
            {/* I will make these buttons appear conditionally once I have made a component for users and only allow it if user === author */}
          </div>
        </div>
      </div>
      <Comments article_id={article.article_id} />
    </>
  );
}

export default Article;
