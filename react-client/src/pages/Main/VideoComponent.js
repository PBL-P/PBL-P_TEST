// VideoComponent.js
import React from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";

const MainContainer = styled.div`
  margin-top: 201px;
  padding: 8px 20px;
`;

const SubTitle = styled.h3`
  color: #E65F2B;
  font-weight: bold;
  margin-top: 20px;
`;

const VideoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
`;

const Thumbnail = styled.img`
  width: 160px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const VideoTitle = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Description = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-top: 4px;
  text-decoration: none;
`;

const VideoCard = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:hover ${VideoTitle}, &:hover ${Description} {
    text-decoration: none;
  }
`;

// 상단 타이틀
const TabContainer = styled.div`
  width: 30%;
  position: fixed;
  z-index: 100;
  margin: 0px 24px;
  height: 81px;
  padding-bottom: 24px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 120px;
  border-bottom: 1px solid #e0e0e0;
  
`;

const TabItem = styled.div`
  padding: 18px 20px;
  height: 81px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#000'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`

// 각 섹션의 데이터를 정의합니다
const sections = [
  {
    videos: [
      {
        title: "프로젝트 관련 동영상 1",
        description: "고려대 총장 교육이란",
        url: "https://www.youtube.com/watch?v=ifNJQj-nie0"
      },
      {
        title: "프로젝트 관련 동영상 2",
        description: "4차 산업혁명, 교육 패러다임의 대전환",
        url: "https://www.youtube.com/watch?v=wgDn0_Z3KCY"
      },
      {
        title: "프로젝트 좋은 점 1",
        description: "EBS 다큐프라임 - 4차 산업혁명, 교육패러다임의 대전환 1부",
        url: "https://www.youtube.com/watch?v=Ax5ehTYTR6U"
      },
      {
        title: "프로젝트란?",
        description: "FREE PMP Project Management Training! WHAT IS A PROJECT",
        url: "https://www.youtube.com/watch?v=UcgCvMj50i4"
      },
      {
        title: "프로젝트 방법 1",
        description: "4 Stages of Project Life Cycle | Phases of Project Management Life Cycle | Knowledgehut",
        url: "https://www.youtube.com/watch?v=N3N9-RLSbvo"
      },
      {
        title: "아이디어 창출",
        description: "[퍼실리테이션2] 브레인스토밍 그것이 궁금하다",
        url: "https://www.youtube.com/watch?v=GwuaW5UaQGc&feature=youtu.be"
      }
    ]
  },
];

const VideoComponent = () => {
  return (
    <>      
    <FlexBox>
      <TabContainer>
        <TabItem active="" >
          학습 동영상
        </TabItem>
      </TabContainer>
      {sections.map((section, index) => (
        <MainContainer key={index}>
          <SubTitle>{section.title}</SubTitle>
          <VideoListContainer>
            {section.videos.map((video, idx) => (
              <VideoCard href={video.url} target="_blank" rel="noopener noreferrer" key={idx}>
                <Thumbnail src={`https://img.youtube.com/vi/${new URL(video.url).searchParams.get('v')}/0.jpg`} alt={video.title} />
                <div>
                  <VideoTitle>{video.title}</VideoTitle>
                  <Description>{video.description}</Description>
                </div>
              </VideoCard>
            ))}
          </VideoListContainer>
        </MainContainer>
        
      ))}
      </FlexBox>
    </>
  );
};

export default VideoComponent;
