import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Layout from "../components/Layout";
import main_logo from "../img/main_logo.png";
import { Link } from "react-router-dom";
import "../css/Login.css";
import signup from "../img/signup.jpg";
import { HiArrowRight } from "react-icons/hi";

const SignUp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ids = useRef();
  const pws = useRef();

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

  const idCheck = () => {
    axios
      .get("https://tastekim.shop/signup", {
        id: { loginId: loginId },
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.data);
        } else {
          alert(response.error.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Layout>
      <form onSubmit={onSubmitHandler}>
        <div>
          <H1Ani>
            <Link to="/">
              <ImgStyle src={main_logo} />
            </Link>
          </H1Ani>
        </div>
        <InputSize>
          <LeftForm>
            <H2Center className="animates ani1">회원가입</H2Center>
            <AllInputBox>
              <LabelBox htmlFor="ids" className="animates ani2">
                아이디
              </LabelBox>
              <InputBox
                className="animates ani3"
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={idChanger}
                value={loginId}
                id="ids"
              />
              {/* <button type="button" onClick={idCheck}>
                중복확인
              </button> */}
              {loginId.length > 0 ? (
                <SpanMessage>{idErrorMessage}</SpanMessage>
              ) : null}
            </AllInputBox>
            <AllInputBox>
              <LabelBox htmlFor="pws" className="animates ani4">
                비밀번호
              </LabelBox>
              <InputBox
                className="animates ani5"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={pwChanger}
                value={password}
                id="pws"
              />
              {password.length > 0 ? (
                <SpanMessage>{pwErrorMessage}</SpanMessage>
              ) : null}
            </AllInputBox>
            <AllInputBox>
              <LabelBox htmlFor="pwcheck" className="animates ani6">
                비밀번호 확인
              </LabelBox>
              <InputBox
                className="animates ani7"
                placeholder="비밀번호를 확인해주세요"
                type="password"
                onChange={pwConChanger}
                value={confirmPassword}
                id="pwcheck"
              />
              {confirmPassword.length > 0 ? (
                <SpanMessage id="dis">{pwConErrorMessage}</SpanMessage>
              ) : null}
            </AllInputBox>

            <ButtonAni className="animates ani8">회원가입</ButtonAni>
            <MoveSign className="animates ani7">
              <Pstyle>이미 회원이신가요?</Pstyle>
              <Link to="/login" className="moveArr">
                로그인 하러가기
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

export default SignUp;

const H1Ani = styled.h1`
  text-align: center;
  padding: 20px 0;
`;

const AllInputBox = styled.div`
  margin-bottom: 30px;
  position: relative;
  :last-child {
    margin-bottom: 0;
  }
`;

const LabelBox = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #ddd;
  outline: 0;
  :focus {
    border-color: #000;
  }
`;

const ImgStyle = styled.img`
  width: 500px;
  height: 200px;
`;

const H2Center = styled.h2`
  text-align: center;
`;

const SpanMessage = styled.span`
  display: inline-block;
  height: 20px;
  position: absolute;
  left: 7px;
  bottom: -23px;
`;

const ButtonAni = styled.button`
  border: none;
  border-radius: 5px;
  height: 40px;
  font-weight: bold;
  margin-top: 20px;
  font-size: 18px;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #000;
    border: 2px solid #ddd;
  }
`;

const RightForm = styled.div`
  flex: 1;
  background: transparent;
  transition: 1s;
  width: 1300px;
  height: 550px;
  background-image: url(${signup});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
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

const InputSize = styled.div`
  display: flex;
`;

const MoveSign = styled.div`
  display: flex;
  align-items: center;
`;

const Pstyle = styled.p`
  margin-right: 10px;
`;
