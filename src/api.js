import axios from "axios";

const api = axios.create({
    baseURL: 'https://be-nc-news-ml9n.onrender.com/api',
})

function getArticles(){
    let endpoint = '/articles'
    return api.get(endpoint)
    .then(({data}) => {
        return data.articles
    })
}

function getArticle(article_id){
    return api.get(`/articles/${article_id}`)
    .then(({data}) => {
        return data.article
    })
}

function getComments(article_id){
    return api.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
        return data.comments
    })
}

function incArticleVotes(article_id,inc_votes){
    return api.patch(`/articles/${article_id}`,{inc_votes})
}

export {getArticles,getArticle,getComments,incArticleVotes}