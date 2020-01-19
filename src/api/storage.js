const name = 'articles';

export default { fetchArticles, fetchArticle, saveArticles };

function fetchArticles() {
    let articles = window.localStorage.getItem(name);
    if ( articles ) {
        articles = JSON.parse(articles);
        return articles;
    }
}

function fetchArticle(id) {
    let articles = window.localStorage.getItem(name);
    if ( articles ) {
        articles = JSON.parse(articles);
        return articles.find(article => {
            return article.id === id;
        });
    }
}

function saveArticles(articles) {
    window.sessionStorage.setItem(name, JSON.stringify(articles));
}