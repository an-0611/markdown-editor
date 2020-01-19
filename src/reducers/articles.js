import { GET_ARTICLES_DATA, UPDATE_ARTICLE_DATA, CREATE_ARTICLE_DATA } from '../actions/articleActions';
import { initialState } from './initialState';

export default function articlesReducer(state = initialState, action) {
  switch (action.type) { // 3. accroding actions.type, and use action creator's payload data (e.g. : FETCH_PRODUCTS_PENDING) to change reducer data,
      case GET_ARTICLES_DATA: 
          return {
              ...state,
              // articles: localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : ,
          }
      case UPDATE_ARTICLE_DATA:
          const articles = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : state.articles;
          const index = articles.findIndex((article) => { return article.id === action.payload.id; });
          const modifiedArticle = {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content,
            modifiedTime: action.payload.modifiedTime,
          };
          if (index >= 0) articles[index] = modifiedArticle;
          localStorage.setItem('articles', JSON.stringify(articles));
          return {
              ...state,
              articles: [...articles],
          }
      case CREATE_ARTICLE_DATA:
          if (localStorage.getItem('articles')) localStorage.setItem('articles', JSON.stringify([...JSON.parse(localStorage.getItem('articles')), action.payload.newArticle]));
          else localStorage.setItem('articles', JSON.stringify([...state.articles, action.payload.newArticle])); // only reducer data
          return {
            ...state,
            articles: [...state.articles, action.payload.newArticle],
          }
      default: 
          return state;
  }
}
