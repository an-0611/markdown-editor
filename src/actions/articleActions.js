export const GET_ARTICLES_DATA = 'GET_ARTICLE_DATA';
export const UPDATE_ARTICLE_DATA = 'UPDATE_ARTICLE_DATA';
// export const DELETE_ARTICLE_DATA = 'DELETE_ARTICLE_DATA'; 

export function getArticlesData(articles) {
    return {
        type: GET_ARTICLES_DATA,
        // payload: articles
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

// export function fetchProductsError(error) {
//     return {
//         type: DELETE_ARTICLE_DATA,
//         error: error
//     }
// }
