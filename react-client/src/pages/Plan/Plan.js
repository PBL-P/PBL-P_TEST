import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import PlanDataService from "../../services/plan.service";
import { useNavigate } from 'react-router-dom';

const StickyButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #009EFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #007acc;
  }
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 좌우 반반 */
  grid-template-rows: 1fr 1fr; /* 위아래 반반 */
  grid-template-areas:
    "instruction submission"
    "example submission";
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 80px); /* 전체 화면 높이에서 여백 제외 */
  background-color: #ffffff;
`;

const SectionWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  padding-top: 6px;
`;

const SectionHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff; /* 배경색 설정 */
  z-index: 10;
  padding: 10px 0;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    height: 60px;
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  tr:not(.unset):hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  thead tr:hover {
    background-color: unset;
    cursor: default;
  }
`;

const Plan = () => {
  const [instructionPlans, setInstructionPlans] = useState([]);
  const [submissionPlans, setSubmissionPlans] = useState([]);
  const [examplePlans, setExamplePlans] = useState([]);
  const [instructionSearchQuery, setInstructionSearchQuery] = useState('');
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState('');
  const [exampleSearchQuery, setExampleSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchInstructionPlans = () => {
    PlanDataService.getAll()
      .then(response => setInstructionPlans(response.data))
      .catch(e => console.error(e));
  };

  const fetchSubmissionPlans = () => {
    PlanDataService.s_getAll()
      .then(response => setSubmissionPlans(response.data))
      .catch(e => console.error(e));
  };

  const fetchExamplePlans = () => {
    PlanDataService.e_getAll()
      .then(response => setExamplePlans(response.data))
      .catch(e => console.error(e));
  };

  useEffect(() => {
    fetchInstructionPlans();
    fetchSubmissionPlans();
    fetchExamplePlans();
  }, []);

  const filteredInstructionPlans = instructionPlans.filter((plan) =>
    plan.title.toLowerCase().includes(instructionSearchQuery.toLowerCase())
  );

  const filteredSubmissionPlans = submissionPlans.filter((plan) =>
    plan.title.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  const filteredExamplePlans = examplePlans.filter((plan) =>
    plan.title.toLowerCase().includes(exampleSearchQuery.toLowerCase())
  );

  const handleInstructionClick = (id) => navigate(`/plan/${id}`);
  const handleSubmissionClick = (id) => navigate(`/plan/submit/${id}`);
  const handleExampleClick = (id) => navigate(`/plan/example/${id}`);
  const handleRegisterClick = () => {
    navigate("/plan/submit/register");
  };
  return (
    <>
      <Title kind="form" />
      <PageContainer>
        {/* 양식 */}
        <SectionWrapper style={{ gridArea: "instruction" }}>
          <SectionHeader>
            <h3>작성 양식</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>

              <span>총: {filteredInstructionPlans.length}개</span>
              <SearchContainer>
                <i className="fa fa-search" style={{ color: "#888", fontSize: "16px" }} />
                <StyledSearchInput
                  type="text"
                  placeholder="검색"
                  value={instructionSearchQuery}
                  onChange={(e) => setInstructionSearchQuery(e.target.value)}
                />
              </SearchContainer>
              <button
                onClick={() => navigate("/plan/register")}
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
              {filteredInstructionPlans.map((plan, index) => (
                <tr key={index} onClick={() => handleInstructionClick(plan.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{plan.title}</td>
                  <td>{new Date(plan.created_at).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SectionWrapper>

        {/* 제출 */}
        <SectionWrapper style={{ gridArea: "submission" }}>
          <SectionHeader>
          <h3>제출</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>

              <span>총: {filteredSubmissionPlans.length}개</span>
              <SearchContainer>
                <i className="fa fa-search" style={{ color: "#888", fontSize: "16px" }} />
                <StyledSearchInput
                  type="text"
                  placeholder="검색"
                  value={submissionSearchQuery}
                  onChange={(e) => setSubmissionSearchQuery(e.target.value)}
                />
              </SearchContainer>
              </div>
          </SectionHeader>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>팀명</th>
                <th>팀원</th>
                <th>작성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissionPlans.map((plan, index) => (
                <tr key={index} onClick={() => handleSubmissionClick(plan.id)}>
                  <td>{index + 1}</td>
                  <td>{plan.title}</td>
                  <td>{plan.teamName}</td>
                  <td>{plan.member}</td>
                  <td>{new Date(plan.createdAt).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SectionWrapper>

        {/* 예시 */}
        <SectionWrapper style={{ gridArea: "example" }}>
          <SectionHeader>
            <h3>샘플 자료</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>

              <span>총: {filteredExamplePlans.length}개</span>
              <SearchContainer>
                <i className="fa fa-search" style={{ color: "#888", fontSize: "16px" }} />
                <StyledSearchInput
                  type="text"
                  placeholder="검색"
                  value={exampleSearchQuery}
                  onChange={(e) => setExampleSearchQuery(e.target.value)}
                />
              </SearchContainer>
              <button
                onClick={() => navigate("/plan/example/register")}
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
              {filteredExamplePlans.map((plan, index) => (
                <tr key={index} onClick={() => handleExampleClick(plan.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{plan.title}</td>
                  <td>{new Date(plan.created_at).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SectionWrapper>
        <StickyButton onClick={handleRegisterClick}>제출하기</StickyButton>
      </PageContainer>
    </>
  );
};

export default Plan;
