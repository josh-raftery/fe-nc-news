import { useContext, useEffect, useState } from "react";
import { deleteComment, getComments, postComment } from "../api";
import Loading from "./Loading";
import { UserContext } from "../contexts/User";

function Comments({ article_id }) {

  const [badComment,setBadComment] = useState(false)
  const [badPost, setBadPost] = useState(false)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)
  const [didDeleteFail, setDidDeleteFail] = useState(false)
  const [deleteFailComment, setDeleteFailComment] = useState(0)
  const { user } = useContext(UserContext)
  const [userData] = user

  function handleChange(event){
    setComment(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()
    if(!comment){
      setBadComment(true)
    } else{
      setBadComment(false)
      return postComment(article_id,userData.username,comment)
      .then((newComment) => {
        setComments((currComments) => [newComment, ...currComments])
        setBadPost(false)
        setComment("")
      })
      .catch((err) => {
        setBadPost(true)
      })
    }
  }

  function handleDeleteComment(deletedComment,index){
    const {comment_id} = deletedComment
    setComments((currComment) => {
      return currComment.filter((element) => {
        if(element.comment_id != comment_id){
          return element
        }
      })
    })
    deleteComment(comment_id)
    .then(() => {
      setDidDeleteFail(false)
      setDeleteFailComment(0)
    })
    .catch(() => {
      setComments((currComments) => {
        currComments.splice(index,0,deletedComment)
        return currComments
      })
      setDidDeleteFail(true)
      setDeleteFailComment(comment_id)
    })
  }

  useEffect(() => {
    getComments(article_id)
    .then((apiComments) => {
      setComments(apiComments)
      setLoading(false)
    })
    .catch((err) => {
        setLoading(false)
    })
  }, []);

  if(loading){
    return (
        <Loading/>
    )
  }

  return (
    <>
      <div style={{marginLeft: "1rem"}} className="post-comment">
        <label className="form-control w-full max-w-xs">
          <input
            value={comment}
            type="text"
            placeholder={badComment ? "Comment empty" :"Type here"}
            className={badPost || badComment ? "input input-bordered input-error w-full max-w-xs" : "input input-bordered input-primary w-full max-w-xs"} 
            onChange={handleChange}
          />
          <div className="label">
            <span className="label-text-alt">{badPost ? "Poor connection, try again later" : ""}</span>
          </div>
        </label>
        <button onClick={handleSubmit} style={{marginLeft: "1rem"}} className={badPost || badComment ? "input input-bordered input-error" : "btn btn-outline btn-primary"}>Post</button>
      </div>
        {comments.map((currentComment,index) => {
            return (
              <div key = {currentComment.comment_id} className="comment-div">
                <div 
                key={currentComment.comment_id} 
                className="card bg-base-100 shadow-xl"
                style={deleteFailComment === currentComment.comment_id ? {border: "solid red"} : {}}
                >
                  <div style={{marginBottom: "2rem"}}
                  className="card-body">
                      <p>{currentComment.body}</p>
                      {currentComment.author === userData.username &&  
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline">Edit</button>
                            <button onClick={() => handleDeleteComment(currentComment,index)} className={didDeleteFail ? "btn btn-outline btn-error" : "btn btn-outline"}>X</button>
                            <div className="label">
                              <span className="label-text-alt">{deleteFailComment === currentComment.comment_id ? "Poor connection, try again later" : ""}</span>
                              </div>
                          </div>
                      }
                  </div>
                </div>
              </div>
            )
        })}
    </>
  );
}

//post comment
//need author - user
//aericle_id

export default Comments;
