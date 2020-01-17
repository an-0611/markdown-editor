import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessageBox = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: red;
`;

export default function ErrorMessage(props) {
  const { errorMessage } = props;
  return (
    <ErrorMessageBox>{errorMessage}</ErrorMessageBox>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};
