import { useEffect, useState } from "react";
import { getComments } from "../api";
import Loading from "./Loading";

function Comments({ article_id }) {
  const [commentInput, setCommentInput] = useState(""); //for post later//
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)

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
        })}
    </>
  );
}

export default Comments;
