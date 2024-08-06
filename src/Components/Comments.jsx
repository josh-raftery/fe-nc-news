import { useContext, useEffect, useState } from "react";
import { getComments, postComment } from "../api";
import Loading from "./Loading";
import { UserContext } from "../contexts/User";

function Comments({ article_id }) {

  const [badComment,setBadComment] = useState(false)
  const [badPost, setBadPost] = useState(false)
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(true)
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)
  const [userData] = user

  function handleChange(event){
    setComment(event.target.value)
  }

  console.log(comments)

  function handleSumbit(event){
    event.preventDefault()
    if(!comment){
      setBadComment(true)
    } else{
      setBadComment(false)
      return postComment(article_id,userData.username,comment)
      .then(() => {
        setBadPost(false)
        setComment("")
        setSuccess(true) //trigger useEffect - feedback appreicated
      })
      .catch((err) => {
        setBadPost(true)
      })
    }
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
  }, [success]);

  if(loading){
    return (
        <Loading/>
    )
  }

  return (
    <>
      <div className="post-comment">
      <label class="form-control w-full max-w-xs">
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
        <button onClick={handleSumbit} style={{marginLeft: "1rem"}} className={badPost || badComment ? "input input-bordered input-error" : "btn btn-outline btn-primary"}>Post</button>
      </div>
        {comments.map((currentComment) => {
            return (
                <div key={currentComment.comment_id} className="card bg-base-100  shadow-xl">
                <div className="card-body">
                    <p>{currentComment.body}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-accent">X</button>
                    </div>
                </div>
                </div>
            )
        }).reverse()}
    </>
  );
}

//post comment
//need author - user
//aericle_id

export default Comments;
