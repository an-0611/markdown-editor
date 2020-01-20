export const initialState = {
    articles: [
        {
            id: 'dea59ea7-1f1a-4d29-b900-9740cf260b72',
            title: 'title1',
            content: `# Live demo\n\nChanges are automatically rendered as you type.\n\n## Table of Contents\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, 'native' React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n\`\`\`js\nvar React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source='# Your markdown here' />,\n  document.getElementById('content')\n);\n\`\`\`\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature   | Support |\n| --------- | ------- |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |\n\n`,
            time: 1579157754943,
        },
        {
            id: '5908732b-9cb4-4e02-914d-79587e00e2c9',
            title: 'title2',
            content: `# Live demo2222\n\nChanges are automatically rendered as you type.\n\n## Table of Contents\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, 'native' React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n\`\`\`js\nvar React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source='# Your markdown here' />,\n  document.getElementById('content')\n);\n\`\`\`\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature   | Support |\n| --------- | ------- |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |\n\n`,
            time: 1579197794943,
        }
    ],
    article: {
        id: 'dea59ea7-1f1a-4d29-b900-9740cf260b72',
        title: 'title1',
        content: `# Live demo\n\nChanges are automatically rendered as you type.\n\n## Table of Contents\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, 'native' React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n\`\`\`js\nvar React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source='# Your markdown here' />,\n  document.getElementById('content')\n);\n\`\`\`\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature   | Support |\n| --------- | ------- |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |\n\n`,
        time: 1579157754943,
    },
    pending: false,
    error: '',
};

if (!window.localStorage.getItem('articles')) window.localStorage.setItem('articles', JSON.stringify(initialState.articles));
