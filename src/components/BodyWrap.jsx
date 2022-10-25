import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const BodyWrap = ({ children }) => {
  return (
    <PageLayout>
      <GlobalStyle />
      {children}
    </PageLayout>
  );
};

export default BodyWrap;

const GlobalStyle = createGlobalStyle`
body{
  margin: 0px;
}`;

const PageLayout = styled.div`
  width: 1300px;
  margin: auto;
`;
