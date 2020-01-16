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
            articles: localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : props.articles,
        }
    }

    render() {
        const { history } = this.props;
        const { articles } = this.state;
        const allArticles = articles.map((article, i) => (
            <Fragment key={i}>
                <div className="ArticleContainer hover-effect fade-in" onClick={() => { history.push(`/article/${article.id}`) }}>
                    <div className="ArticleContent">
                        <div className="title">{article.title}</div>
                        <ReactMarkdown className="padding-10" source={article.content} />
                    </div>
                </div>
            </Fragment>
        ));
        return (
            <Fragment>
                {allArticles}
                <div className="bottomBtn fade-in-delay">已經是最後一篇文章了</div>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);