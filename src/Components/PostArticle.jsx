import { useContext, useState } from "react";
import TopicsDropDown from "./TopicsDropdown";
import { postArticle } from "../api";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import Next from "./Next";

function PostArticle() {
  const [topicsDropDown, setTopicsDropDown] = useState("");
  const [isTopicDropDown, setIsTopicDropDown] = useState(false);
  const { user } = useContext(UserContext);
  const [successful, setSuccessful] = useState(true);
  const [missingTitle, setMissingTitle] = useState(false);
  const [missingBody, setMissingBody] = useState(false);
  const [missingImg, setMissingImg] = useState(false);
  const [missingTopic, setMissingTopic] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    article_img_url: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    formData.topic = topicsDropDown;
    formData.author = user.username;

    if (!formData.title) {
      setMissingTitle(true);
    } else {
      setMissingTitle(false);
    }
    if (!formData.body) {
      setMissingBody(true);
    } else {
      setMissingBody(false);
    }
    if (!formData.article_img_url) {
      setMissingImg(true);
    } else {
      setMissingImg(false);
    }
    if (!formData.topic) {
      setMissingTopic(true);
    } else {
      setMissingTopic(false);
    }
    event.preventDefault();
    if (missingBody || missingImg || missingTitle || missingTopic) {
      postArticle(formData).then((article) => {
        navigate(`/${article.article_id}`);
      });
    }
  }

  return (
    <form className="post-article p-4">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Title *</span>
        </div>
        <textarea
          onChange={handleChange}
          name="title"
          value={formData.title}
          style={{ height: "30px", maxWidth: "500px" }}
          className={
            missingTitle
              ? "textarea textarea-error"
              : "textarea textarea-bordered"
          }
          placeholder={missingTitle ? "Enter Title!" : "Type Here..."}
        ></textarea>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Article Body *</span>
        </div>
        <textarea
          onChange={handleChange}
          name="body"
          value={formData.body}
          style={{ height: "300px", maxWidth: "500px" }}
          className={
            missingBody
              ? "textarea textarea-error"
              : "textarea textarea-bordered"
          }
          placeholder={missingBody ? "Enter Body!" : "Type Here..."}
        ></textarea>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Image URL *</span>
        </div>
        <textarea
          onChange={handleChange}
          name="article_img_url"
          value={formData.article_img_url}
          typeof="url"
          style={{ height: "30px", maxWidth: "500px" }}
          className={
            missingImg
              ? "textarea textarea-error"
              : "textarea textarea-bordered"
          }
          placeholder={missingImg ? "Enter Image URL!" : "Type Here..."}
        ></textarea>
      </label>
      <div className="flex justify-between flex-wrap relative">
        <label className="">
          <div className="label">
            <span className="label-text">Select Article Topic *</span>
          </div>
          <TopicsDropDown
            missingTopic={missingTopic}
            topicsDropDown={topicsDropDown}
            setTopicsDropDown={setTopicsDropDown}
            isTopicDropDown={isTopicDropDown}
            setIsTopicDropDown={setIsTopicDropDown}
          />
        </label>

        <button
          onClick={handleSubmit}
          style={{}}
          className="btn btn-wide btn-outline absolute bottom-0 right-0"
        >
          Post Article
          <Next />
        </button>
      </div>
    </form>
  );
}

export default PostArticle;
