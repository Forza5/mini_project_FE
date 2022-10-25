import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import main_logo from "../img/main_logo.png";
import dog_cat from "../img/dog&cat.jpg";
import styled, { keyframes } from "styled-components";
import "../css/Login.css";
import "../fonts/fonts.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const users = useRef();
  const pws = useRef();

  const logInForm = () => {
    console.log(users.current.value);
    console.log(pws.current.value);
    axios({
      method: "POST",
      url: "http://54.82.19.91/login",
      data: {
        loginId: users.current.value,
        password: pws.current.value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("loginId", users.current.value);
          // localStorage.setItem("password", pws.current.value);
          alert(`${users.current.value}님 반갑습니다!!`);
          navigate("/");
        } else {
          alert("가입한 정보가 없습니다.");
        }
      })
      .catch((error) => {
        if (!error?.response) {
          alert("서버 연결이 되지 않았습니다.");
        } else if (error.response?.status === 400) {
          alert("아이디 혹은 비밀번호가 틀립니다.");
        } else if (error.response?.status === 401) {
          alert("권한이 없습니다.");
        }
      });
  };

  return (
    <Layout>
      <form>
        <div>
          <H1Ani>
            <Link to="/">
              <ImgCenter src={main_logo} alt="메인 로고" />
            </Link>
          </H1Ani>
        </div>
        <InputSize>
          <LeftForm>
            <H2Ani className="animates ani1">로그인</H2Ani>
            <LeftInnerForm>
              <LabelSize className="animates ani2" htmlFor="Ids">
                아이디
              </LabelSize>
              <InputAni
                className="animates ani3"
                type="text"
                id="Ids"
                ref={users}
                placeholder="아이디를 입력해주세요"
              />

              <LabelSize htmlFor="Pws" className="animates ani4">
                비밀번호
              </LabelSize>
              <InputAni
                className="animates ani5"
                type="password"
                id="Pws"
                ref={pws}
                placeholder="비밀번호를 입력해주세요"
              />
            </LeftInnerForm>
            <ButtonAni
              className="animates ani6"
              type="button"
              onClick={() => {
                logInForm();
              }}
            >
              로그인
            </ButtonAni>
            <MoveSign className="animates ani7">
              <Pstyle>아직 회원이 아니신가요?</Pstyle>
              <Link to="/signin" className="moveArr">
                회원가입 하러가기
                <span>
                  <HiArrowRight className="moves" />
                </span>
              </Link>
            </MoveSign>
          </LeftForm>
          <RightForm></RightForm>
        </InputSize>
      </form>
    </Layout>
  );
};

export default Login;

const H1Ani = styled.h1`
  text-align: center;
  padding: 40px 0;
`;

const ImgCenter = styled.img`
  width: 500px;
  height: 200px;
`;

const H2Ani = styled.h2`
  font-size: 25px;
  margin-bottom: 40px;
`;

const InputSize = styled.div`
  display: flex;
`;

const LabelSize = styled.label`
  font-size: 18px;
  margin-bottom: 8px;
  padding-left: 5px;
`;

const LeftAnimation = keyframes`
  0%{
    opacity: 0;
    width: 0;
  }
  100%{
    opacity: 1;
    width: 500px;
  }
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${LeftAnimation};
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: both;
  padding: 40px;
  box-sizing: border-box;
  justify-content: center;
`;

const LeftInnerForm = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
`;

const InputAni = styled.input`
  height: 45px;
  padding: 0 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: all 0.2s;
  outline: 0;
  margin-bottom: 30px;
  :focus {
    border-color: #000;
  }
`;

const ButtonAni = styled.button`
  border: none;
  border-radius: 5px;
  width: 80%;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  background: #000;
  color: #fff;
  cursor: pointer;
  animation-delay: 2.5s;
  border: 2px solid #000;
  transition: all 0.4s;
  &:hover {
    background: #fff;
    color: #000;
    border: 2px solid #ccc;
  }
`;

const RightForm = styled.div`
  flex: 1;
  background: transparent;
  transition: 1s;
  width: 1300px;
  height: 550px;
  background-image: url(${dog_cat});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const MoveSign = styled.div`
  display: flex;
  align-items: center;
`;

const Pstyle = styled.p`
  margin-right: 10px;
`;
