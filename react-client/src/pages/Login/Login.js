import React from "react";
import styled from "styled-components";
import mainImage from "./main_image.png";
import logo from "./jeju_logo.png";
import text from "./text.png";

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
  min-height: 600px;
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
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 40px 20px;
  min-width: 300px;
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
  return (
    <LoginContainer>
      {/* 왼쪽 패널 */}
      <LeftPanel />

      {/* 가운데 로그인 폼 */}
      <MiddlePanel>
        <Logo src={logo} alt="제주대학교 로고" />
        <PBLBox>PBL - P 시스템</PBLBox>
        <form>
          <FormGroup>
            <Label htmlFor="student-id">아이디(학번)</Label>
            <FormInput type="text" id="student-id" placeholder="학번을 입력하세요" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <FormInput type="password" id="password" placeholder="비밀번호를 입력하세요" />
          </FormGroup>
          <LoginButton type="submit">로그인</LoginButton>
          <Links>
            <a href="#">아이디(학번) 찾기</a>
            <a href="#">비밀번호 찾기</a>
          </Links>
        </form>
      </MiddlePanel>

      {/* 오른쪽 패널 */}
      <RightPanel>
        <Heading>
          <PlanIcon src={text} alt="문서 아이콘" />
          교수 계획서
        </Heading>
        <SubHeading>1. 강좌 및 담당 교수</SubHeading>
        <Table>
          <tbody>
            <tr>
              <th>수강번호</th>
              <td>466306</td>
              <th>교과목명</th>
              <td>SW융합캡스톤디자인 I</td>
            </tr>
            <tr>
              <th>담당교수</th>
              <td>김도현</td>
              <th>이메일</th>
              <td>kimdh@jejunu.ac.kr</td>
            </tr>
            <tr>
              <th>시수/학점</th>
              <td>2/2</td>
              <th>연구실전화</th>
              <td>064-754-3658</td>
            </tr>
          </tbody>
        </Table>
        {/* 교과목 개요 */}
        <SubHeading>2. 교과목 개요</SubHeading>
        <p>
          창의적인 개발 경험과 경쟁력 있는 IT 기술을 배양하기 위해
          PBL(Project Based Learning) 기반의 학습을 진행하고, 문제 SW 프로젝트
          주제를 선정하고 소프트웨어 개발 기법 및 도구를 활용하여 실제로 사용할 수 있는 프로그램을 실질적으로
          개발한다.
        </p>

        {/* 교육 목표 */}
        <SubHeading>3. 교육 목표</SubHeading>
        <Table className="objective-table">
          <tbody>
            <tr>
              <td>1</td>
              <td>문제 해결을 위한 SW 프로젝트 주제를 선정하고 제안서를 작성할 수 있는 능력을 배양한다.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>SW 요구분석을 실시하고 설계서를 작성할 수 있는 능력을 배양한다.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>프로그램을 실질적으로 개발할 수 있는 능력을 배양한다.</td>
            </tr>
            <tr>
              <td>4</td>
              <td>구현한 프로그램을 테스트하고 최종 보고서를 작성할 수 있는 능력을 배양한다.</td>
            </tr>
          </tbody>
        </Table>
        <SubHeading>4. 교수학습 방법(비율)</SubHeading>
        <Table className="learning-method-table">
          <thead>
            <tr>
              <th>이론강의</th>
              <th>이론/실습</th>
              <th>실험/실습/실기형</th>
              <th>문제(해결)중심학습</th>
              <th>팀기반학습(협동학습)</th>
              <th>프로젝트학습</th>
              <th>토의/토론</th>
              <th>세미나</th>
              <th>하브루타</th>
              <th>플립러닝</th>
              <th>블렌디드</th>
              <th>계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>40.0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>60.0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>100%</td>
            </tr>
          </tbody>
        </Table>
        {/* 주차별 교수계획서 */}
        <SubHeading>5. 주차별 교수계획서</SubHeading>
        <Table className="weekly-plan-table">
          <thead>
            <tr>
              <th>주차</th>
              <th>교수내용(필수항목)</th>
              <th>주요 교수학습방법(필수항목)</th>
              <th>교재범위</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>캡스톤디자인 교과목 소개</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>SW 개발 절차 및 팀 구성, 성찰 및 이론 소개</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>PBL(Project Based Learning) 기반 캡스톤디자인 개발 절차 및 제안 방법 설명</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>4</td>
              <td>SW 기술 기반 개발 컴퓨터 프로그램 제안서 작성 요령 및 방법 설명</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5</td>
              <td>1차 컴퓨터 프로그램 제안서 발표 및 검토회</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>6</td>
              <td>2차 컴퓨터 프로그램 제안서 발표 및 검토회</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>7</td>
              <td>사용자 인터페이스 설계 도출 및 방법 설명</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>8</td>
              <td>UML 기반 컴퓨터 프로그램 설계서 작성법 소개</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>9</td>
              <td>사용자 인터페이스 설계 발표 및 검토회</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>10</td>
              <td>1차 컴퓨터 프로그램 설계 발표 및 검토회</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>11</td>
              <td>2차 컴퓨터 프로그램 설계 발표 및 검토회</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>12</td>
              <td>컴퓨터 프로그램 테스트 및 최종 결과 보고서 작성 요령</td>
              <td>이론강의</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>13</td>
              <td>1차 컴퓨터 프로그램 구현 결과 발표 및 평가</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>14</td>
              <td>2차 컴퓨터 프로그램 구현 결과 발표 및 평가</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>15</td>
              <td>3차 컴퓨터 프로그램 구현 결과 발표 및 평가</td>
              <td>프로젝트학습</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        {/* 평가 방법 */}
        <SubHeading>6. 평가방법</SubHeading>
        <Table className="evaluation-table">
          <thead>
            <tr>
              <th>평가요소</th>
              <th>출석</th>
              <th>중간고사</th>
              <th>기말고사</th>
              <th>과제물</th>
              <th>수시고사</th>
              <th>기타</th>
              <th>계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GRADE</td>
              <td>20</td>
              <td>20</td>
              <td>40</td>
              <td>20</td>
              <td>0</td>
              <td>0</td>
              <td>100</td>
            </tr>
          </tbody>
        </Table>

        {/* 과제 */}
        <SubHeading>7. 과제</SubHeading>
        <Table className="assignment-table">
          <thead>
            <tr>
              <th>상태</th>
              <th>과제</th>
              <th>과제명</th>
              <th>참고사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>과제1</td>
              <td>SW 캡스톤디자인 설계 보고서</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        {/* 기타 사항 */}
        <SubHeading>8. 기타 사항</SubHeading>
        <p>
          중간고사는 제안서 발표 및 평가로 진행될 예정입니다. <br />
          기말고사는 최종 결과 발표 및 보고서로 진행될 예정입니다.
        </p>
    
    
      </RightPanel>
    </LoginContainer>
  );
};

export default Login;
