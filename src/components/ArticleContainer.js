import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { fadeInDown } from '../assets/animation';
import ReactMarkdown from 'react-markdown';
import ArticleFooter from './ArticleFooter';

const ArticleHover = styled.div`
    &:hover {
        border: 1px solid red;
    }
    animation: ${fadeInDown} 1s ease forwards;
`;

export default function ArticleContainer(article) {
    const history = useHistory();
    const redirectToArticle = () => { history.push(`/article/${article.id}`) };
    return (
        <ArticleHover className="ArticleContainer" onClick={redirectToArticle}>
            <div className="ArticleContent">
                <div className="title">{article.title}</div>
                <ReactMarkdown className="markdown-body overHidden-300" source={article.content} escapeHtml={false} skipHtml={false} />
            </div>
            <ArticleFooter modifiedTime={article.modifiedTime} />
        </ArticleHover>
    );
}
