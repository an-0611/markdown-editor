import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function Page404() {
  return (
    <PageContainer>
      <h2>404</h2>
      <div>No Mapping Article</div>
    </PageContainer>
  );
}