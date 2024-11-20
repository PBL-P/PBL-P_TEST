import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "./background.png";
import LoginDataService from "../../services/login.service";
import { useNavigate } from "react-router-dom";
import logo from "./jeju_logo.png";

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  width: 100%;
`;

const LoginCard = styled.div`
  max-width: 440px;
  width: 33%;
  min-width: 300px;
  min-height: 500px;
  height: 50%;
  padding: 40px 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginCardex = styled.div`
  width: 33%;
  min-width: 300px;
  min-height: 500px;
  height: 50%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const FormIdInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #333; /* 텍스트 색상 */
  background-color: #ffffff; /* 배경색 */
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  transition: border-bottom-color 0.3s;

  &:focus {
    border-bottom-color: #007bff;
  }
`;

const FormPdInput = styled.input`
  font-family: Arial, sans-serif;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #333; /* 텍스트 색상 */
  background-color: #ffffff; /* 배경색 */
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  transition: border-bottom-color 0.3s;

  &:focus {
    border-bottom-color: #007bff;
  }
`;


const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const FooterText = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const Highlight = styled.span`
  padding-left: 24px;
  color: #007bff;
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  img {
    max-width: 400px;
    height: auto;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;

  h4 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Component
const Login = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_id || !formData.password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await LoginDataService.login({
        user_id: formData.user_id,
        password: formData.password,
      });
      if (response.status === 200) {
        setIsModalOpen(true); // 모달 열기
        setTimeout(() => {
          navigate("/main"); // 1.5초 후 페이지 이동
        }, 1500);
      }
    } catch (error) {
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <LoginContainer>
        <LoginCardex></LoginCardex>
        <LoginCard>
          <Title>LOGIN</Title>
          <form style={{ width: "70%" }} onSubmit={handleSubmit}>
            <FormGroup>
              <FormIdInput
                type="text"
                id="user_id"
                placeholder="아이디를 입력해주세요."
                value={formData.user_id}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <FormPdInput
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormGroup>
            {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}
            <LoginButton type="submit">로그인</LoginButton>
          </form>
          <FooterText>
            아이디 찾기 <Highlight>비밀번호 찾기</Highlight>
          </FooterText>
        </LoginCard>
        <LoginCardex>
          <LogoWrapper>
            <img src={logo} alt="PBL-P Logo" />
          </LogoWrapper>
        </LoginCardex>
      </LoginContainer>

      {isModalOpen && (
        <>
          <Backdrop />
          <Modal>
            <h4>로그인에 성공했습니다!</h4>
          </Modal>
        </>
      )}
    </>
  );
};

export default Login;
