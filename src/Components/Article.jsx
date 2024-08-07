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
  const [hasUpVoted,setHasUpVoted] = useState(false)
  const [hasDownVoted,setHasDownVoted] = useState(false)
  const [parsedDate,setParsedDate] = useState("")

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
      const date = article.created_at.split('T')
      setParsedDate(date[0])
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
    let increment = 1

    if(hasUpVoted){
      setUpvote(false)
      setHasUpVoted(false)
      increment = -1
    } else{
      setUpvote(true)
      setHasUpVoted(true)
    }
    
    if(downVote){
      increment = 2
      setDownvote(false)
      setHasDownVoted(false)
      setUpvote(true)
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
    let increment = -1

    if(hasDownVoted){
      setDownvote(false)
      setHasDownVoted(false)
      increment = 1
    } else{
      setDownvote(true)
      setHasDownVoted(true)
    }

    if(upvote){
      increment = -2
      setUpvote(false)
      setHasUpVoted(false)
      setDownvote(true)
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
            <p><em>{parsedDate}</em></p>
            <p>{article.topic}</p>
            <h2 className="card-title">{article.title}</h2>
            <p>{article.body}</p>
            <p>Written by: {article.author}</p>
          </div>
          <div style={{marginBottom: "2rem"}} className="card-actions justify-end">
            <button className = "btn btn-outline">Edit</button>
            <button className="btn btn-outline">X</button>
            {/* I will make these buttons appear conditionally once I have made a component for users and only allow it if user === author */}
          </div>
        </div>
      </div>
      <Comments article_id={article.article_id} />
    </>
  );
}

export default Article;
