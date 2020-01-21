import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const BtnContainer = styled.div`
    width: 100%;
    margin: 0 0 0 5px;
    // display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid black;
    padding: .375rem;
    font-size: .5rem;
    line-height: 1.5;
    border-radius: .25rem;
`;

export default function Btn({ text, click }) {
    return (
        <BtnContainer onClick={click}>{text}</BtnContainer>
    );
}

Btn.defaultProps = {
    text: '',
    click: () => { },
}

Btn.propTypes = {
    text: PropTypes.string,
    click: PropTypes.func,
};
