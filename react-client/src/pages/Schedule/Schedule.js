import React, { useState } from 'react';
import styled from 'styled-components';
import { Timeline, TimelineHeaders, DateHeader, SidebarHeader } from 'react-calendar-timeline';
import Title from "../../components/Title";

// 스타일 컴포넌트
const ScheduleWrapper = styled.div`
  margin: 50px auto;
  max-width: 1800px; // 너비를 1800px로 확장
  padding: 0 20px;
  .rct-header-root {
    background-color: #f7f7f7;
    border-bottom: 2px solid #ddd;
    font-weight: bold;
    color: #333;
  }

  .rct-horizontal-lines {
    stroke: #e0e0e0;
  }

  .rct-items {
    background-color: #fafafa;    
  }

  .rct-sidebar {
    background-color: #f4f4f4;
    border-right: 2px solid #ddd;
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }

  .rct-item {
    transition: transform 0.2s ease-in-out;
    padding: 0px;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const sidebarStyle = {
  color: '#fff',
  padding: '10px',
  fontWeight: 'bold',
  fontSize: '18px',
  textAlign: 'center',
  width: '150px',
};

const DateHeaderStyled = styled(DateHeader)`
  background-color: #6A0DAD;
  color: #000;
  text-align: center;
  font-size: 16px;
  padding: 0px;
`;

const Schedule = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: '제안서', start_time: new Date(2024, 8, 1), end_time: new Date(2024, 9, 10), progress: 75 },
    { id: 2, title: '기획서', start_time: new Date(2024, 9, 10), end_time: new Date(2024, 10, 1), progress: 50 },
    { id: 3, title: '설계서', start_time: new Date(2024, 10, 1), end_time: new Date(2024, 10, 20), progress: 30 },
    { id: 4, title: '결과 보고서', start_time: new Date(2024, 10, 20), end_time: new Date(2024, 11, 30), progress: 90 },
  ]);

  const groups = tasks.map((task) => ({ id: task.id, title: task.title }));
  const items = tasks.map((task) => ({
    id: task.id,
    group: task.id,
    title: `${task.title} (${task.progress}%)`,
    start_time: task.start_time,
    end_time: task.end_time,
    itemProps: {
      style: {
        backgroundColor: task.progress > 80 ? '#6A0DAD' : '#68A0D8',
        color: '#fff',
        borderRadius: '10px',
        padding: '0px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
        fontSize: '14px',
      },
    },
  }));

  return (
    <>
      <Title kind="form" />
      <h1 style={{textAlign:"center"}}>일정 관리</h1>
      <ScheduleWrapper>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={new Date(2024, 8, 1)}
          defaultTimeEnd={new Date(2024, 12, 1)}
          lineHeight={80}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => (
                <div {...getRootProps()} style={sidebarStyle}>
                </div>
              )}
            </SidebarHeader>
            <DateHeaderStyled unit="month" />
            {/* <DateHeaderStyled unit="day" /> */}
          </TimelineHeaders>
        </Timeline>
      </ScheduleWrapper>
    </>
  );
};

export default Schedule;
