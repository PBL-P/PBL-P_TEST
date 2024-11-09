import React from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";

const MainContainer = styled.div`
  padding: 8px 20px;
`;  

const SubTitle = styled.h3`
  color: #E65F2B;
  font-weight: bold;
  margin-top: 20px;
`;

const List = styled.ul`
  margin-top: 10px;
  list-style-type: disc;
  line-height: 1.6;
  padding-left: 20px;
  
`;
const NumList = styled.ol`
  margin-top: 10px;
  line-height: 1.6;
  padding-left: 20px;
  
`;

const ListItem = styled.li`
  color: #333;
  font-size: 1em;
  margin-top: 10px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  color: #333;
  line-height: 1.6;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Highlight = styled.span`
  color: #E65F2B;
  font-weight: bold;
`;

const Table = styled.table`
  width: 70%;
  min-width: 593px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 8px;
`;

const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  color: #1a73e8;
  font-weight: bold;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  color: #333;
  font-size: 0.9em;
`;

const Method = () => {
  return (
    <>
      <Title title="메인 페이지 - 프로젝트 방법" />
      <Tabs kind="main" />
      <MainContainer>
        
        <SubTitle>프로젝트 수행 과정</SubTitle>
        <Text>
          프로젝트중심학습은 <Highlight>최종 결과물</Highlight>을 염두에 두고 시작하며, 생산적인 과정으로 이루어질 필요가 있다.
        </Text>
        <Text>
          <Highlight>학습 기간</Highlight>: 2주 정도의 단기간이나 한 학기의 기간
        </Text>
        
        <SubTitle>프로젝트중심학습 구체적인 단계</SubTitle>
        <List>
          <ListItem>1단계: 학습자들이 수행해야 할 <Highlight>최종 산출물</Highlight>을 규명한다.</ListItem>
          <ListItem>2단계: 주제를 조사하고 <Highlight>프로젝트 관리에 관한 계획</Highlight>을 수립한다.</ListItem>
          <ListItem>3단계: <Highlight>프로젝트 진행 과정</Highlight>에서 제기되는 주제나 문제를 해결하면서 프로젝트를 마무리한다.</ListItem>
          <ListItem>4단계: 프로젝트의 <Highlight>결과물을 발표</Highlight>하고 평가하며 스스로 성찰할 수 있는 시간을 갖는다.</ListItem>
        </List>

        <SubTitle>프로젝트 수행 순서</SubTitle>
        <List>
          <ListItem>학습자들이 스스로 질문을 통해 현안 과제에 대한 문제를 찾아낸 뒤, <Highlight>(WHY)</Highlight></ListItem>
          <ListItem>원하는 결과를 예측하고</ListItem>
          <ListItem>정보를 수집·분석하고</ListItem>
          <ListItem>토론 과정을 통해 <Highlight>아이디어</Highlight>를 교환하고,</ListItem>
          <ListItem>활발한 커뮤니케이션을 통해 <Highlight>문제의 핵심 부분</Highlight>을 파악하고, <Highlight>(WHAT)</Highlight></ListItem>
          <ListItem>효과적으로 <Highlight>과제 해결책</Highlight>을 제시하고 <Highlight>(HOW)</Highlight></ListItem>
          <ListItem>해결하기 위한 설계</ListItem>
          <ListItem>설계를 통한 구현</ListItem>
          <ListItem>구현 결과에 대한 시험 평가</ListItem>
        </List>

        <SubTitle>프로젝트 수행 과정</SubTitle>
        <Table>
          <thead>
            <tr>
              <TableHead>내용</TableHead>
              <TableHead>세부 강연 내용</TableHead>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>프로젝트 이해</TableCell>
              <TableCell>프로젝트 이해, 특징과 파악, <Highlight>팀 구성 및 관리</Highlight></TableCell>
            </tr>
            <tr>
              <TableCell>아이디어 창출 및 다듬기</TableCell>
              <TableCell>
                <Highlight>브레인 스토밍</Highlight>, 토론을 통한 아이디어 창출, <Highlight>SCAMPER</Highlight> 기법 적용
              </TableCell>
            </tr>
            <tr>
              <TableCell>프로젝트 발표 및 보고서 작성</TableCell>
              <TableCell>보고서 작성 방법과 발표 기술, 프로젝트 일정 관리 소개</TableCell>
            </tr>
            <tr>
              <TableCell>제안서 작성</TableCell>
              <TableCell>프로젝트 개요와 목적, 국내외 사례 분석, 프로젝트 기대효과</TableCell>
            </tr>
            <tr>
              <TableCell>설계서 작성</TableCell>
              <TableCell>사용자 인터페이스 설계 및 서비스 설계</TableCell>
            </tr>
            <tr>
              <TableCell>결과보고서 작성</TableCell>
              <TableCell>결과 분석 및 평가, 향후 개선 방안</TableCell>
            </tr>
          </tbody>
        </Table>
        <SubTitle>프로젝트 중심 학습이란?</SubTitle>
        <Text>
          프로젝트를 중심으로 교수-학습 과정을 이끌어가는 교육적 접근 방식이다. 학습자가 학습을 설계하고 계획하며 결과물이나 수행을 만들어내는 과정에서 <Highlight>새로운 지식과 기술을 습득하는</Highlight> 교수-학습 방법이다.
        </Text>
        <NumList>
          <ListItem>학습자가 스스로 <Highlight>과제와 결과물을 정의</Highlight>하고</ListItem>
          <ListItem><Highlight>해결 방안을 기획</Highlight>하며</ListItem>
          <ListItem>협력적인 <Highlight>조사와 탐구를 통해 과제를 해결</Highlight></ListItem>
          <ListItem><Highlight>결과를 공유(발표)하는 과정</Highlight>을 통해 학습하는 것</ListItem>
        </NumList>

        <SubTitle>문제중심학습 차이</SubTitle>
        <Text>문제의 <Highlight>제시 시점</Highlight>이 정해져 있지 않고 <Highlight>개별 프로젝트도 진행</Highlight>할 수 있으며, 반드시 문제를 제시하지 않아도 된다. <Highlight>(새로운 아이디어 중심)</Highlight></Text>
        <Text>문제 중심 학습은 프로젝트 기반 학습과 차이가 있으며, 주로 실질적 과제를 중심으로 진행한다.</Text>

        <SubTitle>프로젝트 중심 학습 특징</SubTitle>
        <Text>전통적인 학습 방법과 달리, 학습자가 주체적인 역할을 수행하여 지식을 습득하는 방식을 따른다.</Text>
        <List>
          <ListItem><Highlight>첫째</Highlight>, 학습자 중심, 참여권장(역할)</ListItem>
          <ListItem><Highlight>둘째</Highlight>, 프로젝트를 중심으로 (다학문적, 실체적인 과제 해결)</ListItem>
          <ListItem><Highlight>셋째</Highlight>, 학습 활동에서 협동적, 고차원적 사고의 함양</ListItem>
          <ListItem><Highlight>넷째</Highlight>, 교수-학습 과정에서 교사는 주도적 역할</ListItem>
        </List>
      </MainContainer>
    </>
  );
};

export default Method;
