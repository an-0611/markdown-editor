import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';

import styled from "styled-components";

import * as articleAction from '../actions/articleActions';

import EditMode from './EditMode';
import ErrorMessage from './ErrorMessage';
import ArticleFooter from './ArticleFooter';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
    // ableEdit: state.articlesReducer.ableEdit,
})

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
}

const RedBtn = styled.button`
    width: 100%;
    padding: 12px 24px;
    border: 1px solid;
    color: #ec4646;
    background: transparent;
    text-align: center;
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
            modifiedTime: 0,
            articles: localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : props.articles,
            errorMessage: '',
            showDoneBtn: false,
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history,
        } = this.props;
        const { articles } = this.state;
        const mappingArticle = articles.find((article) => { return article.id === id; });
        if (mappingArticle) {
            this.setState({
                mappingArticle,
                title: mappingArticle.title,
                content: mappingArticle.content,
                modifiedTime: mappingArticle.modifiedTime,
            });
            return;
        }
        history.push('/404/');
    }

    componentDidUpdate(prevProps, prevState) {
        // shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate
        if (prevState.mappingArticle.title !== this.state.title && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevState.mappingArticle.content !== this.state.content && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevState.mappingArticle.title === this.state.title && prevState.mappingArticle.content === this.state.content && prevState.showDoneBtn) {
            this.setState({ showDoneBtn: false });
        }
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });
        const { errorMessage } = this.state;
        if (errorMessage && event.target.value !== '') this.setState({ errorMessage: '' });
    }

    handleChangeContent(value) {
        this.setState({ content: value });
    }

    editArticle() {
        this.setState({ ableEdit: true });
    }

    submitEdit() {
        const {
            match: {
                params: { id },
            },
            actions,
        } = this.props;
        const { title, content } = this.state;
        if (title.trim() === '' || title.length === 0) {
            this.setState({ errorMessage: '標題不可為空，請至少輸入一字' });
            return ;
        }
        const time = new Date().getTime();
        this.setState({
            ableEdit: false,
            modifiedTime: time,
        });
        actions.updateArticleData(id, title, content, time);
    }

    cancelEdit() {
        const { mappingArticle } = this.state;
        this.setState({
            ableEdit: false,
            title: mappingArticle.title,
            content: mappingArticle.content,
            modifiedTime: mappingArticle.modifiedTime,
        });
    }

    render() {
        const { history } = this.props;
        const { ableEdit, title, content, modifiedTime, errorMessage, showDoneBtn } = this.state;
        return (
            <Fragment>
                <div className="ArticleContainer">
                    <div className="ArticleContent">
                        <div className="title">
                            { !ableEdit && title}
                            { !ableEdit && <div className="btn" onClick={() => { this.editArticle(); }}>edit</div>}
                            { ableEdit &&
                                <div>
                                    <input type="text" value={title} onChange={this.handleChangeTitle} placeholder="請輸入至少一個字元" />
                                    { errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                                    <div className="btn" onClick={() => { this.cancelEdit(); }}>cancel</div>
                                    { showDoneBtn && <div className="btn" onClick={() => { this.submitEdit(); }}>done</div> }
                                </div>
                            }
                        </div>
                        { !ableEdit && <ReactMarkdown className="padding-10" source={content} />}
                        { ableEdit && <EditMode content={content} onChange={this.handleChangeContent} />} 
                    </div>
                    <ArticleFooter modifiedTime={modifiedTime} />
                </div>
                <RedBtn className="fade-in-delay" onClick={() => { history.push('/') }}>back to Articles</RedBtn>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);