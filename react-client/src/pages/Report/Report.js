import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import ReportDataService from "../../services/report.service";
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

const Report = () => {
  const [instructionReports, setInstructionReports] = useState([]);
  const [submissionReports, setSubmissionReports] = useState([]);
  const [exampleReports, setExampleReports] = useState([]);
  const [instructionSearchQuery, setInstructionSearchQuery] = useState('');
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState('');
  const [exampleSearchQuery, setExampleSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchInstructionReports = () => {
    ReportDataService.getAll()
      .then(response => setInstructionReports(response.data))
      .catch(e => console.error(e));
  };

  const fetchSubmissionReports = () => {
    ReportDataService.s_getAll()
      .then(response => setSubmissionReports(response.data))
      .catch(e => console.error(e));
  };

  const fetchExampleReports = () => {
    ReportDataService.e_getAll()
      .then(response => setExampleReports(response.data))
      .catch(e => console.error(e));
  };

  useEffect(() => {
    fetchInstructionReports();
    fetchSubmissionReports();
    fetchExampleReports();
  }, []);

  const filteredInstructionReports = instructionReports.filter((report) =>
    report.title.toLowerCase().includes(instructionSearchQuery.toLowerCase())
  );

  const filteredSubmissionReports = submissionReports.filter((report) =>
    report.title.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  const filteredExampleReports = exampleReports.filter((report) =>
    report.title.toLowerCase().includes(exampleSearchQuery.toLowerCase())
  );

  const handleInstructionClick = (id) => navigate(`/report/${id}`);
  const handleSubmissionClick = (id) => navigate(`/report/submit/${id}`);
  const handleExampleClick = (id) => navigate(`/report/example/${id}`);
  const handleRegisterClick = () => {
    navigate("/report/submit/register");
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

              <span>총: {filteredInstructionReports.length}개</span>
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
                onClick={() => navigate("/report/register")}
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
              {filteredInstructionReports.map((report, index) => (
                <tr key={index} onClick={() => handleInstructionClick(report.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{report.title}</td>
                  <td>{new Date(report.created_at).toLocaleDateString('ko-KR')}</td>
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

              <span>총: {filteredSubmissionReports.length}개</span>
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
              {filteredSubmissionReports.map((report, index) => (
                <tr key={index} onClick={() => handleSubmissionClick(report.id)}>
                  <td>{index + 1}</td>
                  <td>{report.title}</td>
                  <td>{report.teamName}</td>
                  <td>{report.member}</td>
                  <td>{new Date(report.createdAt).toLocaleDateString('ko-KR')}</td>
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

              <span>총: {filteredExampleReports.length}개</span>
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
                onClick={() => navigate("/report/example/register")}
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
              {filteredExampleReports.map((report, index) => (
                <tr key={index} onClick={() => handleExampleClick(report.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{report.title}</td>
                  <td>{new Date(report.created_at).toLocaleDateString('ko-KR')}</td>
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

export default Report;
