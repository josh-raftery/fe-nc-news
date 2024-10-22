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

function Comments({ article_id }) {
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

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    console.log('test')
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
            setComments((currComments) => [newComment, ...currComments]);
            setBadPost(false);
            setComment("");
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

      console.log(votes, "<---------");

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

  useEffect(() => {
    getComments(article_id)
      .then((apiComments) => {
        setComments(apiComments);
        const votesObj = {};
        apiComments.forEach((comment) => {
          votesObj[comment.comment_id] = comment.votes;
        });
        setVotes(votesObj);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

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

  return (
    <div style={{ marginBottom: "1rem", marginRight: "3rem" }}>
      {modal && <NoUserModal setModal={setModal} />}
      <div style={{marginTop: "3rem", marginBottom: "2rem"}} className="comment-input pr-5" >
        <section className="profile-section">
            <img
              className="user-profile-picture"
              src={user ? user.avatar_url : isDark ? "/assets/profile-night.png" : "/assets/profile.png"}
            />
        </section>
        <section style={{width: "200px"}} className="make-comment relative" >
            <input
              className ={isDark ? "post-comment-night bg-base-100 " : "post-comment bg-base-100"}
              placeholder={badComment ? "Comment empty" : "Add a comment..."}
              onChange={handleChange}
              value={comment}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            ></input>
            <div className="post-comment-buttons" >
              <button className="comment-buttons btn btn-ghost btn-sm h-10" >Cancel</button>
              <button onClick={handleSubmit} className="comment-buttons btn btn-outline btn-sm h-10" >Comment</button>
            </div>
        </section>
      </div>
      {comments.map((comment, index) => {
        return (
          <div className="comment pr-5">
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
                      <img
                        style={{ width: "20px" }}
                        src={
                          upvote[comment.comment_id]
                            ? "/assets/upvote-night.png"
                            : "/assets/uparrow-night.png"
                        }
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpvote(comment.comment_id)}
                      className="vote-btn  btn btn-ghost btn-sm btn-circle"
                    >
                      <img
                        style={{ width: "20px" }}
                        src={
                          upvote[comment.comment_id]
                            ? "/assets/upvote.png"
                            : "/assets/up-arrow.png"
                        }
                      />
                    </button>
                  )}
                  <p style={{ fontSize: "80%", marginTop: "0.4rem" }}>
                    {votes[comment.comment_id] || 0}
                  </p>
                  {isDark ? (
                    <button
                      onClick={() => handleDownvote(comment.comment_id)}
                      className="vote-btn btn btn-ghost btn-sm btn-circle"
                    >
                      <img
                        style={{ width: "20px" }}
                        src={
                          downVote[comment.comment_id]
                            ? "/assets/downvote-night.png"
                            : "/assets/down-arrow-night.png"
                        }
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownvote(comment.comment_id)}
                      className="vote-btn btn btn-ghost btn-sm btn-circle"
                    >
                      <img
                        style={{ width: "20px" }}
                        src={
                          downVote[comment.comment_id]
                            ? "/assets/downvote.png"
                            : "/assets/down-arrow.png"
                        }
                      />
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

//post comment
//need author - user
//aericle_id

export default Comments;
