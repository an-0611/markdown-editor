const name = 'articles';

export default { fetchAllArticles, fetchArticle, updateArticle, set };

function fetchAllArticles() {
    let articles = window.localStorage.getItem(name);
    if (articles) {
        articles = JSON.parse(articles);
        return articles;
    }
}

function fetchArticle(id) {
    let articles = window.localStorage.getItem(name);
    if (articles) {
        articles = JSON.parse(articles);
        return articles.find(article => { return article.id === id });
    }
}

function updateArticle(modifyArticle) {
    let articles = window.localStorage.getItem(name);
    console.log('777: ', modifyArticle);
    console.log('888: ', articles);
    
    if (articles) {
        articles = JSON.parse(articles);
        let index = articles.findIndex(article => { return article.id === modifyArticle.id });
        if (index >= 0) articles[index] = modifyArticle;
        set(articles);
        return articles;
    }
}

function set(articles) {
    window.localStorage.setItem(name, JSON.stringify(articles));
}