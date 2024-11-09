import React from 'react';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import styled from 'styled-components';

const MainContainer = styled.div`
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

  /* 제목과 설명에 underline이 생기지 않도록 */
  &:hover ${VideoTitle}, &:hover ${Description} {
    text-decoration: none;
  }
`;
const videos = [
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
    title: "프로젝트 관련 동영상 3",
    description: "EBS 다큐프라임 - 4차 산업혁명, 교육패러다임의 대전환 1부",
    url: "https://www.youtube.com/watch?v=Ax5ehTYTR6U"
  },
  {
    title: "프로젝트 관련 동영상 4",
    description: "EBS 다큐프라임 - 4차 산업혁명, 교육패러다임의 대전환 2부",
    url: "https://www.youtube.com/watch?v=fkaAk-GIxLY"
  },
  {
    title: "프로젝트란?",
    description: "FREE PMP Project Management Training! WHAT IS A PROJECT",
    url: "https://www.youtube.com/watch?v=UcgCvMj50i4"
  },
  {
    title: "프로젝트 추진",
    description: "4 Stages of Project Life Cycle | Phases of Project Management Life Cycle | Knowledgehut",
    url: "https://www.youtube.com/watch?v=N3N9-RLSbvo"
  },
  {
    title: "프로젝트 주제 선정 및 아이디어 창출",
    description: "[퍼실리테이션2] 브레인스토밍 그것이 궁금하다",
    url: "https://www.youtube.com/watch?v=GwuaW5UaQGc&feature=youtu.be"
  }
];

const VideoList = () => {
  return (
    <VideoListContainer>
      {videos.map((video, index) => (
        <VideoCard href={video.url} target="_blank" rel="noopener noreferrer" key={index}>
          <Thumbnail src={`https://img.youtube.com/vi/${new URL(video.url).searchParams.get('v')}/0.jpg`} alt={video.title} />
          <div>
            <VideoTitle>{video.title}</VideoTitle>
            <Description>{video.description}</Description>
          </div>
        </VideoCard>
      ))}
    </VideoListContainer>
  );
};

const Video = () => {
  return (
    <>
      <Title title="메인 페이지 - 학습 동영상" />
      <Tabs kind="main" />
      <MainContainer>
        <SubTitle>프로젝트 관련 동영상</SubTitle>
        <VideoList />
      </MainContainer>
    </>
  );
};

export default Video;
