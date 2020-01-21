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
  CREATE_ARTICLE_SUCCESS: (articles) => ({ articles }),
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
    [CREATE_ARTICLE_SUCCESS]: (state, { payload: { articles } } ) => ({
      ...state,
      pending: false,
      articles,
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
    dispatch(loadArticlesLoading());
      return article.fetchAllArticles().then((articles) => {
        try {
          dispatch(loadArticlesSuccess(articles));
        } catch(err) {
          dispatch(loadArticlesError(err));
        }
      })
  }
}

export function FetchArticle(id) {
  return function(dispatch) {
    dispatch(loadArticleLoading());
      return article.fetchArticle(id).then((article) => {
        try {
          dispatch(loadArticleSuccess(article));
        } catch(err) {
          dispatch(loadArticleError(err));
        }
      })
  }
}

export function UpdateArticles({ id, title, content, time }) {
  return function(dispatch) {
    dispatch(updateArticlesLoading());
      return article.updateArticle({ id, title, content, time }).then((articles) => {
        try {
          dispatch(updateArticlesSuccess(articles));
        } catch (err) {
          dispatch(updateArticlesError(err));
        }
      })
  }
}

export function CreateArticle({ id, title, content, time }) {
  return function(dispatch) {
    dispatch(createArticleLoading());
      return article.createArticle({ id, title, content, time }).then((articles) => {
        try {
          dispatch(createArticleSuccess(articles));
        } catch (err) {
          dispatch(createArticleError(err));   
        }
      })
  }
}

export default articlesReducer;
