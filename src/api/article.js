import api from './api';
import storage from './storage';

export default { fetchAllArticles, fetchArticle, updateArticle };

function fetchAllArticles() {
    return new Promise(resolve => {
        let articles = storage.fetchAllArticles();
        console.log(articles)
        if (articles) resolve(articles);
        else api.fetchAllArticles().then(({ data }) => {
            resolve(data);
            storage.set(data);
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
        console.log(article);
        if (article) resolve(article);
        else api.updateArticle(modifyArticle).then(({ articles }) => {
            resolve(articles);
            storage.set(articles);
        })
    } );
}