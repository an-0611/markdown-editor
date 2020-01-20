import api from './api';
import storage from './storage';

export default { fetchAllArticles, fetchArticle, updateArticle, createArticle };

let cache = false;

function fetchAllArticles() {
    return new Promise(resolve => {
        let articles = storage.fetchAllArticles();
        if (cache) return;
        cache = true
        if (articles) resolve(articles);
        else api.fetchAllArticles().then(({ data }) => {
            storage.set(data);
            resolve(data);
        });
    } );
}

function fetchArticle(id) {
    return new Promise(resolve => {
        const article = storage.fetchArticle(id);
        if (article && article.id) resolve(article);
        else api.fetchArticle(id).then(({ data }) => {
            resolve(data);
        });
    });
}

function updateArticle(modifyArticle) {
    return new Promise(resolve => {
        const article = storage.updateArticle(modifyArticle);
        if (article) resolve(article);
        else api.updateArticle(modifyArticle).then(({ articles }) => {
            storage.set(articles);
            resolve(articles);
        })
    });
}

function createArticle(newArticle) {
    return new Promise(resolve => {
        const articles = storage.createArticle(newArticle);
        if (articles) resolve(articles);
        else api.createArticle(newArticle).then(({ articles }) => {
            storage.set(articles);
            resolve(articles)
        })
    });
}