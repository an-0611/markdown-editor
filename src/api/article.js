import api from './api';
import storage from './storage';

export default { getAll, getOne, updateOne };

function getAll() { // ok
    return new Promise( resolve => {
        let articles = storage.fetchArticles();
        if ( articles ) resolve(list);
        else api.fetchArticles().then(({ data }) => {
            resolve(data);
            storage.saveArticles(data);
        });
    } );
}

function getOne (id) {
    return new Promise(resolve => {
        const item = storage.fetchArticle(id);
        if ( item && item.id ) resolve(item);
        else api.fetchArticle(id).then(({ data }) => {
            resolve(data);
        });
    });
}

function updateOne({ id, subject, content}) {
    return new Promise(resolve => {
        api.updateArticle({ id, subject, content}).then( ({ data }) => {
            resolve(data);
            storage.saveArticles(data)
        })
    } );
}