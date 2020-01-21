import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    h2 {
        color: #0366d6;
    }

    .App {
        text-align: left;
    }

    .App-header {
        background-color: #282c34;
        min-height: 5vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: calc(10px + 2vmin);
        color: white;
        padding: 0 15px;
    }

    .App-body {
        height: 95vh;
        background: #fff;
        padding: 15px;
    }

    .text-align-center {
        text-align: center;
    }

    .overHidden-300 {
        max-height: 300px;
        overflow: hidden;
    }

    .home {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #237dac;
        padding: 10px;
        position: relative;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.5;
        opacity: .7;
        border-bottom: 1px solid black;
    }

    .title input {
        border: 1px solid black;
        padding: 5px;
        font-size: .5rem;
        line-height: 1.5;
        border-radius: .25rem;
    }

    .ArticleContainer {
        border-radius: 3px;
        margin: 15px 0;
        font-size: 15px;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
        transition: 0.3s ease all;
        background-color: #fff;
        border: 1px solid #d1d5da;
        border-radius: 3px;
    }


    .ArticleHeader {
        color: black;
        border: 1px solid black;
        opacity: .7;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .react-codemirror2 .CodeMirror {
        height: 70vh;
    }
`;