import { initialState } from '../reducers/initialState';

export default { fetchArticles, fetchArticle, updateArticle };

function fetchArticles() {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                articles: initialState.articles,
            });
        } catch (err) {
            reject(() => { throw new Error('Fetch Articles Failed: ', err); });
        }
    });
}

function fetchArticle(id) {
    return new Promise((resolve, reject) => {
        try {
            const article = initialState.articles.find(article => { return article.id === id });
            resolve({
                article,
            })
        } catch (err) {
            reject(() => { throw new Error('Fetch Article Failed: ', err); });
        }
    });
}

function updateArticle(id, title, content) {
    return new Promise((resolve, reject) => {
        try {
            const index = initialState.articles.findIndex(article => { return article.id === id });
            if (index >= 0) initialState.articles[index] = { id, title, content };
            resolve({
                id,
                title,
                content,
            });
        } catch (err) {
            reject(() => { throw new Error('Update Article Failed: ', err); });
        }
    });
}