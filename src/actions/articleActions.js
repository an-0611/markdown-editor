// import { fetchArticles, fetchArticle, updateArticle } from '../api/api';
// import article from '../api/article';

export const GET_ARTICLES_DATA = 'GET_ARTICLE_DATA';
export const UPDATE_ARTICLE_DATA = 'UPDATE_ARTICLE_DATA';
export const CREATE_ARTICLE_DATA = 'CREATE_ARTICLE_DATA';

export function getArticlesData() {
    return {
        type: GET_ARTICLES_DATA,
        // payload: {
        //     articles: article.list() // import article from '../api/article';
        // }
    }
}

export function updateArticleData(id, title, content, modifiedTime) {
    return {
        type: UPDATE_ARTICLE_DATA,
        payload: {
            id,
            title,
            content,
            modifiedTime,
        },
    }
}

export function createArticleData(newArticle) {
    return {
        type: CREATE_ARTICLE_DATA,
        payload: {
            newArticle,
        }
    }
}
