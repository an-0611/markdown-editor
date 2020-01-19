import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';
import * as articleAction from '../actions/articleActions';

import styled from "styled-components";
import { fadeInDown, fadeOutUp } from '../assets/animation';

import EditMode from '../components/EditMode';
import ErrorMessage from '../components/ErrorMessage';
import ArticleFooter from '../components/ArticleFooter';
import Btn from '../components/Btn';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
});

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
};

const UrlInput = styled.input`
    position: fixed;
    top: 5000px;
`;

const CopyAlert = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: black;
    border: 1px solid #cfefdf;
    background-color: #ebf8f2;
    text-align: center;
    position: fixed;
    border: 2px solid black;
    border-radius: 5px;
    width: 50%;
    height: 15%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 99999;
    animation: ${fadeOutUp} 1s ease 3s forwards;
`;

const BtnContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 0 5px;
`;

const RedBtn = styled.button`
    width: 100%;
    padding: 12px 24px;
    border: 1px solid;
    margin-bottom: 20px;
    color: #ec4646;
    background: transparent;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s ease all;
    animation: ${fadeInDown} 2s ease forwards;
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
            showCopyAlert: false,
            isPreview: false,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (!this._isMounted) return;
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
        if (!this._isMounted) return;
        if (prevState.mappingArticle.title && prevState.mappingArticle.title !== this.state.title && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevState.mappingArticle.content && prevState.mappingArticle.content !== this.state.content && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevState.mappingArticle.title === this.state.title && prevState.mappingArticle.content === this.state.content && prevState.showDoneBtn) {
            this.setState({ showDoneBtn: false });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChangeTitle = (event) => {
        if (!this._isMounted) return;
        const { errorMessage } = this.state;
        this.setState({ title: event.target.value });
        if (errorMessage && event.target.value !== '') this.setState({ errorMessage: '' });
    }

    handleChangeContent = (value) => {
        if (!this._isMounted) return;
        const { errorMessage } = this.state;
        this.setState({ content: value });
        if (errorMessage && value !== '') this.setState({ errorMessage: '' });
    }

    editArticle = () => {
        if (!this._isMounted) return;
        this.setState({ ableEdit: true });
    }

    submitEdit = () => {
        if (!this._isMounted) return;
        const {
            match: {
                params: { id },
            },
            actions,
        } = this.props;
        const { title, content } = this.state;
        if (title.trim() === '') {
            this.setState({ errorMessage: 'Title: at least one word' });
            return ;
        }
        if (content.trim() === '') {
            this.setState({ errorMessage: 'Content: at least one word' });
            return ;
        }
        const time = new Date().getTime();
        this.setState({
            ableEdit: false,
            modifiedTime: time,
        });
        actions.updateArticleData(id, title, content, time);
    }

    cancelEdit = () => {
        if (!this._isMounted) return;
        const { mappingArticle } = this.state;
        this.setState({
            ableEdit: false,
            title: mappingArticle.title,
            content: mappingArticle.content,
            modifiedTime: mappingArticle.modifiedTime,
        });
    }

    copyUrl = () => {
        const { showCopyAlert } = this.state;
        const el = this.input;
        if (showCopyAlert) return;
        el.select();
        document.execCommand("copy");
        this.setState({ showCopyAlert: true }, () => {
            setTimeout(() => {
                if (!this._isMounted) return;
                this.setState({ showCopyAlert: false });
            }, 4000);
        });
    }

    preview() {
        this.setState({ isPreview: !this.state.isPreview });
    }

    render() {
        const { history } = this.props;
        const { ableEdit, title, content, modifiedTime, errorMessage, showDoneBtn, showCopyAlert } = this.state;
        return (
            <Fragment>
                <UrlInput ref={(input) => this.input = input} defaultValue={window.location.href} />
                { showCopyAlert && <CopyAlert>success to copy url</CopyAlert> }
                <div className="ArticleContainer">
                    <div className="ArticleContent">
                        <div className="title"> 
                            <div>
                                { !ableEdit && <div>{title}</div>}
                                { ableEdit && <input type="text" value={title} onChange={this.handleChangeTitle} placeholder="at least one word" /> }
                                { errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                            </div>
                            <BtnContainer>
                                { !ableEdit &&
                                    <Fragment>
                                        <Btn text="copy" click={this.copyUrl} />
                                        <Btn text="edit" click={this.editArticle} />
                                    </Fragment>
                                }
                                { ableEdit &&
                                    <Fragment>
                                        <Btn text="preview" click={this.preview} />
                                        <Btn text="cancel" click={this.cancelEdit} />
                                        { showDoneBtn && <Btn text="done" click={this.submitEdit} />}
                                    </Fragment>
                                }
                            </BtnContainer>
                        </div>
                        { (!ableEdit || this.state.isPreview) && <ReactMarkdown className="markdown-body" source={content} escapeHtml={false} skipHtml={false} />}
                        { (ableEdit && !this.state.isPreview) && <EditMode content={content} onChange={this.handleChangeContent} />} 
                    </div>
                    <ArticleFooter modifiedTime={modifiedTime} />
                </div>
                <RedBtn onClick={() => { history.push('/') }}>back to Articles</RedBtn>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);