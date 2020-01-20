// import { GET_ARTICLES_DATA, GET_ARTICLE_DATA, UPDATE_ARTICLE_DATA, CREATE_ARTICLE_DATA, GET_ARTICLE_PENDING } from '../actions/articleActions';
// import { initialState } from './initialState';

// export default function articlesReducer(state = initialState, action) {
//   switch (action.type) {
//       case GET_ARTICLES_DATA:
//           return {
//               ...state,
//               articles: action.payload.articles,
//           }
//       case GET_ARTICLE_DATA:
//           return {
//             ...state,
//             article: action.payload.article,
//           }

//       case UPDATE_ARTICLE_DATA:
//           const articles = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : state.articles;
//           const index = articles.findIndex((article) => { return article.id === action.payload.id; });
//           const modifiedArticle = {
//             id: action.payload.id,
//             title: action.payload.title,
//             content: action.payload.content,
//             modifiedTime: action.payload.modifiedTime,
//           };
//           if (index >= 0) articles[index] = modifiedArticle;
//           localStorage.setItem('articles', JSON.stringify(articles));
//           return {
//               ...state,
//               articles: [...articles],
//           }
//       case CREATE_ARTICLE_DATA:
//           if (localStorage.getItem('articles')) localStorage.setItem('articles', JSON.stringify([...JSON.parse(localStorage.getItem('articles')), action.payload.newArticle]));
//           else localStorage.setItem('articles', JSON.stringify([...state.articles, action.payload.newArticle])); // only reducer data
//           return {
//             ...state,
//             articles: [...state.articles, action.payload.newArticle],
//           }
//       default: 
//           return state;
//   }
// }


// thunk
import article from '../api/article';

import { createActions, handleActions } from 'redux-actions';
import { initialState } from './initialState';

import {
  LOAD_ARTICLES_LOADING, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_ERROR, // fetch articles
  LOAD_ARTICLE_LOADING, LOAD_ARTICLE_SUCCESS, LOAD_ARTICLE_ERROR, // fetch article
  UPDATE_ARTICLES_LOADING, UPDATE_ARTICLES_SUCCESS, UPDATE_ARTICLES_ERROR, // update articles
  CREATE_ARTICLE_LOADING, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_ERROR, // create article
} from '../actions/articleActions';

export const {
  // fetch articles
  loadArticlesLoading,
  loadArticlesSuccess,
  loadArticlesError, 
  // fetch article
  loadArticleLoading,
  loadArticleSuccess,
  loadArticleError,
  // update Articles
  updateArticlesLoading,
  updateArticlesSuccess,
  updateArticlesError, 
  // create article
  createArticleLoading,
  createArticleSuccess,
  createArticleError,
} = createActions({
  LOAD_ARTICLES_LOADING : () => ({}),
  LOAD_ARTICLES_SUCCESS: (articles) => ({ articles }),
  LOAD_ARTICLES_ERROR: (error) => ({ error }),
  LOAD_ARTICLE_LOADING : () => ({}),
  LOAD_ARTICLE_SUCCESS: (article) => ({ article }),
  LOAD_ARTICLE_ERROR: (error) => ({ error }),
  UPDATE_ARTICLES_LOADING : () => ({}),
  UPDATE_ARTICLES_SUCCESS: (articles) => ({ articles }),
  UPDATE_ARTICLES_ERROR: (error) => ({ error }),
  CREATE_ARTICLE_LOADING : () => ({}),
  CREATE_ARTICLE_SUCCESS: (newArticle) => ({ newArticle }),
  CREATE_ARTICLE_ERROR: (error) => ({ error }),
});

const articlesReducer = handleActions(
  {
    [LOAD_ARTICLES_LOADING]: (state) => ({
      ...state,
      pending: true,
    }),
    [LOAD_ARTICLES_SUCCESS]: (state, { payload: { articles } } ) => ({
      ...state,
      pending: false,
      articles,
    }),
    [LOAD_ARTICLES_ERROR]: (state, { payload: { error }} ) => ({
      ...state,
      pending: false,
      error: error,
    }),

    [LOAD_ARTICLE_LOADING]: (state) => ({
      ...state,
      pending: true,
    }),
    [LOAD_ARTICLE_SUCCESS]: (state, { payload: { article } } ) => ({
      ...state,
      pending: false,
      article,
    }),
    [LOAD_ARTICLE_ERROR]: (state, { payload: { error }} ) => ({
      ...state,
      pending: false,
      error: error,
    }),

    [UPDATE_ARTICLES_LOADING]: (state) => ({
      ...state,
      pending: true,
    }),
    [UPDATE_ARTICLES_SUCCESS]: (state, { payload: { articles } } ) => ({
      ...state,
      pending: false,
      articles,
    }),
    [UPDATE_ARTICLES_ERROR]: (state, { payload: { error }} ) => ({
      ...state,
      pending: false,
      error: error,
    }),

    [CREATE_ARTICLE_LOADING]: (state) => ({
      ...state,
      pending: true,
    }),
    [CREATE_ARTICLE_SUCCESS]: (state, { payload: { newArticle } } ) => ({
      ...state,
      pending: false,
      articles: [...state.articles, newArticle],
    }),
    [CREATE_ARTICLE_ERROR]: (state, { payload: { error }} ) => ({
      ...state,
      pending: false,
      error: error,
    }),
  },
  initialState,
);

// thunk method
export function FetchAllArticles() {
  return function(dispatch) {
      return article.fetchAllArticles().then((articles) => {
          dispatch(loadArticlesSuccess(articles));
      })
  }
}

export function FetchArticle(id) {
  return function(dispatch) {
      return article.fetchArticle(id).then((article) => {
          dispatch(loadArticleSuccess(article));
      })
  }
}

export function UpdateArticles({ id, title, content, time }) {
  console.log(id, title, content, time);
  return function(dispatch) {
    return article.updateArticle({ id, title, content, time }).then((articles) => {
      console.log('newArticles: ', articles)
        dispatch(updateArticlesSuccess(articles));
    })
  }
}

export default articlesReducer;
