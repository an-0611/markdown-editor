import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { FetchArticle, UpdateArticles } from '../reducers/articles';

import styled from "styled-components";
import { fadeInDown, fadeOutUp } from '../assets/animation';

import Alert from '../components/Alert';
import EditMode from '../components/EditMode';
import ArticleFooter from '../components/ArticleFooter';
import Btn from '../components/Btn';

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

const mapStateToProps = state => ({
    article: state.articlesReducer.article,
    pending: state.articlesReducer.pending,
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        getArticle: (id) => dispatch(FetchArticle(id)),
        updateArticles: ({ id, title, content, time }) => dispatch(UpdateArticles({ id, title, content, time })),
    }
};

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cacheArticle: {},
            ableEdit: false,       
            errorMessage: '',
            showDoneBtn: false,
            showCopyAlert: false,
            isPreview: false,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (!this._isMounted) return;
        this.fetchMappingArticle();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this._isMounted) return;
        const { cacheArticle } = this.state;
        if (prevProps.article.title !== cacheArticle.title && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevProps.article.content !== cacheArticle.content && !prevState.showDoneBtn) {
            this.setState({ showDoneBtn: true });
        }
        if (prevProps.article.title === cacheArticle.title && prevProps.article.content === cacheArticle.content && prevState.showDoneBtn) {
            this.setState({ showDoneBtn: false });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchMappingArticle = () => {
        const { match: { params: { id }, }, } = this.props;
        this.props.getArticle(id).then(() => {
            this.setState({ cacheArticle: this.props.article });
        });
    }

    handleChangeTitle = (event) => {
        if (!this._isMounted) return;
        const { errorMessage, cacheArticle } = this.state;
        this.setState({
            cacheArticle: {
                ...cacheArticle,
                title: event.target.value,
            }
        });
        if (errorMessage && event.target.value.trim() !== '') this.setState({ errorMessage: '' });
    }

    handleChangeContent = (value) => {
        if (!this._isMounted) return;
        const { errorMessage, cacheArticle } = this.state;
        this.setState({ content: value });
        this.setState({
            cacheArticle: {
                ...cacheArticle,
                content: value,
            }
        });
        if (errorMessage && value.trim() !== '') this.setState({ errorMessage: '' });
    }

    editArticle = () => {
        this.setState({ ableEdit: true });
    }

    submitEdit = () => {
        if (!this._isMounted) return;
        const { match: { params: { id }, }, } = this.props;
        const {
            cacheArticle: {
                title, content,
            }
        } = this.state;
        if (title === '') {
            this.setState({ errorMessage: 'Title: at least one word' });
            return ;
        }
        if (content === '') {
            this.setState({ errorMessage: 'Content: at least one word' });
            return ;
        }
        this.setState({ ableEdit: false, showDoneBtn: false });
        this.props.updateArticles({
            id,
            title,
            content,
            time: new Date().getTime(),
        });
        this.fetchMappingArticle();
    }

    cancelEdit = () => {
        const { article } = this.props;
        this.setState({
            ableEdit: false,
            cacheArticle: {...article},
        });
    }

    copyUrl = () => {
        const { showCopyAlert } = this.state;
        if (showCopyAlert) return;
        const el = this.input;
        el.select();
        document.execCommand("copy");
        this.setState({ showCopyAlert: true }, () => {
            setTimeout(() => {
                if (!this._isMounted) return;
                this.setState({ showCopyAlert: false });
            }, 4000);
        });
    }

    preview = () => {
        this.setState({ isPreview: !this.state.isPreview });
    }

    render() {
        const { history, article, pending } = this.props;
        const { ableEdit, errorMessage, showDoneBtn, showCopyAlert, cacheArticle, isPreview } = this.state;
        if (pending) return <div>Loading...</div>;
        return (
            <Fragment>
                {errorMessage && <Alert error alertText={errorMessage} /> }
                <UrlInput ref={(input) => this.input = input} defaultValue={window.location.href} />
                { showCopyAlert && <CopyAlert>success to copy url</CopyAlert> }
                <div className="ArticleContainer">
                    <div className="ArticleContent">
                        <div className="title"> 
                            <div>
                                { !ableEdit && <div>{article.title}</div>}
                                { ableEdit && <input type="text" value={cacheArticle.title} onChange={this.handleChangeTitle} placeholder="at least one word" /> }
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
                                        <Btn text={ isPreview ? 'unpreview' : 'preview' } click={this.preview} />
                                        <Btn text="cancel" click={this.cancelEdit} />
                                        { showDoneBtn && <Btn text="done" click={this.submitEdit} />}
                                    </Fragment>
                                }
                            </BtnContainer>
                        </div>
                        { (!ableEdit || this.state.isPreview) && <ReactMarkdown className="markdown-body" source={isPreview ? cacheArticle.content : article.content} escapeHtml={false} skipHtml={false} />}
                        { (ableEdit && !this.state.isPreview) && <EditMode content={cacheArticle.content} onChange={this.handleChangeContent} />} 
                    </div>
                    <ArticleFooter time={article.time} />
                </div>
                <RedBtn onClick={() => { history.push('/') }}>back to Articles</RedBtn>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);