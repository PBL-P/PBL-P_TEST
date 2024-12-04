import React, { useState } from "react";
import styled from "styled-components";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

// Styled-components 정의
const FormContainer = styled.div`
  margin: 50px auto;
  border-radius: 8px;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Section = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 15px;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
  }

  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
`;

const DateGroup = styled.div`
  display: flex;
  gap: 10px;

  input[type="date"] {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ButtonWrapper = styled.div`
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

    &.submit {
      background-color: #218838;

      &:hover {
        background-color: #1e7e34; /* 어울리는 hover 색상 */
      }
    }

    &.cancel {
      background-color: #ddd;
      color: black;

      &:hover {
        background-color: #bbb;
      }
    }
  }
`;

const ScheduleDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    { id: 1, title: "제안서", start_time: "", end_time: "", progress: "" },
    { id: 2, title: "기획서", start_time: "", end_time: "", progress: "" },
    { id: 3, title: "설계서", start_time: "", end_time: "", progress: "" },
    { id: 4, title: "결과 보고서", start_time: "", end_time: "", progress: "" },
  ]);

  const handleInputChange = (id, field, value) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // 제출 후 추가 동작 처리
  };

  const handleCancel = () => {
    navigate("/schedule");
    // 취소 후 동작 처리
  };

  return (
    <>
    <Title kind="form" />
    <FormContainer>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>일정 등록</h2>
      <GridContainer>
        {formData.map((item) => (
          <Section key={item.id}>
            <h3>{item.title}</h3>
            <FormGroup>
              <label>날짜</label>
              <DateGroup>
                <input
                  type="date"
                  value={item.start_time}
                  onChange={(e) =>
                    handleInputChange(item.id, "start_time", e.target.value)
                  }
                  placeholder="시작 날짜"
                />
                <input
                  type="date"
                  value={item.end_time}
                  onChange={(e) =>
                    handleInputChange(item.id, "end_time", e.target.value)
                  }
                  placeholder="종료 날짜"
                />
              </DateGroup>
            </FormGroup>
            <FormGroup>
              <label>진행률 (%)</label>
              <input
                type="number"
                value={item.progress}
                onChange={(e) =>
                  handleInputChange(item.id, "progress", e.target.value)
                }
                placeholder="0 ~ 100"
                min="0"
                max="100"
              />
            </FormGroup>
          </Section>
        ))}
      </GridContainer>
      <ButtonWrapper>
        <button className="cancel" onClick={handleCancel}>
          취소
        </button>
        <button className="submit" onClick={handleSubmit}>
          등록
        </button>
      </ButtonWrapper>
    </FormContainer>
    </>

  );
};

export default ScheduleDetail;
