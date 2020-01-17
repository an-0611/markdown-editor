import { GET_ARTICLES_DATA, UPDATE_ARTICLE_DATA } from '../actions/articleActions';

const initialState = {
  articles: [
    {
        id: '1579242010189',
        title: 'title1',
        content: '# This is a header\n\nAnd this is a paragraph',
        modifiedTime: 1579157754943,
    },
    {
        id: '1579242043136',
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
          const index = state.articles.findIndex((article) => { return article.id === action.payload.id; });
          const modifiedArticle = {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content,
            modifiedTime: action.payload.modifiedTime,
          };
          if (index >= 0) state.articles[index] = modifiedArticle; // state.articles.splice(index, 1);
          localStorage.setItem('articles', JSON.stringify(state.articles));
          return {
              ...state,
              articles: [...state.articles],
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
