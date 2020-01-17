import { GET_ARTICLES_DATA, UPDATE_ARTICLE_DATA, CREATE_ARTICLE_DATA } from '../actions/articleActions';

const initialState = {
  articles: [
    {
        id: 'dea59ea7-1f1a-4d29-b900-9740cf260b72',
        title: 'title1',
        content: '# This is a header\n\nAnd this is a paragraph',
        modifiedTime: 1579157754943,
    },
    {
        id: '5908732b-9cb4-4e02-914d-79587e00e2c9',
        title: 'title2',
        content: `### Step 1 : Create your app
        \`\`\`$ npm install -g create-react-app $ create-react-app my-app
        \`\`\` ### Step 2 : Build it for production`,
        modifiedTime: 1579197794943,
    }
  ],
}

export default function articlesReducer(state = initialState, action) {
  switch (action.type) { // 3. accroding actions.type, and use action creator's payload data (e.g. : FETCH_PRODUCTS_PENDING) to change reducer data,
      case GET_ARTICLES_DATA: 
          return {
              ...state,
            //   articles: action.payload.articles,
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
    //   case FETCH_PRODUCTS_ERROR:
    //       return {
    //           ...state,
    //           pending: false,
    //           error: action.error
    //       }
      default: 
          return state;
  }
}
