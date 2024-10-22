import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { getUser } from "../api";

function PreviewArticles({ articles, title, windowSize }) {
  const { isDark } = useContext(ThemeContext);
  const [parsedDates, setParsedDates] = useState([])

  useEffect(() => {
    setParsedDates(articles.map((article) => {
      const date = article.created_at.split("T");
      return (date[0]);
  }))
  },[])

  console.log(title);
  return (
    <div className="pt-2 pr-4 pb-2 gap-2">
      <h2 className="mb-2" style={{ fontSize: "30px" }}>
        <b>{title}</b>
      </h2>
      {articles.map((article, index) => {
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

              <div className="relative w-full" >
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
                <div class="flex justify-between flex-wrap left-0 right-0 bottom-0 absolute mb-5">
                  <div className="flex gap-1">
                    <p
                      style={{
                        fontSize: "60%",
                        marginTop: "0.2rem",
                        marginRight: "0.2rem",
                      }}
                    >
                      <b>{article.author}</b>
                    </p>
                  </div>
                  {windowSize > 1600 && <p style={{fontSize: "70%", marginTop: "0.15rem"}} ><em>{parsedDates[index]}</em></p>}
                  <div className="flex">
                    <p style={{ fontSize: "80%" }} className="flex">
                      {article.comment_count}
                      <img
                        style={{
                          marginRight: "0.5rem",
                          marginLeft: "0.3rem",
                          marginTop: "0.2rem",
                          width: "18px",
                          height: "18px",
                        }}
                        src={
                          isDark
                            ? "/assets/comment-night.png"
                            : "/assets/comments.png"
                        }
                      />
                    </p>
                    <p style={{ fontSize: "80%" }} className="flex">
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
                          style={{
                            width: "18px",
                            height: "18px",
                            marginTop: "0.1rem",
                          }}
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
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default PreviewArticles;
