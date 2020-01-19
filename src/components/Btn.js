import React from 'react';
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
    padding: .375rem .75rem;
    font-size: .5rem;
    line-height: 1.5;
    border-radius: .25rem;
`;

export default function Btn(props) {
    const { text, click } = props;
    return (
        <BtnContainer onClick={click}>{text}</BtnContainer>
    );
}
