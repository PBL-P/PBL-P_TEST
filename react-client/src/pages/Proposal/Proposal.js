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
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  max-height: 100vh;
  overflow: hidden; /* 페이지 전체에서 스크롤 금지 */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;  
`;

const SectionTitle = styled.div`
  font-size: 32px;
  margin: 0px 18px;
  padding: 10px 0;
  font-weight: bold;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
`;

const TablesContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-y: auto; /* 내부에서만 스크롤 허용 */
  height: calc(100vh - 120px - 80px); /* 화면 높이에서 상단 마진 및 패딩 제외 */
`;

const TableWrapper = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto; /* 테이블 내부에서 스크롤 허용 */
  max-height: 100%; /* 높이를 제한 */
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    height: 60px;
  }

  th {
    /* Thead 스타일을 별도로 정의 가능 */
    
  }

  /* Hover 효과 */
  tr:not(.unset):hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  thead tr:hover {
    background-color: unset; /* Hover 효과 제거 */
    cursor: default; /* 기본 커서 설정 */
  }
`;


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 8px; /* 아이콘과 인풋 간격 */
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const SearchIcon = styled.i`
  color: #888;
  font-size: 16px;
`;

const Proposal = () => {
  const [instructionProposals, setInstructionProposals] = useState([]);
  const [submissionProposals, setSubmissionProposals] = useState([]);
  const [instructionSearchQuery, setInstructionSearchQuery] = useState('');
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchInstructionProposals = () => {
    ProposalDataService.getAll()
      .then(response => {
        setInstructionProposals(response.data);
      })
      .catch(e => console.error(e));
  };

  const fetchSubmissionProposals = () => {
    ProposalDataService.s_getAll()
      .then(response => {
        setSubmissionProposals(response.data);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    fetchInstructionProposals();
    fetchSubmissionProposals();
  }, []);

  const handleInstructionSearch = (e) => {
    setInstructionSearchQuery(e.target.value);
  };

  const handleSubmissionSearch = (e) => {
    setSubmissionSearchQuery(e.target.value);
  };

  const filteredInstructionProposals = instructionProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(instructionSearchQuery.toLowerCase())
  );

  const filteredSubmissionProposals = submissionProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  const handleInstructionClick = (id) => {
    navigate(`/proposal/${id}`);
  };

  const handleSubmissionClick = (id) => {
    navigate(`/proposal/submit/${id}`);
  };
  const handleRegisterClick = () => {
    navigate("/proposal/submit/register");
  };
  return (
    <>
      <Title kind="form"/>
      <PageContainer>
        <HeaderContainer>
          <SectionTitle>강의 자료</SectionTitle>
          <SectionTitle>제출</SectionTitle>
        </HeaderContainer>
        <TablesContainer>
          {/* 강의 자료 테이블 */}
          <TableWrapper>
            <TableHeader>
              <span>총: {filteredInstructionProposals.length}개</span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <SearchContainer>
                  <SearchIcon className="fa fa-search" />
                  <StyledSearchInput
                    type="text"
                    placeholder="검색"
                    value={instructionSearchQuery}
                    onChange={handleInstructionSearch}
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

            </TableHeader>
            <Table>
              <thead>
                <tr class="unset">
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
          </TableWrapper>

          {/* 제출 데이터 테이블 */}
          <TableWrapper>
            <TableHeader>
              <span>총: {filteredSubmissionProposals.length}개</span>
              <SearchContainer>
                <SearchIcon className="fa fa-search" />
                <StyledSearchInput
                    type="text"
                    placeholder="검색"
                    value={submissionSearchQuery}
                    onChange={handleSubmissionSearch}
                />
              </SearchContainer>
            </TableHeader>
            <Table>
              <thead>
                <tr class="unset">
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
          </TableWrapper>
        </TablesContainer>
        <StickyButton onClick={handleRegisterClick}>제출하기</StickyButton>
      </PageContainer>
    </>
  );
};

export default Proposal;
