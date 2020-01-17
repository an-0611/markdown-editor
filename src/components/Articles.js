import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import styled from "styled-components";

import ArticleFooter from './ArticleFooter';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
})

const AlertSuccess = styled.div`
    border: 1px solid #cfefdf;
    background-color: #ebf8f2;
    position: relative;
    padding: 8px 48px 8px 38px;
    border-radius: 4px;
    color: rgba(0,0,0,.65);
    font-size: 12px;
    line-height: 1.5;
    & > i {
        color: #00a854;
        display: inline-block;
        font-style: normal;
        font-size: 14px;
        top: 10px;
        left: 16px;
        position: absolute;
        vertical-align: baseline;
        text-align: center;
        text-transform: none;
        line-height: 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
`;

function Articles(props) {
    const { history, articles } = props;
    const _articles = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : articles;
    return (
        <Fragment>
            { history.location.state && history.location.state.successCreateArticle &&
                <AlertSuccess className="fade-out">
                    <i className="ant-alert-icon anticon anticon-check-circle" />
                    <span>新增了一篇文章! 三秒後關閉提醒</span>
                </AlertSuccess>
            }
            { _articles.length === 0 && <div>沒有任何一篇文章</div>}
            { _articles.length > 0 && _articles.map((article, i) => (
                <div key={i} className="ArticleContainer hover-effect fade-in" onClick={() => { history.push(`/article/${article.id}`) } }>
                    <div className="ArticleContent">
                        <div className="title">{article.title}</div>
                        <ReactMarkdown className="padding-10" source={article.content} />
                    </div>
                    <ArticleFooter modifiedTime={article.modifiedTime} />
                </div>
                )) 
            }
            <div className="bottomBtn fade-in-delay">已經是最後一篇文章了</div>
        </Fragment>
    );
}

export default connect(mapStateToProps)(Articles);