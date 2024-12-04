import React, { useState } from 'react';
import styled from 'styled-components';
import { Timeline, TimelineHeaders, DateHeader, SidebarHeader } from 'react-calendar-timeline';
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

// 스타일 컴포넌트
const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 20px;
  padding: 20px;
  max-width: calc(100vw - 260px);
`;

const ScheduleWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const SectionWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: #f7f7f7;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  background: none;
  margin-left: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
`;

const Schedule = () => {
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([
    { id: 1, title: '제안서', start_time: new Date(2024, 8, 1), end_time: new Date(2024, 9, 10), progress: 75 },
    { id: 2, title: '기획서', start_time: new Date(2024, 9, 10), end_time: new Date(2024, 10, 1), progress: 50 },
    { id: 3, title: '설계서', start_time: new Date(2024, 10, 1), end_time: new Date(2024, 10, 20), progress: 30 },
    { id: 4, title: '결과 보고서', start_time: new Date(2024, 10, 20), end_time: new Date(2024, 11, 30), progress: 90 },
  ]);

  const [exampleSchedules, setExampleSchedules] = useState([
    { id: 1, title: '예시 일정 1', created_at: '2024-10-01' },
    { id: 2, title: '예시 일정 2', created_at: '2024-10-05' },
    { id: 3, title: '예시 일정 3', created_at: '2024-10-10' },
  ]);

  const [exampleSearchQuery, setExampleSearchQuery] = useState('');
  const filteredExampleSchedules = exampleSchedules.filter(schedule =>
    schedule.title.toLowerCase().includes(exampleSearchQuery.toLowerCase())
  );

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
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
      },
    },
  }));

  const handleExampleClick = (id) => {
    console.log('Example clicked:', id);
  };

  return (
    <>
      <Title kind="form" />
      <PageContainer>
        {/* 왼쪽: 내 일정 관리 */}
        <ScheduleWrapper>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>내 일정 관리</h3>
            <button
              onClick={() => navigate("/schedule/register")}
              style={{
                backgroundColor: "#009EFF",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <i className="fa fa-plus" style={{ fontSize: "16px" }} />
            </button>
          </div>
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
                  <div {...getRootProps()} style={{ color: '#fff', textAlign: 'center', padding: '10px', fontSize: '18px' }}>
                    그룹
                  </div>
                )}
              </SidebarHeader>
              <DateHeader unit="month" />
            </TimelineHeaders>
          </Timeline>
        </ScheduleWrapper>

        {/* 오른쪽: 남들이 제출한 일정 관리 */}
        <SectionWrapper>
          <SectionHeader>
            <h3>남들이 제출한 일정 관리</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
              <span>총: {filteredExampleSchedules.length}개</span>
              <SearchContainer>
                <i className="fa fa-search" style={{ color: "#888", fontSize: "16px" }} />
                <StyledSearchInput
                  type="text"
                  placeholder="검색"
                  value={exampleSearchQuery}
                  onChange={(e) => setExampleSearchQuery(e.target.value)}
                />
              </SearchContainer>              
            </div>
          </SectionHeader>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {filteredExampleSchedules.map((schedule, index) => (
                <tr key={index} onClick={() => handleExampleClick(schedule.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{schedule.title}</td>
                  <td>{new Date(schedule.created_at).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SectionWrapper>
      </PageContainer>
    </>
  );
};

export default Schedule;
