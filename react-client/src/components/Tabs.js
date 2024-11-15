import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { tabs, mainTabs } from './data/menuData';


const TabContainer = styled.div`
  margin: 0px 24px;
  display: flex;
  height: 81px;
  padding-bottom: 24px;
  /* border-bottom: 1px solid #e0e0e0; */
  background-color: #ffffff;
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


const Tabs = ({ kind = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // kind가 'main'이면 mainTabs를, 아니면 일반 tabs를 가져옴
  const getTabs = kind === 'main' ? mainTabs : tabs;
  
  // 첫 번째 경로 부분까지만 포함하도록 basePath 설정
  const basePath = `/${location.pathname.split('/')[1]}`;

  // 현재 URL 경로를 기반으로 activeTab을 설정
  const [activeTab, setActiveTab] = useState(
    getTabs.find(tab => tab.route === location.pathname.split('/').pop())?.name || getTabs[0].name
  );

  useEffect(() => {
    // URL이 변경될 때마다 activeTab을 업데이트
    const currentRoute = location.pathname.split('/').pop();
    const newActiveTab = getTabs.find(tab => tab.route === currentRoute)?.name || getTabs[0].name;
    setActiveTab(newActiveTab);
  }, [location.pathname, getTabs]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    if (tab.route) {
      navigate(`${basePath}/${tab.route}`, { replace: false });
    }
  };

  return (
    <TabContainer>
      {getTabs.map((tab) => (
        <TabItem
          key={tab.name}
          active={activeTab === tab.name}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
        </TabItem>
      ))}
    </TabContainer>
  );
};

export default Tabs;
