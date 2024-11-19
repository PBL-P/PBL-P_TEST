import React, { useState } from "react";
import styled from "styled-components";
import mainImage from "./main_image.png";
import logo from "./jeju_logo.png";
import text from "./text.png";
import LoginDataService from "../../services/login.service";
import { useNavigate } from "react-router-dom";

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  min-height: 600px;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 0 0 25%;
  background: url(${mainImage}) no-repeat center center;
  background-size: cover;
  min-width: 300px;
  height: 100%;
  overflow: hidden;
`;

const MiddlePanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 40px 20px;
  width: 100%;
`;

const Logo = styled.img`
  width: 180px;
  margin-bottom: 20px;
  display: block;
`;

const PBLBox = styled.div`
  display: inline-block;
  background-color: #d5d9dc;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Links = styled.div`
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    font-weight: bold;

    &:first-child {
      color: #000;
    }

    &:last-child {
      color: red;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RightPanel = styled.div`
  flex: 0 0 45%;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;
  height: 100%;
  min-width: 300px;
`;

const Heading = styled.h3`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const SubHeading = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  th {
    background-color: #5b9de3;
    color: white;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
  }

  td {
    background-color: #d8d6d6;
    text-align: left;
    border: 1px solid #ddd;
    padding: 8px;

    &:first-child {
      font-weight: bold;
      background-color: #f0f4f8;
    }
  }

  tr:nth-child(even) td {
    background-color: #f9f9f9;
  }
`;

const PlanIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

// Component
const Login = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_id || !formData.password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await LoginDataService.login({
        user_id: formData.user_id,
        password: formData.password,
      });
      console.log(response.status);
      if (response.status === 200) {
        // 성공적으로 로그인한 경우
        setSuccessMessage("로그인에 성공했습니다!");
        setErrorMessage("");
        console.log("로그인 성공:", response.data);

        // 필요한 경우 리다이렉트 처리
        // /main으로 리다이렉트
        navigate("/main");
              
      }
    } catch (error) {
      setSuccessMessage("");
      if (error.response) {
        // 서버가 반환한 오류
        if (error.response.status === 400) {
          setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.");
        } else if (error.response.status === 500) {
          setErrorMessage("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        // 네트워크 오류 등
        setErrorMessage("서버와의 연결에 실패했습니다. 인터넷 연결을 확인해주세요.");
      }
      console.error("로그인 오류:", error.response?.data || error.message);
    }
  };
  return (
    <LoginContainer>

      {/* 가운데 로그인 폼 */}
      <MiddlePanel>
      <Logo src={logo} alt="제주대학교 로고" />
        <PBLBox>PBL - P 시스템</PBLBox>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="user_id">아이디</Label>
            <FormInput
              type="text"
              id="user_id"
              placeholder="아이디를 입력하세요"
              value={formData.user_id}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <FormInput
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormGroup>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <LoginButton type="submit">로그인</LoginButton>
          <Links>
            <a href="#">아이디(학번) 찾기</a>
            <a href="#">비밀번호 찾기</a>
          </Links>
        </form>
      </MiddlePanel>

      
    </LoginContainer>
  );
};

export default Login;
