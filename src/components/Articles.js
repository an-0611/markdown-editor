import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';

import * as articleAction from '../actions/articleActions';

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
})

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
}

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        // console.log(this.props.history)
        const { articles, history } = this.props;
        const allArticles = articles.map((article, i) => (
            <Fragment key={i}>
                <div className="ArticleContainer fade-in" onClick={() => { history.push(`/article/${article.id}`) }}>
                    <h2>{article.title}</h2>
                    <ReactMarkdown source={article.content} />
                </div>
            </Fragment>
        ));
        return (
            <Fragment>
                {allArticles}
                <div className="fade-in-delay">已經是最後一篇文章了</div>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);