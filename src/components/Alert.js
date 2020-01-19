import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { fadeOutUp } from '../assets/animation';

const AlertContainer = styled.div`
    border: 1px solid #cfefdf;
    background-color: #ebf8f2;
    position: relative;
    padding: 8px 48px 8px 38px;
    border-radius: 4px;
    color: rgba(0,0,0,.65);
    font-size: 12px;
    line-height: 1.5;
    animation: ${fadeOutUp} 1s ease 3s forwards;
    ${props => props.error && css`
        border: 1px solid #fcdbd9;
        background-color: #fef0ef;
    `}
`;

export default function Alert(props) {
    const { className, error, alertText} = props;
    return (
        <AlertContainer error={error} className={className}>
            <span>{alertText}</span>
        </AlertContainer>
    );
}

Alert.defaultProps = {
    className: '',
    error: false,
    alertText: '',
};

Alert.propTypes = {
    className: PropTypes.string,
    error: PropTypes.bool,
    alertText: PropTypes.string,
};