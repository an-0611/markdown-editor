const name = 'articles';

export default { fetchAllArticles, fetchArticle, updateArticle, createArticle, set };

function fetchAllArticles() {
    let articles = window.localStorage.getItem(name);
    if (articles) return JSON.parse(articles)
}

function fetchArticle(id) {
    let articles = window.localStorage.getItem(name);
    if (articles) return JSON.parse(articles).find(article => { return article.id === id });
}

function updateArticle(modifyArticle) {
    let articles = window.localStorage.getItem(name);
    if (articles) {
        articles = JSON.parse(articles);
        let index = articles.findIndex(article => { return article.id === modifyArticle.id });
        if (index >= 0) articles[index] = modifyArticle;
        set(articles);
        return articles;
    }
}

function createArticle(newArticle) {
    let articles = window.localStorage.getItem(name);
    if (articles) {
        articles = JSON.parse(articles);
        articles.push(newArticle);
        set(articles);
        return articles;
    }
}

function set(articles) {
    window.localStorage.setItem(name, JSON.stringify(articles));
}