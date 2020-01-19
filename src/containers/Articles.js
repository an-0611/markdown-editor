import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { get } from 'lodash';

// import { getAllArticles } from '../common/utils/api';

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

function Articles(props) {
    // const res = getAllArticles()
    const { history, articles } = props;
    const _articles = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : articles;
    const isCreateAlert = get(history, 'location.state.successCreateArticle', false);
    return (
        <Fragment>
            { isCreateAlert && <Alert alertText="success create article!" />}
            { _articles.length > 0 ? 
                _articles.map((article, i) => <ArticleContainer key={i} {...article} />) : <div>no any articles</div>
            }
            <LastArticleBtn>The articles end</LastArticleBtn>
        </Fragment>
    );
}

export default connect(mapStateToProps)(Articles);