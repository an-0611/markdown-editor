// import { fetchArticles, fetchArticle, updateArticle } from '../api/api';
// import article from '../api/article';

export const GET_ARTICLES_DATA = 'GET_ARTICLES_DATA';
export const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA';
export const UPDATE_ARTICLE_DATA = 'UPDATE_ARTICLE_DATA';
export const CREATE_ARTICLE_DATA = 'CREATE_ARTICLE_DATA';

// fetch articles
export const LOAD_ARTICLES_LOADING = 'LOAD_ARTICLES_LOADING';
export const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';

// fetch article
export const LOAD_ARTICLE_LOADING = 'LOAD_ARTICLE_LOADING';
export const LOAD_ARTICLE_SUCCESS = 'LOAD_ARTICLE_SUCCESS';
export const LOAD_ARTICLE_ERROR = 'LOAD_ARTICLE_ERROR';

// update articles
export const UPDATE_ARTICLES_LOADING = 'UPDATE_ARTICLES_LOADING';
export const UPDATE_ARTICLES_SUCCESS = 'UPDATE_ARTICLES_SUCCESS';
export const UPDATE_ARTICLES_ERROR = 'UPDATE_ARTICLES_ERROR';
    
// create article
export const CREATE_ARTICLE_LOADING = 'CREATE_ARTICLE_LOADING';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_ERROR = 'CREATE_ARTICLE_ERROR';


// export function getArticlesData(articles) {
//     return {
//         type: GET_ARTICLES_DATA,
//         payload: {
//             articles,
//         }
//     }
// }

// export function getArticleData(article) {
//     return {
//         type: GET_ARTICLE_DATA,
//         payload: {
//             article,
//         }
//     }
// }

// export function updateArticleData(id, title, content, modifiedTime) {
//     return {
//         type: UPDATE_ARTICLE_DATA,
//         payload: {
//             id,
//             title,
//             content,
//             modifiedTime,
//         },
//     }
// }

// export function createArticleData(newArticle) {
//     return {
//         type: CREATE_ARTICLE_DATA,
//         payload: {
//             newArticle,
//         }
//     }
// }

// // thunk method
// export function FetchAllArticles() {
//     return function(dispatch) {
//         return article.fetchAllArticles().then((articles) => {
//             dispatch(getArticlesData(articles));
//         })
//     }
// }

// export function FetchArticle(id) {
//     return function(dispatch) {
//         return article.fetchArticle(id).then((article) => {
//             dispatch(getArticleData(article));
//         })
//     }
// }