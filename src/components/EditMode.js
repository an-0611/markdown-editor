import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript'

export default function EditMode(props) {
    const { content, onChange } = props;
    return (
        <CodeMirror
            value={content}
            options={{
                mode: 'markdown',
                theme: 'eclipse',
                lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
                onChange(value);
            }}
            onChange={(editor, data, value) => {
            }}
        />
    );
}
