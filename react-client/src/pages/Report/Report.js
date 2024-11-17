import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from "../../components/Title";
import ReportDataService from "../../services/report.service";
import { useNavigate } from 'react-router-dom';

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

const Report = () => {
  const [instructionReports, setInstructionReports] = useState([]);
  const [submissionReports, setSubmissionReports] = useState([]);
  const [instructionSearchQuery, setInstructionSearchQuery] = useState('');
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchInstructionReports = () => {
    ReportDataService.getAll()
      .then(response => {
        setInstructionReports(response.data);
      })
      .catch(e => console.error(e));
  };

  const fetchSubmissionReports = () => {
    ReportDataService.s_getAll()
      .then(response => {
        setSubmissionReports(response.data);
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    fetchInstructionReports();
    fetchSubmissionReports();
  }, []);

  const handleInstructionSearch = (e) => {
    setInstructionSearchQuery(e.target.value);
  };

  const handleSubmissionSearch = (e) => {
    setSubmissionSearchQuery(e.target.value);
  };

  const filteredInstructionReports = instructionReports.filter((report) =>
    report.title.toLowerCase().includes(instructionSearchQuery.toLowerCase())
  );

  const filteredSubmissionReports = submissionReports.filter((report) =>
    report.title.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  const handleInstructionClick = (id) => {
    navigate(`/report/${id}`);
  };

  const handleSubmissionClick = (id) => {
    navigate(`/report/submit/${id}`);
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
              <span>총: {filteredInstructionReports.length}개</span>
              <SearchContainer>
                <SearchIcon className="fa fa-search" />
                <StyledSearchInput
                    type="text"
                    placeholder="검색"
                    value={instructionSearchQuery}
                    onChange={handleInstructionSearch}
                />
              </SearchContainer>
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
                {filteredInstructionReports.map((report, index) => (
                  <tr key={index} onClick={() => handleInstructionClick(report.id)}>
                    <td>{index + 1}</td>
                    <td style={{ color: "#009EFF" }}>{report.title}</td>
                    <td>{new Date(report.created_at).toLocaleDateString('ko-KR')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {/* 제출 데이터 테이블 */}
          <TableWrapper>
            <TableHeader>
              <span>총: {filteredSubmissionReports.length}개</span>
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
          </TableWrapper>
        </TablesContainer>
      </PageContainer>
    </>
  );
};

export default Report;
