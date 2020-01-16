import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript'

import * as articleAction from '../actions/articleActions';

import { formatTime } from '../common/utils';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
})

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
}

const RedBtn = styled.button`
    padding: 12px 24px;
    border: 1px solid;
    color: #ec4646;
    background: transparent;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s ease all;
`;

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mappingArticle: {},
            ableEdit: false,
            title: '',
            content: '',
            modifiedTime: null,
            articles: localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : props.articles,
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;
        const { articles } = this.state;
        const mappingArticle = articles.find((article) => { return article.id === id; });
        if (mappingArticle) this.setState({
            mappingArticle,
            title: mappingArticle.title,
            content: mappingArticle.content,
            modifiedTime: mappingArticle.modifiedTime,
        });
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value});
    }

    editArticle() {
        this.setState({ ableEdit: true });
    }

    submitEdit(id) {
        const { actions } = this.props;
        const { title, content } = this.state;
        if (title.length === 0) return;
        const time = new Date().getTime();
        this.setState({
            ableEdit: false,
            modifiedTime: time,
        });
        actions.updateArticleData(id, title, content, time);
    }

    cancelEdit() {
        this.setState({ ableEdit: false });
    }

    render() {
        const {
            match: {
                params: { id },
            },
            history,
            // location,
        } = this.props;
        
        const { ableEdit, title, content, modifiedTime } = this.state;
        return (
            <Fragment>
                <Fragment>
                    <div className="ArticleContainer">
                        <div className="ArticleContent">
                            { !ableEdit &&
                                <Fragment>
                                    <div className="title">
                                        {title}
                                        <div className="btn" onClick={() => { this.editArticle(id); }}>edit</div>
                                    </div>
                                    <ReactMarkdown className="padding-10" source={content} />
                                </Fragment>
                            }
                            { ableEdit &&
                                <Fragment>
                                    <div className="title">
                                        <input type="text" value={title} onChange={this.handleChangeTitle} />
                                        <div className="btn" onClick={() => { this.cancelEdit(); }}>cancel</div>
                                        <div className="btn" onClick={() => { this.submitEdit(id); }}>done</div>
                                    </div>
                                    <CodeMirror
                                        value={content} // this.state.value
                                        options={{
                                            mode: 'markdown',
                                            theme: 'eclipse',
                                            lineNumbers: true
                                        }}
                                        onBeforeChange={(editor, data, value) => {
                                            this.setState({ content: value });
                                        }}
                                        onChange={(editor, data, value) => {
                                        }}
                                    />
                                </Fragment>
                            }
                        </div>
                        <div className="ArticleFooter">
                            <div>{`Last-Modified: ${formatTime(modifiedTime)}`}</div>
                        </div>
                    </div>
                    <RedBtn className="bottomBtn fade-in-delay" onClick={() => { history.push('/') }}>back to Articles</RedBtn>
                </Fragment>
                
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);