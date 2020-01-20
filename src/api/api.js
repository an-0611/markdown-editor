import { initialState } from '../reducers/initialState';

export default { fetchAllArticles, fetchArticle, updateArticle, createArticle };

function fetchAllArticles() {
    return new Promise((resolve, reject) => {
        try {
            resolve({ data: initialState.articles });
        } catch (err) {
            reject(() => { throw new Error('Fetch Articles Failed: ', err); });
        }
    });
}

function fetchArticle(id) {
    return new Promise((resolve, reject) => {
        try {
            const article = initialState.articles.find(article => { return article.id === id });
            resolve({ data: article });
        } catch (err) {
            reject(() => { throw new Error('Fetch Article Failed: ', err); });
        }
    });
}

function updateArticle(modifyArticle) {
    return new Promise((resolve, reject) => {
        try {
            const index = initialState.articles.findIndex(article => { return article.id === modifyArticle.id });
            if (index >= 0) initialState.articles[index] = modifyArticle;
            resolve({ data: initialState.articles });
        } catch (err) {
            reject(() => { throw new Error('Update Article Failed: ', err); });
        }
    });
}

function createArticle(newArticle) {
    return new Promise((resolve, reject) => {
        try {
            initialState.articles.push(newArticle);
            resolve({ data: initialState.articles });
        } catch (err) {
            reject(() => { throw new Error('Create Article Failed: ', err); });
        }
    });
}