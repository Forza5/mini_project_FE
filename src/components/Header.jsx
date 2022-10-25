import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../fonts/fonts.css";
import main_logo from "../img/main_logo.png";
import { Link } from "react-router-dom";
import cookies from "react-cookie";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";

const Header = () => {
  const navigate = useNavigate();

  const loginId = localStorage.getItem("loginId");

  const writeMove = () => {
    navigate("/write");
  };

  const logOut = () => {
    alert("로그아웃 완료!");
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <Head>
      <FlexDiv>
        <div>
          <Link to="/" style={{ margin: "0" }}>
            <H1Size>
              <ImgSize src={main_logo} alt="" />
            </H1Size>
          </Link>
        </div>

        {!loginId ? (
          <InputFlex>
            <div>
              <BtnStyle
                style={{ marginRight: "10px" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <BiLogIn
                  style={{
                    fontSize: "15px",
                    position: "relative",
                    top: "-1px",
                    marginRight: "5px",
                  }}
                />
                로그인
              </BtnStyle>
            </div>

            <div>
              <BtnStyle
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <AiOutlineUserAdd
                  style={{
                    fontSize: "15px",
                    position: "relative",
                    top: "-1px",
                    marginRight: "5px",
                  }}
                />
                회원가입
              </BtnStyle>
            </div>
          </InputFlex>
        ) : null}
        {loginId ? (
          <InputFlex>
            <p style={{ marginRight: "20px", fontSize: "15px" }}>
              {loginId}님 환영합니다!
            </p>
            <div style={{ marginRight: "10px" }}>
              <BtnStyle onClick={writeMove}>
                {" "}
                <TfiWrite
                  style={{
                    fontSize: "15px",
                    position: "relative",
                    top: "-1px",
                    marginRight: "5px",
                  }}
                />
                글쓰기
              </BtnStyle>
            </div>
            <div>
              <BtnStyle onClick={logOut}>
                <FiLogOut
                  style={{
                    fontSize: "15px",
                    position: "relative",
                    top: "-1px",
                    marginRight: "5px",
                  }}
                />
                로그아웃
              </BtnStyle>
            </div>
          </InputFlex>
        ) : null}
      </FlexDiv>
    </Head>
  );
};

export default Header;

const Head = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  background: transparent;
  border-bottom: 1px solid #000;
  display: flex;
`;

const H1Size = styled.h1`
  width: 150px;
  margin: 0;
`;

const ImgSize = styled.img`
  width: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const InputFlex = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
`;

const BtnStyle = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  font-size: 15px;
  cursor: pointer;
`;

const SvgSize = styled.svg`
  font-size: 20px;
  position: relative;
  top: 1px;
`;
