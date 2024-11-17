import React from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import VideoComponent from './VideoComponent';

const TabsBox = styled.div`
  background-color: #ffffff;
  margin-top: 120px;
  position: fixed;
  width: 100%;
  border-bottom: none; /* 기존 border-bottom 제거 */
  
  &::after {
    content: '';
    display: block;
    width: calc(64.5% - 270px); /* 원하는 너비 */
    height: 1px; /* border-bottom 두께 */
    background-color: #e0e0e0; /* border 색상 */
    margin-left: 0; /* 시작 위치 (왼쪽 기준) */
  }
`;

const MainContainer = styled.div`
  width: 95%;
  margin: 8px 24px;
  margin-top: 221px;  
`;

const TotalBox = styled.div`
  width: 64.5%;
`
const FlexBox = styled.div`
  display: flex;
  width: 100%;
`
const VideoComponentBox = styled.div`
  width: 35.5%;
`


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

const ListItem = styled.li`
  color: #333;
  font-size: 1em;
  margin-bottom: 8px;
`;

const Highlight = styled.span`
  color: #E65F2B;
  font-weight: bold;
`;

const Benefit = () => {
  return (
    <>
      <Title />
      
      <FlexBox>
        <TotalBox>
          <TabsBox>
            <Tabs kind="main"/>
          </TabsBox>

          <MainContainer>
            <SubTitle>프로젝트 수행의 효과(역량 강화)</SubTitle>
            <List>
              <ListItem>
                <Highlight>일 처리 능력</Highlight> 향상
              </ListItem>
              <ListItem>
                <Highlight>과업 수행 능력</Highlight> 향상 (기획, 설계, 구현 능력)
              </ListItem>
              <ListItem>
                새로운 <Highlight>문제 해결 능력</Highlight> 향상 (문제 파악, 분석, 해결 능력)
              </ListItem>
              <ListItem>
                <Highlight>창의적 아이디어</Highlight> 능력 향상 (상상력, 아이디어 도출 능력)
              </ListItem>
              <ListItem>
                새로운 지식을 구성(<Highlight>Searching, Making</Highlight>)하는 능력 향상 (지식 탐구력)
              </ListItem>
              <ListItem>
                과업 수행 단계별 <Highlight>결정력(Decision Making)</Highlight> 향상
              </ListItem>
              <ListItem>자율 학습 능력 향상</ListItem>
              <ListItem>
                <Highlight>메타 인지적 사고 능력</Highlight> (자신의 능력 이해, 일 이해, 전략 사용 능력)
              </ListItem>
              <ListItem>
                <Highlight>소통 능력</Highlight> (커뮤니케이션 기술 향상, 문서 작성 및 발표 능력)
              </ListItem>
              <ListItem>팀원 내 의견 협상과 설득 능력 향상</ListItem>
              <ListItem>팀원 간 <Highlight>상호 협력</Highlight> 기술 향상</ListItem>
            </List>
          </MainContainer>
          </TotalBox>
          <VideoComponentBox>
              <VideoComponent/>
            </VideoComponentBox>
        
      </FlexBox>


    </>
  );
};

export default Benefit;
