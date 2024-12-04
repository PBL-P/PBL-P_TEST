import React, { useState } from "react";
import styled from "styled-components";
import Title from "../../components/Title";

// Styled-components 정의
const Container = styled.div`
  padding: 20px;  
  background-color: #fff;
  border-radius: 8px;
  margin: 0 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
    color: #333;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }

  tbody tr td:last-child {
    position: relative;
  }

  tbody tr:hover td:last-child div {
    display: ${(props) => (props.isEditing ? "flex" : "none")};
  }
`;

const ActionButtons = styled.div`
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  gap: 5px;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: #0056b3;
    }
  }

  .delete {
    background-color: #dc3545;

    &:hover {
      background-color: #a71d2a;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    color: white;
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }

    &.cancel {
      background-color: #6c757d;

      &:hover {
        background-color: #5a6268;
      }
    }
  }
`;

const Requirement = () => {
  const [rows, setRows] = useState([
    {
      id: "RQ-0001",
      category: "관리자",
      description: "통계",
      details: "매출액을 기록한다.",
      status: "개발전",
      date: "2024-12-01",
      writer: "홍길동",
    },
    {
      id: "RQ-0002",
      category: "공통",
      description: "오른쪽 영역",
      details: "등급 표시를 추가한다.",
      status: "진행중",
      date: "2024-12-05",
      writer: "김철수",
    },
    {
      id: "RQ-0003",
      category: "공통",
      description: "상단 메뉴 구성",
      details: "메뉴를 재구성한다.",
      status: "개발완료",
      date: "2024-12-10",
      writer: "이영희",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddRow = (index) => {
    const newRow = {
      id: "",
      category: "",
      description: "",
      details: "",
      status: "개발전",
      date: "",
      writer: "",
    };
    const updatedRows = [...rows];
    updatedRows.splice(index + 1, 0, newRow);
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSave = () => {
    console.log("저장된 데이터:", rows);
    setIsEditing(false);
  };

  return (
    <>
    <Title kind="form" />
    <Container>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>요구분석사항</h1>
      <Table isEditing={isEditing}>
        <thead>
          <tr>
            <th>요구분석 ID</th>
            <th>화면명</th>
            <th>요구사항명</th>
            <th>요구사항 내용</th>
            <th>날짜</th>
            <th>작성자</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={row.id}
                    onChange={(e) => handleInputChange(index, "id", e.target.value)}
                  />
                ) : (
                  row.id
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={row.category}
                    onChange={(e) => handleInputChange(index, "category", e.target.value)}
                  />
                ) : (
                  row.category
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                  />
                ) : (
                  row.description
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={row.details}
                    onChange={(e) => handleInputChange(index, "details", e.target.value)}
                  />
                ) : (
                  row.details
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleInputChange(index, "date", e.target.value)}
                  />
                ) : (
                  row.date
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={row.writer}
                    onChange={(e) => handleInputChange(index, "writer", e.target.value)}
                  />
                ) : (
                  row.writer
                )}
              </td>
              <td>
                {isEditing ? (
                  <select
                    value={row.status}
                    onChange={(e) => handleInputChange(index, "status", e.target.value)}
                  >
                    <option value="개발전">개발전</option>
                    <option value="진행중">진행중</option>
                    <option value="개발완료">개발완료</option>
                  </select>
                ) : (
                  row.status
                )}
              </td>
              <td>
                {isEditing && (
                  <ActionButtons>
                    <button onClick={() => handleAddRow(index)}>추가</button>
                    <button className="delete" onClick={() => handleDeleteRow(index)}>
                      삭제
                    </button>
                  </ActionButtons>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup>
        {isEditing ? (
          <>
            <button className="cancel" onClick={toggleEditing}>
              취소
            </button>
            <button onClick={handleSave}>저장</button>
          </>
        ) : (
          <button onClick={toggleEditing}>수정</button>
        )}
      </ButtonGroup>
    </Container>
    </>
  );
};

export default Requirement;
