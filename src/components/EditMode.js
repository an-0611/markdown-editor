import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/mode/markdown/markdown';
// import 'codemirror/mode/javascript/javascript';
import {Controlled as CodeMirror} from 'react-codemirror2';

export default function EditMode(props) {
    const { content, onChange } = props;
    let option = {
        mode: 'markdown',
        theme: 'elegant',
        lineNumbers: true,
    }
    return (
        <CodeMirror
            value={content}
            options={option}
            onBeforeChange={(editor, data, value) => {
                onChange(value);
            }}
            onChange={(editor, data, value) => {
            }}
        />
    );
}
