import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import ProposalDataService from "../../services/proposal.service";
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

const Proposal = () => {
  const [instructionProposals, setInstructionProposals] = useState([]);
  const [submissionProposals, setSubmissionProposals] = useState([]);
  const [exampleProposals, setExampleProposals] = useState([]);
  const [instructionSearchQuery, setInstructionSearchQuery] = useState('');
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState('');
  const [exampleSearchQuery, setExampleSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchInstructionProposals = () => {
    ProposalDataService.getAll()
      .then(response => setInstructionProposals(response.data))
      .catch(e => console.error(e));
  };

  const fetchSubmissionProposals = () => {
    ProposalDataService.s_getAll()
      .then(response => setSubmissionProposals(response.data))
      .catch(e => console.error(e));
  };

  const fetchExampleProposals = () => {
    ProposalDataService.e_getAll()
      .then(response => setExampleProposals(response.data))
      .catch(e => console.error(e));
  };

  useEffect(() => {
    fetchInstructionProposals();
    fetchSubmissionProposals();
    fetchExampleProposals();
  }, []);

  const filteredInstructionProposals = instructionProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(instructionSearchQuery.toLowerCase())
  );

  const filteredSubmissionProposals = submissionProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  const filteredExampleProposals = exampleProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(exampleSearchQuery.toLowerCase())
  );

  const handleInstructionClick = (id) => navigate(`/proposal/${id}`);
  const handleSubmissionClick = (id) => navigate(`/proposal/submit/${id}`);
  const handleExampleClick = (id) => navigate(`/proposal/example/${id}`);
  const handleRegisterClick = () => {
    navigate("/proposal/submit/register");
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

              <span>총: {filteredInstructionProposals.length}개</span>
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
                onClick={() => navigate("/proposal/register")}
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
              {filteredInstructionProposals.map((proposal, index) => (
                <tr key={index} onClick={() => handleInstructionClick(proposal.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{proposal.title}</td>
                  <td>{new Date(proposal.created_at).toLocaleDateString('ko-KR')}</td>
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

              <span>총: {filteredSubmissionProposals.length}개</span>
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
              {filteredSubmissionProposals.map((proposal, index) => (
                <tr key={index} onClick={() => handleSubmissionClick(proposal.id)}>
                  <td>{index + 1}</td>
                  <td>{proposal.title}</td>
                  <td>{proposal.teamName}</td>
                  <td>{proposal.member}</td>
                  <td>{new Date(proposal.createdAt).toLocaleDateString('ko-KR')}</td>
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

              <span>총: {filteredExampleProposals.length}개</span>
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
                onClick={() => navigate("/proposal/example/register")}
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
              {filteredExampleProposals.map((proposal, index) => (
                <tr key={index} onClick={() => handleExampleClick(proposal.id)}>
                  <td>{index + 1}</td>
                  <td style={{ color: "#009EFF" }}>{proposal.title}</td>
                  <td>{new Date(proposal.created_at).toLocaleDateString('ko-KR')}</td>
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

export default Proposal;
