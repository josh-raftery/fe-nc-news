import { useContext, useState } from "react";
import TopicsDropDown from "./TopicsDropdown";
import { postArticle } from "../api";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

function PostArticle(){

    const [topicsDropDown, setTopicsDropDown] = useState("");
    const [isTopicDropDown, setIsTopicDropDown] = useState(false);
    const {user} = useContext(UserContext)
    const [userData] = user
    const [successful,setSuccessful] = useState(true)
    const [missingTitle,setMissingTitle] = useState(false)
    const [missingBody,setMissingBody] = useState(false)
    const [missingImg,setMissingImg] = useState(false)
    const [missingTopic,setMissingTopic] = useState(false)

    const [formData,setFormData] = useState({
        title: "",
        body: "",
        article_img_url: "",
    })

    const navigate = useNavigate();

    function handleChange(event){
        const {name,value} = event.target
        setFormData({
            ...formData,
            [name]: value
          })
    }

    function handleSubmit(event){
        formData.topic = topicsDropDown
        formData.author = userData.username

        if(!formData.title){
            setMissingTitle(true)
        } else{
            setMissingTitle(false)
        }
        if(!formData.body){
            setMissingBody(true)
        } else{
            setMissingBody(false)
        }
        if(!formData.article_img_url){
            setMissingImg(true)
        }else{
            setMissingImg(false)
        }
        if(!formData.topic){
            setMissingTopic(true)
        }else{
            setMissingTopic(false)
        }
        event.preventDefault()
        if(missingBody || missingImg || missingTitle || missingTopic){
            postArticle(formData)
            .then((article) => {
                navigate(`/${article.article_id}`)
            })
        }
    }
    

    return (
        <form className="post-article">
            <label className="form-control">
            <div className="label">
                <span className="label-text">Title *</span>
            </div>
            <textarea onChange={handleChange} name="title" value={formData.title} style={{height: "30px", width: "500px"}} className={missingTitle ? "textarea textarea-error" : "textarea textarea-bordered"} placeholder={missingTitle ? "Enter Title!" :"Type Here..."}></textarea>
            </label>
            <label className="form-control">
            <div className="label">
                <span className="label-text">Article Body *</span>
            </div>
            <textarea onChange={handleChange} name="body" value={formData.body} style={{height: "300px", width: "500px"}} className={missingBody ? "textarea textarea-error" : "textarea textarea-bordered"} placeholder={missingBody ? "Enter Body!" :"Type Here..."}></textarea>
            </label>
            <label className="form-control">
            <div className="label">
                <span className="label-text">Image URL *</span>
            </div>
            <textarea onChange={handleChange} name="article_img_url" value={formData.article_img_url} typeof="url" style={{height: "30px", width: "500px"}} className={missingImg ? "textarea textarea-error" : "textarea textarea-bordered"} placeholder={missingImg ? "Enter Image URL!" :"Type Here..."}></textarea>
            </label>
            <label className="form-control">
            <div className="label">
                <span className="label-text">Select Article Category *</span>
            </div>
            <TopicsDropDown missingTopic={missingTopic} topicsDropDown={topicsDropDown} setTopicsDropDown={setTopicsDropDown} isTopicDropDown={isTopicDropDown} setIsTopicDropDown={setIsTopicDropDown} />
            </label>
            <button onClick={handleSubmit} style={{marginTop: "1rem"}} className="btn btn-wide btn-outline">Post Article</button>
        </form>
    )
}

export default PostArticle