import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import styled, { css } from "styled-components";
import { uuid } from 'uuidv4';

import { CreateArticle } from '../reducers/articles';

import EditMode from '../components/EditMode';
import Alert from '../components/Alert';
import Btn from '../components/Btn';

const CreatePageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    .createBtnBox {
      display: flex;
    }
    @media (max-width: 650px) {
      .title {
        flex-direction: column;
      }
      .createInputBox {
        width: 100%;
      }
      .createInputBox input {
        width: 95%;
      }
      .createBtnBox {
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 5px 0 0 0;
      }
      .createBtnBox .btn {
        width: 40%;
        margin: 0;
      }
    }
`;

const HalfContainer = styled.div`
    width: 48%;
    display: inline-block;
    vertical-align: top;
    min-height: 77vh;
    ${props => props.primary && css`
      margin-right: 20px;
    `}
`;

const mapDispatchToProps = dispatch => {
  return {
    createArticle: ({ id, title, content, time }) => dispatch(CreateArticle({ id, title, content, time })),
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
    }

    handleChangeTitle = (event) => {
      this.setState({ title: event.target.value });
      if (this.state.errorMessage && event.target.value !== '') this.setState({ errorMessage: '' });
    }

    handleChangeContent = (value) => {
      this.setState({ content: value });
      if (this.state.errorMessage && value !== '') this.setState({ errorMessage: '' });
    }

    createArticle = () => {
      const { title, content } = this.state;
      const { history } = this.props;
      if (title.trim() === '') {
        this.setState({ errorMessage: 'Title: at least one word' });
        return ;
      };
      if (content.trim() === '') {
        this.setState({ errorMessage: 'Content: at least one word' });
        return ;
      };
      const newArticle = {
        id: uuid(),
        title,
        content,
        time: new Date().getTime(),
      };
      this.props.createArticle(newArticle).then(() => {
        history.push({
          pathname: '/',
          state: {
            successCreateArticle: true,
          }
        });
      });
    }

    clearArticle = () => {
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
            {errorMessage && <Alert error alertText={errorMessage} /> }
            <CreatePageContainer>
              <HalfContainer primary className="ArticleContainer">
                <div className="ArticleContent">
                  <div className="title">{title.length === 0 ? 'title' : title}</div>
                  <ReactMarkdown className="markdown-body" source={content.length === 0 ? 'content' : content} escapeHtml={false} skipHtml={false}  />
                </div>
              </HalfContainer>
              <HalfContainer className="ArticleContainer">
                <div className="ArticleContent">
                  <div className="title"> 
                    <div className="createInputBox">
                      <input type="text" value={title} onChange={this.handleChangeTitle} placeholder="At least one word" />
                    </div>
                    <div className="createBtnBox">
                      <Btn text="submit" click={this.createArticle} />
                      <Btn text="clear" click={this.clearArticle} />
                    </div>
                  </div>
                  <EditMode content={content} onChange={this.handleChangeContent} />
                </div>
              </HalfContainer>
            </CreatePageContainer>
          </Fragment>
        );
    }
}

export default connect(null, mapDispatchToProps)(Create);