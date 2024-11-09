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
  margin-bottom: 10px;
`;

const Text = styled.p`
  line-height: 1.6;
  color: #333;
  margin: 10px 0;
`;

const BulletList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: #555;
`;

const BulletItem = styled.li`
  margin: 8px 0;
  color: ${props => props.highlight ? '#E65F2B' : '#333'};
  font-weight: ${props => props.highlight ? 'bold' : 'normal'};
`;

const Example = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-left: 5px solid #1a73e8;
  font-size: 0.9em;
  color: #333;
`;
const SectionBox = styled.div`
    margin-bottom: 48px;
`

const Main = () => {
  return (
    <>
        <Title title="메인 페이지 - 프로젝트 개요" />
        <Tabs kind="main" />
        <MainContainer>
        <SectionBox>
        <SubTitle>프로젝트란?</SubTitle>
        <Text>
            일정한 기간 안에 일정한 목적을 달성하기 위해 수행하는 업무의 묶음
        </Text>
        <BulletList>
            <BulletItem>어떤 과업을 칭하거나 특정한 목표를 위한 행위, 제품이나 서비스의 개발, 홍보, 개선활동 등의 모든 부분의 작업을 의미</BulletItem>
            <BulletItem highlight>제한된 시간 안에 한정된 자원으로 목표하는 일을 완수해야 하는 작업</BulletItem>
            <BulletItem>특정한 시스템의 설계, 연구 개발, 건설 공사 등 한 번에 완결되는 성격을 가지는 작업을 가리키는 말</BulletItem>
        </BulletList>
        <Example>
            <strong>사례:</strong> 홍길동 학생이 2020년 5월 5일까지 완성해야 하는 ‘제주도 벚꽃 앱 프로그램’ 개발도 프로젝트라고 할 수 있다.
        </Example>
        </SectionBox>
        <SubTitle>프로젝트 특징</SubTitle>
        <BulletList>
            <BulletItem highlight>프로젝트는 일시적(temporary)이다.</BulletItem>
            <Text>프로젝트는 시작과 끝이 분명한 특성을 가지고 있다.</Text>
            <BulletList>
            <BulletItem>‘제주도 벚꽃 앱 프로그램’ 또한 오늘부터 5월 5일 까지라는 정해진 기한을 가지고 있으며 이를 지키지 못할 경우 불이익을 받는다.</BulletItem>
            </BulletList>

            <BulletItem highlight>프로젝트는 목적(Propose)이 있다.</BulletItem>
            <Text>프로젝트는 반드시 달성하고자 하는 목적을 가지고 있다.</Text>
            <BulletList>
            <BulletItem>홍길동이 만드는 ‘제주도 벚꽃 앱 프로그램’을 통해 제주 관광을 편하게 돕고 지원하는 목적을 가지고 있다.</BulletItem>
            </BulletList>

            <BulletItem highlight>프로젝트는 고유한 결과물(output)이 존재한다.</BulletItem>
            <Text>프로젝트는 유유명(제품, 서비스, 소프트웨어 등)이 발생한다.</Text>
            <BulletList>
            <BulletItem>‘제주도 벚꽃 앱 프로그램’이라는 결과물이 있다.</BulletItem>
            </BulletList>

            <BulletItem highlight>프로젝트는 가능한 유일(unique)한 것을 도출한다. (창의성)</BulletItem>
            <Text>프로젝트 결과물은 이전 다른 프로젝트를 통해 똑같은 결과물이 나온 적이 없는 유일한 결과물이다.</Text>

            <BulletItem highlight>프로젝트는 점진적으로 구체화(progressive elaboration)된다.</BulletItem>
            <Text>프로젝트는 처음에는 애매한 추상적이지만, 나중에는 점차 구체화되는 특징을 가지고 있다.</Text>
            <BulletList>
            <BulletItem>‘제주도 벚꽃 앱 프로그램’ 또한 처음에는 머리 속에 대충 이런 기능이 있으면 좋겠구나 하는 생각만 가지고 있다가 기획과 설계 단계를 거치면서 하나씩 구체화 된다.</BulletItem>
            </BulletList>

            <BulletItem highlight>프로젝트는 불확실성(uncertainty)을 갖고 있다.</BulletItem>
            <Text>모든 프로젝트는 크고 작거나 예측 가능하거나 불가능한 수수한 불확실성이 내재되어 있다.</Text>
        </BulletList>

        <Example>
            <Text>건축/토목분야에서 먼저 프로젝트의 개념이 정리되고 구체화되었으나, 현재 소프트웨어 분야 뿐 외에도 다양한 거의 모든 분야에서 프로젝트를 수행하고 있다.</Text>
        </Example>
        </MainContainer>
    </>
  );
};

export default Main;
