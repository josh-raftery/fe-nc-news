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
import Divider from "./Divider";

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
              > <button
                    onClick={handleUpvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    {upvote ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{ width: "25px", marginTop: "0.4rem" }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2823 5856 c-585 -714 -2027 -2536 -2036 -2571 -7 -26 2 -66 21 -95 l33 -50 619 0 620 0 0 -1451 c0 -1570 -3 -1526 109 -1629 l54 -50 757 0 757 0 54 50 c112 103 109 59 109 1629 l0 1451 620 0 619 0 33 50 c54 83 46 94 -1056 1470 -1239 1545 -1118 1435 -1313 1196z m-839 -2451 c-147 -3 -381 -3 -520 0 -140 3 -20 6 266 6 286 0 400 -3 254 -6z m2501 0 c-135 -3 -355 -3 -490 0 -135 4 -24 6 245 6 270 0 380 -2 245 -6z"/> </g> </svg> : <svg version="1.0" style={{ width: "25px", marginTop: "0.4rem" }} xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill='currentColor' viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" > <path d="M1411 2928 c-292 -357 -1013 -1268 -1017 -1286 -4 -13 1 -33 10 -47 l16 -25 310 0 310 0 0 -725 c0 -786 -1 -763 55 -815 l27 -25 378 0 378 0 27 25 c56 52 55 29 55 815 l0 725 310 0 310 0 16 25 c9 14 14 34 10 47 -3 13 -245 322 -538 688 -619 773 -559 718 -657 598z m542 -661 l449 -562 -269 -5 c-147 -3 -269 -7 -270 -8 -1 -1 -9 -9 -17 -18 -14 -14 -16 -98 -16 -780 l0 -764 -330 0 -330 0 0 764 c0 682 -2 766 -16 780 -8 9 -16 17 -17 18 -1 1 -123 5 -270 8 l-269 5 449 562 c246 309 450 562 453 562 3 0 207 -253 453 -562z"/> </g> </svg>}
                    
                </button>
                  
                <p style={{ marginTop: "0.5rem"}}>{votes}</p>
                
                  <button
                    onClick={handleDownvote}
                    className="vote-btn btn btn-ghost btn-sm btn-circle"
                  >
                    {downVote ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{ width: "25px", marginTop: "0.4rem" }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor"> <path d="M2250 5981 c-55 -23 -123 -100 -149 -167 -14 -38 -21 -528 -21 -1505 l0 -1449 -620 0 -619 0 -33 -50 c-54 -83 -46 -94 1056 -1470 1045 -1304 1067 -1330 1136 -1330 69 0 91 26 1136 1330 1102 1376 1110 1387 1056 1470 l-33 50 -619 0 -620 0 0 1451 c0 1570 3 1526 -109 1629 l-54 50 -734 4 c-403 2 -751 -3 -773 -13z m1016 -256 c-156 -3 -417 -3 -580 0 -163 3 -35 6 284 6 319 0 452 -3 296 -6z"/> </g> </svg>  : <svg style={{marginTop: '0.4rem'}} fill='currentColor' version="1.0" xmlns="http://www.w3.org/2000/svg"  width="25px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"> <path d="M1125 2991 c-27 -12 -62 -50 -74 -84 -8 -19 -11 -264 -11 -753 l0 -724 -310 0 -310 0 -16 -25 c-9 -14 -14 -34 -10 -47 3 -13 245 -322 538 -688 522 -652 534 -665 568 -665 34 0 46 13 568 665 293 366 535 675 538 688 4 13 -1 33 -10 47 l-16 25 -310 0 -310 0 0 725 c0 786 1 763 -55 815 l-27 25 -366 2 c-202 1 -376 -2 -387 -6z m705 -885 c0 -682 2 -766 16 -780 8 -9 16 -17 17 -18 1 -1 123 -5 270 -8 l269 -5 -449 -562 c-246 -309 -450 -562 -453 -562 -3 0 -207 253 -453 562 l-449 562 269 5 c147 3 269 7 270 8 1 1 9 9 17 18 14 14 16 98 16 780 l0 764 330 0 330 0 0 -764z"/> </g> </svg> }
                     
                  </button>
 
              </div>
              <button onClick={() => setShare(true)} className="btn btn-outline btn-sm h-[40px]">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  width="25px"viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M1590 2641 l0 -349 -97 -11 c-206 -25 -370 -75 -558 -167 -416 -204 -736 -584 -864 -1025 -59 -201 -63 -240 -68 -679 -3 -223 -3 -403 0 -400 3 3 51 111 107 240 122 281 166 368 239 471 278 388 695 630 1179 685 l62 7 0 -352 c0 -193 3 -351 6 -351 3 0 137 107 297 239 161 131 472 385 692 565 220 180 401 331 403 335 3 9 -37 42 -850 704 -295 240 -539 437 -542 437 -3 0 -6 -157 -6 -349z m392 -187 c139 -114 666 -543 736 -599 5 -4 -941 -775 -950 -775 -4 0 -8 115 -8 255 l0 255 -74 0 c-179 0 -423 -42 -595 -102 -335 -116 -666 -359 -860 -630 -19 -27 -36 -46 -39 -44 -8 9 39 208 70 295 72 203 181 380 332 538 157 164 322 278 521 358 167 67 313 97 548 111 l97 6 0 250 c0 212 2 249 14 245 8 -3 101 -77 208 -163z"/> </g> </svg> 
                {windowDimensions.width > 450 && 'Share'}
              </button>
            </div>
          </div>
        </article>
        {windowDimensions.width < 1037 && 
          <div className=" mr-5 ml-5">
            <div className="divider"/>
            <RelatedArticles narrow={true} key="related" topic={article.topic} windowSize={windowDimensions.width}/>
            <div className="divider remove-margin"/>
            <TopArticles narrow={true} key="top" windowSize={windowDimensions.width}/>  
            <div className="divider remove-margin"/>
          </div>
        }
        <Comments comment_count={article.comment_count} article_id={article.article_id} windowSize={windowDimensions.width} />
      </div>
      {windowDimensions.width >= 1037 && 
      <div className="w-[100%]">
        <RelatedArticles narrow={false} key="related" topic={article.topic} windowSize={windowDimensions.width}/>
        <div className="divider remove-margin"/>
        <TopArticles narrow={false} key="top" windowSize={windowDimensions.width}/>
      </div>
      }
    </div>
  );
}

export default Article;
