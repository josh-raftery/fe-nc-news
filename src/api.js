import axios from "axios";

const api = axios.create({
  baseURL: "https://pulsewire-api.vercel.app/api",
});

function getArticles(params) {
  return api.get('/articles',{params})
  .then(({ data }) => {
    return data.articles;
  });
}

function getArticle(article_id) {
  return api.get(`/articles/${article_id}`)
  .then(({ data }) => {
    return data.article;
  })
  
}

function getComments(article_id, params) {
  console.log(params)
  return api.get(`/articles/${article_id}/comments`,{params})
  .then(({ data }) => {
    return data.comments;
  });
}

function incArticleVotes(article_id, inc_votes) {
  return api.patch(`/articles/${article_id}`, { inc_votes });
}

function incCommentVotes(comment_id, inc_votes) {
  return api.patch(`/comments/${comment_id}`, { inc_votes });
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

function getUser(username){
  return api.get(`/users/${username}`)
  .then(({data}) => {
    return data.user
  })
}

function postArticle(request){
  return api.post(`/articles`,request)
  .then(({data}) => {
    return data.article
  })
}

function deleteArticle(article_id){
  return api.delete(`/articles/${article_id}`)
}

function postUser(request){
  return api.post('/users',request)
  .then(({data}) => {
    return data.user
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
  getUser,
  postArticle,
  deleteArticle,
  postUser,
  incCommentVotes
};
