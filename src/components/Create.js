import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';

import { uuid } from 'uuidv4';

import * as articleAction from '../actions/articleActions';

import EditMode from './EditMode';
import ErrorMessage from './ErrorMessage';

// const mapStateToProps = state => ({
//     articles: state.articlesReducer.articles,
// })

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
}

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          content: '',
          errorMessage: '',
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.clearArticle = this.clearArticle.bind(this);
    }

    handleChangeTitle(event) {
      this.setState({ title: event.target.value });
      const { errorMessage } = this.state;
      if (errorMessage && event.target.value !== '') this.setState({ errorMessage: '' });
    }

    handleChangeContent(value) {
      this.setState({ content: value });
    }

    createArticle() {
      const { title, content } = this.state;
      const { actions, history } = this.props;
      // if (title.trim() === '' || title.length === 0) {
      //   this.setState({ errorMessage: '標題不可為空，請至少輸入一字' });
      //   return ;
      // };
      // actions.createArticle({ // create actions
      //   id: uuid(),
      //   title,
      //   content,
      //   modifiedTime: new Date().getTime(),
      // });
      history.push({
        pathname: '/',
        state: {
          successCreateArticle: true, // 首頁如果有 出現一個alert 您剛剛成功新增XXX
        }
      });
    }

    clearArticle() {
      this.setState({
        title: '',
        content: '',
        errorMessage: '',
      })
    }

    render() {
        const { title, content, errorMessage } = this.state;
        return (
          <Fragment>
            <div className="ArticleContainer">
              <div className="ArticleContent">
                <div className="title">
                  <div>
                    <input type="text" value={title} onChange={this.handleChangeTitle} placeholder="請輸入至少一個字元" />
                    { errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                    <div className="btn" onClick={() => { this.createArticle(); }}>確認送出</div>
                    <div className="btn" onClick={() => { this.clearArticle(); }}>清空</div>
                   </div>
                </div>
                <EditMode content={content} onChange={this.handleChangeContent} />
              </div>
            </div>
            {/* <div className="underline" />  */}
            <div className="text-align-center">preview section</div>
            <div className="ArticleContainer">
              <div className="ArticleContent">
                <div className="title">{title.length === 0 ? '標題' : title}</div>
                <ReactMarkdown className="padding-10" source={content.length === 0 ? '內容' : content} />
              </div>
            </div>
          </Fragment>
        );
    }
}

export default connect(null, mapDispatchToProps)(Create);