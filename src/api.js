import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-ml9n.onrender.com/api",
});

function getArticles(topic) {
  let endpoint = "/articles"
  if(topic){
    endpoint += `?topic=${topic}`
  }
  console.log(endpoint)
  return api.get(endpoint)
  .then(({ data }) => {
    console.log(data.articles)
    return data.articles;
  });
}

function getArticle(article_id) {
  return api.get(`/articles/${article_id}`)
  .then(({ data }) => {
    return data.article;
  });
}

function getComments(article_id) {
  return api.get(`/articles/${article_id}/comments`)
  .then(({ data }) => {
    return data.comments;
  });
}

function incArticleVotes(article_id, inc_votes) {
  return api.patch(`/articles/${article_id}`, { inc_votes });
}

function postComment(article_id, username, comment) {
  return api.post(`/articles/${article_id}/comments`, {
      body: comment,
      author: username,
    })
    .then(({ data }) => {
      return data.comment;
    });
}

function deleteComment(comment_id) {
  return api.delete(`/comments/${comment_id}`);
}

function getTopics() {
  return api.get("/topics")
  .then(({ data }) => {
    return data.topics
  })
}

export {
  getArticles,
  getArticle,
  getComments,
  incArticleVotes,
  postComment,
  deleteComment,
  getTopics,
};
