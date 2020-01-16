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

const mapStateToProps = state => ({
    articles: state.articlesReducer.articles,
})

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({ ...articleAction }, dispatch),
    }
}

class EditMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || '',
            content: props.content || '',
        }
    }

    componentDidMount() {

    }

    render() {
        // const {} = this.props;
        const { content } = this.state;

        return (
          <CodeMirror
            value={content}
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMode);