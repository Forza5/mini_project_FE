import React from "react";
import Navbar from "../nav/Navbar";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import "../css/reset.css";

const BodyWrap = ({ children }) => {
  return (
    <PageLayout>
      <GlobalStyle />
      <Header />
      <UnderHeader>
        {/* <Navbar /> */}
        <Body>{children}</Body>
      </UnderHeader>
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
  background-color: #ffffff;
  margin: 0 auto;
`;

const UnderHeader = styled.div`
  display: flex;
`;

const Body = styled.div`
  padding: 40px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;
