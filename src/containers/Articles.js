import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { get } from 'lodash';

import { FetchAllArticles } from '../reducers/articles';
import { FetchArticle, UpdateArticles } from '../reducers/articles';

import { fadeInDown} from '../assets/animation';
import Alert from '../components/Alert';
import ArticleContainer from '../components/ArticleContainer';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
});

const LastArticleBtn = styled.div`
    width: 100%;
    padding: 20px 0;
    text-align: center;
    animation: ${fadeInDown} 2s ease forwards;
`;

const Articles = ({ history, articles, dispatch }) => {
    try {
        // dispatch(FetchAllArticles());
        // dispatch(FetchArticle('dea59ea7-1f1a-4d29-b900-9740cf260b72'))
    } catch (err) {
        console.log(err)
    }
    // console.log(articles)
    // dispatch(FetchAllArticles());
    // getAllArticles: () => dispatch(FetchAllArticles()),
    // dispatch(FetchAllArticles());
    // getAllArticles();
    // console.log(articles)
    const isCreateAlert = get(history, 'location.state.successCreateArticle', false);
    return (
        <Fragment>
            { isCreateAlert && <Alert alertText="success create article!" />}
            { articles.length > 0 ? 
                articles.map((article, i) => <ArticleContainer key={i} {...article} />) : <div>no any articles</div>
            }
            <LastArticleBtn>The articles end</LastArticleBtn>
        </Fragment>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Articles);
export default connect(mapStateToProps)(Articles);