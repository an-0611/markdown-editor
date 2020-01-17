
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatTime } from '../common/utils';

const FooterContainer = styled.div`
  font-size: 8px;
  color: black;
  border-top: 1px solid black;
  opacity: .7;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function ArticleFooter(props) {
  const { modifiedTime } = props;
  return (
    <FooterContainer>
      <div>{`Last-Modified: ${formatTime(modifiedTime)}`}</div>
    </FooterContainer>
  );
}

ArticleFooter.propTypes = {
  modifiedTime: PropTypes.number.isRequired,
};
