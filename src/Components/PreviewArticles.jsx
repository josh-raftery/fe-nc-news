import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

function PreviewArticles({ articles, title }) {

const {isDark} = useContext(ThemeContext)
  console.log(title);
  return (
    <div className="pt-2 pr-4 pb-2 gap-2">
      <h2 className="mb-2" style={{ fontSize: "30px" }}>
        <b>{title}</b>
      </h2>
      {articles.map((article) => {
        return (
          <Link
            key={`${article.article_id}${title}`}
            to={`/${article.article_id}`}
          >
            <div className="flex article-sidebar gap-2">
              <img
                className="preview-article-img mb-4"
                src={article.article_img_url}
              ></img>

            <div>
              <h2
                style={{
                  fontSize: "15px",
                  height: "42px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Adjust the number of lines as needed
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
                className="mb-1"
              >
                {article.title}
              </h2>
              <div>

              </div>
              <div class="flex" >
                    <img src={article.article_img_url} ></img>
                    <p style={{fontSize: "80%"}} className="flex">
                    {article.comment_count}
                    <img
                        style={{
                        marginRight: "0.5rem",
                        marginLeft: "0.3rem",
                        marginTop: "0.2rem",
                        width: "18px",
                        height: "18px"
                        }}
                        src={
                        isDark
                            ? "/assets/comment-night.png"
                            : "/assets/comments.png"
                        }
                    />
                    </p>
                    <p style={{fontSize: "80%"}} className="flex" >
                    {article.votes}
                    {isDark ? (
                        <img
                        style={{ width: "18px", height: "18px" }}
                        src={
                            article.votes >= 0
                            ? "/assets/upvote-night.png"
                            : "/assets/downvote-night.png"
                        }
                        />
                    ) : (
                        <img
                        style={{ width: "18px", height: "18px", marginTop: "0.1rem" }}
                        src={
                            article.votes >= 0
                            ? "/assets/upvote.png"
                            : "/assets/downvote.png"
                        }
                        />
                    )}
                    </p>
              </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default PreviewArticles;
