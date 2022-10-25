import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Layout from "../components/Layout";
import main_logo from "../img/main_logo.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  //id, password 확인
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //오류메세지
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [pwConErrorMessage, setPwConErrorMessage] = useState("");

  //유효성검사
  const [checkId, setCheckId] = useState(false);
  const [checkPassWord, setCheckPassWord] = useState(false);
  const [checkPwConfirm, setCheckPwConfirm] = useState(false);

  //정규식
  const idReg = /^[a-zA-Z0-9]{6,12}$/;
  const passWordReg = /^[\w.!@#$%^&*-]{8,12}$/;

  //onChange 변경함수
  //id 확인
  const idChanger = (e) => {
    setLoginId(e.target.value);

    if (idReg.test(e.target.value)) {
      setIdErrorMessage("사용가능한 ID입니다.");
      setCheckId(true);
    } else {
      setIdErrorMessage("6~12자의 숫자, 문자 혼합으로만 만들 수 있습니다.");
      setCheckId(false);
    }
  };

  //password 확인
  const pwChanger = (e) => {
    setPassword(e.target.value);

    if (passWordReg.test(e.target.value)) {
      setPwErrorMessage("사용가능한 PASSWORD입니다.");
      setCheckPassWord(true);
    } else {
      setPwErrorMessage("8~12자의 문자, 숫자, 특수문자의 혼합만 가능합니다.");
      setCheckPassWord(false);
    }
  };

  //password 재확인
  const pwConChanger = (e) => {
    setConfirmPassword(e.target.value);

    if (password === e.target.value) {
      setPwConErrorMessage("비밀번호가 일치합니다.");
      setCheckPwConfirm(true);
    } else {
      setPwConErrorMessage("비밀번호가 일치하지 않습니다.");
      setCheckPwConfirm(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://54.82.19.91/signup", {
        loginId: loginId,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        } else {
          alert("다시 회원가입 해주세요.");
          console.log(response);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Layout>
      <SignBox onSubmit={onSubmitHandler}>
        <div>
          <div>
            <Link to="/">
              <ImgStyle src={main_logo} />
            </Link>
          </div>
        </div>
        <DivMargin>
          <H2Center>회원가입</H2Center>
          <AllInputBox>
            <LabelBox>아이디</LabelBox>
            <InputBox
              placeholder="아이디를 입력해주세요"
              type="text"
              onChange={idChanger}
              value={loginId}
            />
            <button type="button">중복확인</button>
            <SpanMessage>{idErrorMessage}</SpanMessage>
          </AllInputBox>
          <AllInputBox>
            <LabelBox>비밀번호</LabelBox>
            <InputBox
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onChange={pwChanger}
              value={password}
            />
            <SpanMessage>{pwErrorMessage}</SpanMessage>
          </AllInputBox>
          <AllInputBox>
            <LabelBox>비밀번호 확인</LabelBox>
            <InputBox
              placeholder="비밀번호를 확인해주세요"
              type="password"
              onChange={pwConChanger}
              value={confirmPassword}
            />
            <SpanMessage>{pwConErrorMessage}</SpanMessage>
          </AllInputBox>
        </DivMargin>
        <div>
          <button>회원가입</button>
        </div>
      </SignBox>
    </Layout>
  );
};

export default SignUp;

const SignBox = styled.form`
  width: 500px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AllInputBox = styled.div`
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0;
  }
`;

const LabelBox = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  box-sizing: border-box;
`;

const ImgStyle = styled.img`
  width: 500px;
  height: 200px;
`;

const H2Center = styled.h2`
  text-align: center;
`;

const DivMargin = styled.div`
  margin-top: 20px;
`;

const SpanMessage = styled.span`
  display: inline-block;
  height: 20px;
`;
