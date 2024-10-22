import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticle, incArticleVotes } from "../api";
import Comments from "./Comments";
import Loading from "./Loading";
import { ErrorContext } from "../contexts/Error";
import Author from "./Author";
import TopArticles from "./TopArticles";
import RelatedArticles from "./RelatedArticles";
import Edit from "./Edit";
import Delete from "./Delete";
import { UserContext } from "../contexts/User";
import { ThemeContext } from "../contexts/ThemeContext";
import NoUserModal from "./NoUserModal";
import Share from "./Share";

function Article() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [upvote, setUpvote] = useState(false);
  const [downVote, setDownvote] = useState(false);
  const [votes, setVotes] = useState(0);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [parsedDate, setParsedDate] = useState("");
  const [modal, setModal] = useState(false);
  const [share, setShare] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const { article_id } = useParams();
  const { setError } = useContext(ErrorContext);

  const navigate = useNavigate();

  if (!Number(article_id)) {
    setError([
      {
        msg: "Bad Request",
        code: 400,
      },
    ]);
    return <Navigate to="/error" replace />;
  }

  useEffect(() => {
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setLoading(false);
        setVotes(article.votes);
        const date = article.created_at.split("T");
        setParsedDate(date[0]);
      })
      .catch((err) => {
        setError([{ code: 404, msg: "Not Found" }]);
        navigate("/error");
      });
  }, [article_id]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <Loading />;
  }

  function handleUpvote() {
    if (user) {
      let increment = 1;

      if (hasUpVoted) {
        setUpvote(false);
        setHasUpVoted(false);
        increment = -1;
      } else {
        setUpvote(true);
        setHasUpVoted(true);
      }

      if (downVote) {
        increment = 2;
        setDownvote(false);
        setHasDownVoted(false);
        setUpvote(true);
      }

      setVotes((currVotes) => {
        return currVotes + increment;
      });

      incArticleVotes(article.article_id, increment).catch(() => {
        setVotes((currVotes) => {
          return currVotes - 1;
        });
        setUpvote(false);
      });
    } else {
      setModal(true);
    }
  }

  function handleDownvote() {
    if (user) {
      let increment = -1;

      if (hasDownVoted) {
        setDownvote(false);
        setHasDownVoted(false);
        increment = 1;
      } else {
        setDownvote(true);
        setHasDownVoted(true);
      }

      if (upvote) {
        increment = -2;
        setUpvote(false);
        setHasUpVoted(false);
        setDownvote(true);
      }

      setVotes((currVotes) => {
        return currVotes + increment;
      });

      incArticleVotes(article.article_id, increment).catch(() => {
        setVotes((currVotes) => {
          return currVotes + 1;
        });
        setDownvote(false);
      });
    } else {
      setModal(true);
    }
  }

  function handleDelete(article_id) {
    deleteArticle(article_id).then(() => {
      navigate("/");
    });
  }

  // width 768 grid 2 cols

  // width 1037 grid 3 cols "grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className="article-page flex justify-between" >
      {/* <div className={windowDimensions.width >= 1037 ? "article-cont grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : (windowDimensions.width >= 768 ? "grid gap-[50px] grid-cols-1 md:grid-cols-2" : "grid gap-[50px] grid-cols-1")}>
        {windowDimensions.width >= 768 && <TopArticles/>}  */}
      {/* <div className="article">
          <div style={{paddingBottom: "3.5rem"}} className="card bg-base-100 w-96 shadow-xl">
            <figure className="figure-container">
              <img src={article.article_img_url} alt={article.title} />
              <div className="card-actions button-container">
                {/* I will make these buttons appear conditionally once I have made a component for users and only allow it if user === author */}
      {/* </div>
            </figure>
            <Author className = "card-body w-50" author = {article.author}/>
            <div className="votes-btn">
              {isDark ? 
               <button onClick={handleUpvote} className="vote-btn btn btn-ghost" ><img style={{width: "30px"}} src={upvote ? "/assets/upvote-night.png" : "/assets/uparrow-night.png" } /></button>
                : 
                <button onClick={handleUpvote} className="vote-btn btn btn-ghost" ><img style={{width: "30px"}} src={upvote ? "/assets/upvote.png" : "/assets/up-arrow.png" } /></button>
              }
              <p>{votes}</p>
              {isDark ? 
              <button onClick={handleDownvote} className="vote-btn btn btn-ghost" ><img style={{width: "30px"}} src={downVote ? "/assets/downvote-night.png" : "/assets/down-arrow-night.png" } /></button>
              :
              <button onClick={handleDownvote} className="vote-btn btn btn-ghost" ><img style={{width: "30px"}} src={downVote ? "/assets/downvote.png" : "/assets/down-arrow.png" } /></button>
              }
          </div>
            <div className="card-body w-50">
              <p><em>{parsedDate}</em></p>
              <p>{article.topic}</p>
              <h2 className="card-title">{article.title}</h2>
              <p>{article.body}</p>
            </div>
            {user &&
            user.username === article.author && 
            <div style={{ marginBottom: "2rem"}} className="edit-delete">
              <button className = "btn btn-ghost"><Edit /></button>
              <button onClick={() => handleDelete(article.article_id)} className="btn btn-ghost"><Delete /></button>
            </div>}
            
          </div>
        </div> */}

      
      {modal && <NoUserModal setModal={setModal} />}
      {share && <Share setShare={setShare} />}
      <div className={windowDimensions.width > 1037 ? "indv-article" : "indv-article-full"}>
        <article style={{margin: "0 auto"}} className={`indivdual-article m-3 ${windowDimensions.width < 1037 && 'pr-4 pl-4'}`}>
          <h2 style={{ fontSize: "30px" }}>
            <b>{article.title}</b>
          </h2>
          <img className="mt-2" src={article.article_img_url} />
          <p className="mt-2" >{article.body}</p>
          <div className="individual-article-info flex justify-between gap-5 mt-2">
            <div className="article-date-author flex gap-5 m-2">
              <Author windowWidth={windowDimensions.width} author={article.author} />
            </div>
            <p className="mt-6">
                {windowDimensions.width > 570 && <em style={{ fontSize: "90%" }}>{`  ${parsedDate}`}</em>}
              </p>
            <div className="flex items-center gap-3 mt-1 border-1">
              <div
                className={`votes-btn-comment gap-2 h-[40px]`}
              >
                {isDark ? (
                  <button
                    onClick={handleUpvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    <img
                      style={{ width: "25px", marginTop: "0.4rem" }}
                      src={
                        upvote
                          ? "/assets/upvote-night.png"
                          : "/assets/uparrow-night.png"
                      }
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleUpvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    <img
                      style={{ width: "25px", marginTop: "0.4rem" }}
                      src={
                        upvote ? "/assets/upvote.png" : "/assets/up-arrow.png"
                      }
                    />
                  </button>
                )}
                <p style={{ marginTop: "0.5rem"}}>{votes}</p>
                {isDark ? (
                  <button
                    onClick={handleDownvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    <img
                      style={{ width: "25px", marginTop: "0.4rem" }}
                      src={
                        downVote
                          ? "/assets/downvote-night.png"
                          : "/assets/down-arrow-night.png"
                      }
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleDownvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    <img
                      style={{ width: "25px", marginTop: "0.4rem" }}
                      src={
                        downVote
                          ? "/assets/downvote.png"
                          : "/assets/down-arrow.png"
                      }
                    />
                  </button>
                )}
              </div>
              <button onClick={() => setShare(true)} className="btn btn-outline btn-sm h-[40px]">
                <img
                  style={{ width: "25px" }}
                  src={isDark ? "/assets/share-night.png" : "/assets/share.png"}
                />
                {windowDimensions.width > 450 && 'Share'}
              </button>
            </div>
          </div>
        </article>
        <Comments article_id={article.article_id} windowSize={windowDimensions.width} />
      </div>
      {windowDimensions.width >= 1037 && 
      <div>
        <RelatedArticles key="related" topic={article.topic} windowSize={windowDimensions.width}/>
        <TopArticles key="top" windowSize={windowDimensions.width}/>
      </div>
      }
    </div>
  );
}

export default Article;
