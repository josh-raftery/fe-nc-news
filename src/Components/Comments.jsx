import { useContext, useEffect, useState } from "react";
import {
  deleteComment,
  getComments,
  getUser,
  incCommentVotes,
  postComment,
} from "../api";
import Loading from "./Loading";
import { UserContext } from "../contexts/User";
import Delete from "./Delete";
import Edit from "./Edit";
import { ThemeContext } from "../contexts/ThemeContext";
import NoUserModal from "./NoUserModal";
import Plus from "./Plus";

function Comments({ article_id,windowSize,comment_count }) {
  const [badComment, setBadComment] = useState(false);
  const [badPost, setBadPost] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [didDeleteFail, setDidDeleteFail] = useState(false);
  const [deleteFailComment, setDeleteFailComment] = useState(0);
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);
  const [userProfilePictures, setUserProfilePictures] = useState([]);
  const [parsedDate, setParsedDate] = useState([]);
  const [upvote, setUpvote] = useState({});
  const [downVote, setDownvote] = useState({});
  const [votes, setVotes] = useState({});
  const [hasUpVoted, setHasUpVoted] = useState({});
  const [hasDownVoted, setHasDownVoted] = useState({});
  const [commentFocus, setCommentFocus] = useState(false)
  const [page,setPage] = useState(1)
  const [maxPages,setMaxPages] = useState(0)
  const [end,setEnd] = useState(false)

  const limit = 10

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
       event.preventDefault();
    if (!comment) {
      setBadComment(true);
    } else {
      if (!user) {
        setModal(true);
      } else {
        setBadComment(false);
        return postComment(article_id, user.username, comment)
          .then((newComment) => {
            setComments((currComments) => [...newComment, ...currComments]);
            if(!maxPages){
              setMaxPages(comment_count / limit)
            }
            setBadPost(false);
            setComment("");
            setCommentFocus(false)
          })
          .catch((err) => {
            setBadPost(true);
          });
      }
    }
  }

  function handleDeleteComment(deletedComment, index) {
    const { comment_id } = deletedComment;
    setComments((currComment) => {
      return currComment.filter((element) => {
        if (element.comment_id != comment_id) {
          return element;
        }
      });
    });
    deleteComment(comment_id)
      .then(() => {
        setDidDeleteFail(false);
        setDeleteFailComment(0);
      })
      .catch(() => {
        setComments((currComments) => {
          currComments.splice(index, 0, deletedComment);
          return currComments;
        });
        setDidDeleteFail(true);
        setDeleteFailComment(comment_id);
      });
  }

  function handleUpvote(comment_id) {
    if (user) {
      let increment = 1;

      if (hasUpVoted[comment_id]) {
        setUpvote((currUpvote) => {
          let newUpvote = { ...currUpvote };
          newUpvote[comment_id] = false;
          return newUpvote;
        });
        setHasUpVoted((currHasUpvoted) => {
          let newHasUpvoted = { ...currHasUpvoted };
          newHasUpvoted[comment_id] = false;
          return newHasUpvoted;
        });
        increment = -1;
      } else {
        setUpvote((currUpvote) => {
          let newUpvotes = { ...currUpvote };
          newUpvotes[comment_id] = true;
          return newUpvotes;
        });
        setHasUpVoted((currHasUpvoted) => {
          let newHasUpvoted = { ...currHasUpvoted };
          newHasUpvoted[comment_id] = true;
          return newHasUpvoted;
        });
      }

      if (downVote[comment_id]) {
        increment = 2;
        setDownvote((currDownvotes) => {
          let newDownvotes = { ...currDownvotes };
          newDownvotes[comment_id] = false;
          return newDownvotes;
        });
        setHasDownVoted((currHasDownvoted) => {
          let newHasDownvoted = { ...currHasDownvoted };
          newHasDownvoted[comment_id] = false;
          return newHasDownvoted;
        });
        setUpvote((currUpvote) => {
          let newUpvote = { ...currUpvote };
          newUpvote[comment_id] = true;
          return newUpvote;
        });
      }

      setVotes((currVotes) => {
        let newVotes = currVotes;
        newVotes[comment_id] += increment;
        return newVotes;
      });


      incCommentVotes(comment_id, increment).catch(() => {
        setVotes((currVotes) => {
          let newVotes = currVotes;
          newVotes[comment_id] -= 1;
          return newVotes;
        });
        setUpvote((currUpvote) => {
          let newUpvote = { ...currUpvote };
          newUpvote[comment_id] = false;
          return newUpvote;
        });
      });
    } else {
      setModal(true);
    }
  }

  function handleDownvote(comment_id) {
    if (user) {
      let increment = -1;

      if (hasDownVoted[comment_id]) {
        setDownvote((currDownvote) => {
          let newDownvotes = { ...currDownvote };
          newDownvotes[comment_id] = false;
          return newDownvotes;
        });
        setHasDownVoted((currHasDownvoted) => {
          let newHasDownvoted = { ...currHasDownvoted };
          newHasDownvoted[comment_id] = false;
          return newHasDownvoted;
        });
        increment = 1;
      } else {
        setDownvote((currDownvotes) => {
          let newDownvotes = { ...currDownvotes };
          newDownvotes[comment_id] = true;
          return newDownvotes;
        });
        setHasDownVoted((currHasDownvoted) => {
          let newHasDownvoted = { ...currHasDownvoted };
          newHasDownvoted[comment_id] = true;
          return newHasDownvoted;
        });
      }

      if (upvote[comment_id]) {
        increment = -2;
        setUpvote((currUpvote) => {
          let newUpvote = { ...currUpvote };
          newUpvote[comment_id] = false;
          return newUpvote;
        });
        setHasUpVoted((currHasUpvoted) => {
          let newHasUpvoted = { ...currHasUpvoted };
          newHasUpvoted[comment_id] = false;
          return newHasUpvoted;
        });
        setDownvote((currDownvote) => {
          let newDownvote = { ...currDownvote };
          newDownvote[comment_id] = true;
          return newDownvote;
        });
      }

      setVotes((currVotes) => {
        let newVotes = { ...currVotes };
        newVotes[comment_id] += increment;
        return newVotes;
      });

      incCommentVotes(comment_id, increment).catch(() => {
        setVotes((currVotes) => {
          let newVotes = { ...currVotes };
          newVotes[comment_id] += 1;
          return newVotes;
        });
        setDownvote((currDownvote) => {
          let newDownvote = { ...currDownvote };
          newDownvote[comment_id] = false;
          return newDownvote;
        });
      });
    } else {
      setModal(true);
    }
  }

  console.log(end)  
  console.log(maxPages)  

  useEffect(() => {
    if(maxPages){
      if(page === Math.ceil(maxPages)){
        setEnd(true)
      } 
    }

    getComments(article_id,{p: page})
      .then((apiComments) => {
        console.log(apiComments)
        if(!maxPages){
          setMaxPages(comment_count / limit)
        }
        if(page > 1){
          setComments((currComments) => [...currComments,...apiComments]);
        } else {
          setComments(apiComments)
        }
            
        const votesObj = {};
        apiComments.forEach((comment) => {
          votesObj[comment.comment_id] = comment.votes;
        });
        setVotes(votesObj);
        setLoading(false);
        setCommentFocus(false)
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [page,maxPages]);

  useEffect(() => {
    if (comments.length > 1) {
      const usersPromises = comments.map((comment) => {
        let date = comment.created_at.split("T");
        setParsedDate((currDate) => [...currDate, date[0]]);
        return getUser(comment.author);
      });
      Promise.all(usersPromises).then((users) => {
        setUserProfilePictures(users.map((user) => user.avatar_url));
      });
    }
  }, [comments]);

  if (loading) {
    return <Loading />;
  }

  console.log(end)

  return (
    <div style={{ marginBottom: "1rem", marginRight: "3rem", width: "100%" }}>
      {modal && <NoUserModal setModal={setModal} />}
      <div style={{marginTop: "3rem", marginBottom: "2rem"}} className={`${windowSize > 1037 ? 'comment-input' : 'comment-input-full'} w-full pr-5`} >
        <section className="profile-section">
             {user ? <img
              className="user-profile-picture"
              src={user.avatar_url}
            /> : <svg className="circle w-[45px] h-[45px] top-0 relative left-[50%]" version="1.0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" > <path d="M1325 2985 c-203 -44 -400 -199 -495 -390 -95 -192 -95 -447 1 -636 98 -196 272 -335 481 -384 92 -22 258 -19 352 5 187 47 354 180 454 360 107 192 109 446 5 660 -39 81 -59 108 -137 185 -72 72 -109 99 -176 133 -47 24 -110 50 -140 58 -83 22 -261 27 -345 9z m300 -180 c166 -44 324 -196 375 -364 24 -75 28 -215 10 -296 -32 -144 -153 -292 -292 -359 -214 -103 -454 -61 -624 108 -221 220 -216 562 10 779 105 101 219 146 366 147 55 0 121 -7 155 -15z"/> <path d="M752 1530 c-103 -27 -167 -64 -242 -140 -162 -164 -245 -415 -257 -770 -6 -202 2 -256 53 -359 61 -122 187 -216 333 -247 100 -21 1615 -20 1716 1 205 43 351 194 386 398 8 48 9 117 5 205 -19 386 -125 671 -304 815 -93 75 -278 131 -373 113 -20 -3 -83 -36 -140 -73 -158 -101 -307 -153 -436 -153 -113 1 -248 45 -374 122 -168 102 -180 108 -239 107 -30 0 -88 -9 -128 -19z m247 -222 c185 -120 332 -163 531 -155 181 6 306 49 487 168 75 49 80 51 135 46 255 -22 413 -325 413 -793 0 -170 0 -171 -30 -229 -21 -40 -46 -71 -79 -96 -96 -72 -56 -70 -976 -67 l-825 3 -50 23 c-142 65 -193 179 -181 401 24 421 141 672 347 745 86 30 122 23 228 -46z"/> </g> </svg> }
        </section>
        <section style={{width: "200px"}} className={`${windowSize > 1037 ? 'make-comment' : 'make-comment-full'} relative w-full`} >
            <input
              className ={isDark ? "post-comment-night bg-base-100 " : "post-comment bg-base-100"}
              placeholder={badComment ? "Comment empty" : "Add a comment..."}
              onChange={handleChange}
              value={comment}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              onFocus={() => setCommentFocus(true)}
              onBlur={() => setCommentFocus(false)}
            ></input>
            {commentFocus &&
            <div className="post-comment-buttons" >
              <button className="comment-buttons btn btn-ghost btn-sm h-10">Cancel</button>

              <button
                onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking the button
                onClick={handleSubmit}
                className="comment-buttons btn btn-outline btn-sm h-10"
              >
                Comment
              </button>
            </div>}
        </section>
      </div>
      {comments.map((comment, index) => {
        return (
          <div className={`${windowSize > 1037 ? 'comment' : 'comment-full'} pr-5`}>
            <section className="profile-section">
              <img
                className="user-profile-picture"
                src={userProfilePictures[index]}
              />
            </section>
            <section className="comment-section">
              <div className="date-username">
                <p>
                  <b>{comment.author}</b>
                </p>
                <p style={{ fontSize: "70%", marginTop: "0.3rem" }}>
                  <em>{parsedDate[index]}</em>
                </p>
              </div>
              <div className="text">
                <p>{comment.body}</p>
              </div>
              <div className="likes-edit-delete">
                <div className="votes-btn-comment">
                  {isDark ? (
                    <button
                      onClick={() => handleUpvote(comment.comment_id)}
                      className="vote-btn  btn btn-ghost btn-sm btn-circle"
                    >
                      {upvote[comment.comment_id]
                            ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2823 5856 c-585 -714 -2027 -2536 -2036 -2571 -7 -26 2 -66 21 -95 l33 -50 619 0 620 0 0 -1451 c0 -1570 -3 -1526 109 -1629 l54 -50 757 0 757 0 54 50 c112 103 109 59 109 1629 l0 1451 620 0 619 0 33 50 c54 83 46 94 -1056 1470 -1239 1545 -1118 1435 -1313 1196z m-839 -2451 c-147 -3 -381 -3 -520 0 -140 3 -20 6 266 6 286 0 400 -3 254 -6z m2501 0 c-135 -3 -355 -3 -490 0 -135 4 -24 6 245 6 270 0 380 -2 245 -6z"/> </g> </svg>
                            : <svg version="1.0" width="18px" height="18px"xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill='currentColor' viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" > <path d="M1411 2928 c-292 -357 -1013 -1268 -1017 -1286 -4 -13 1 -33 10 -47 l16 -25 310 0 310 0 0 -725 c0 -786 -1 -763 55 -815 l27 -25 378 0 378 0 27 25 c56 52 55 29 55 815 l0 725 310 0 310 0 16 25 c9 14 14 34 10 47 -3 13 -245 322 -538 688 -619 773 -559 718 -657 598z m542 -661 l449 -562 -269 -5 c-147 -3 -269 -7 -270 -8 -1 -1 -9 -9 -17 -18 -14 -14 -16 -98 -16 -780 l0 -764 -330 0 -330 0 0 764 c0 682 -2 766 -16 780 -8 9 -16 17 -17 18 -1 1 -123 5 -270 8 l-269 5 449 562 c246 309 450 562 453 562 3 0 207 -253 453 -562z"/> </g> </svg>
                        }
                      
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpvote(comment.comment_id)}
                      className="vote-btn  btn btn-ghost btn-sm btn-circle"
                    >
                      <svg version="1.0" style={{ width: "20px"}} xmlns="http://www.w3.org/2000/svg" fill={upvote[comment.comment_id] ? 'green' : 'currentColor'} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" > <path d="M1411 2928 c-292 -357 -1013 -1268 -1017 -1286 -4 -13 1 -33 10 -47 l16 -25 310 0 310 0 0 -725 c0 -786 -1 -763 55 -815 l27 -25 378 0 378 0 27 25 c56 52 55 29 55 815 l0 725 310 0 310 0 16 25 c9 14 14 34 10 47 -3 13 -245 322 -538 688 -619 773 -559 718 -657 598z m542 -661 l449 -562 -269 -5 c-147 -3 -269 -7 -270 -8 -1 -1 -9 -9 -17 -18 -14 -14 -16 -98 -16 -780 l0 -764 -330 0 -330 0 0 764 c0 682 -2 766 -16 780 -8 9 -16 17 -17 18 -1 1 -123 5 -270 8 l-269 5 449 562 c246 309 450 562 453 562 3 0 207 -253 453 -562z"/> </g> </svg>
                    </button>
                  )}
                  <p style={{ fontSize: "80%", marginTop: "0.4rem" }}>
                    {votes[comment.comment_id] || 0}
                  </p>
                    <button
                      onClick={() => handleDownvote(comment.comment_id)}
                      className="vote-btn btn btn-ghost btn-sm btn-circle"
                    >
                      {downVote[comment.comment_id] ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2250 5981 c-55 -23 -123 -100 -149 -167 -14 -38 -21 -528 -21 -1505 l0 -1449 -620 0 -619 0 -33 -50 c-54 -83 -46 -94 1056 -1470 1045 -1304 1067 -1330 1136 -1330 69 0 91 26 1136 1330 1102 1376 1110 1387 1056 1470 l-33 50 -619 0 -620 0 0 1451 c0 1570 3 1526 -109 1629 l-54 50 -734 4 c-403 2 -751 -3 -773 -13z m1016 -256 c-156 -3 -417 -3 -580 0 -163 3 -35 6 284 6 319 0 452 -3 296 -6z"/> </g> </svg> : <svg swidth="18px" height="18px" fill='currentColor' version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"> <path d="M1125 2991 c-27 -12 -62 -50 -74 -84 -8 -19 -11 -264 -11 -753 l0 -724 -310 0 -310 0 -16 -25 c-9 -14 -14 -34 -10 -47 3 -13 245 -322 538 -688 522 -652 534 -665 568 -665 34 0 46 13 568 665 293 366 535 675 538 688 4 13 -1 33 -10 47 l-16 25 -310 0 -310 0 0 725 c0 786 1 763 -55 815 l-27 25 -366 2 c-202 1 -376 -2 -387 -6z m705 -885 c0 -682 2 -766 16 -780 8 -9 16 -17 17 -18 1 -1 123 -5 270 -8 l269 -5 -449 -562 c-246 -309 -450 -562 -453 -562 -3 0 -207 253 -453 562 l-449 562 269 5 c147 3 269 7 270 8 1 1 9 9 17 18 14 14 16 98 16 780 l0 764 330 0 330 0 0 -764z"/> </g> </svg>}
                       
                      
                    </button>
                </div>
              </div>
            </section>
          </div>
        );
      })}
      {!end &&
        <div className="justify-center flex h-[70px] w-[100%]" >
        <button onClick={() => setPage((currPage) => currPage + 1)} className="btn btn-outline btn-circle" >
          <Plus/>
        </button>
       </div>}
    </div>
  );
}

//post comment
//need author - user
//aericle_id

export default Comments;
