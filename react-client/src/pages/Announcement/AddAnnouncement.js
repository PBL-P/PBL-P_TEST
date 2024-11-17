import React, { useState, useEffect } from "react";
import AnnouncementDataService from "../../services/announcement.service";
import Title from "../../components/Title";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  margin: 89px auto;
  border-radius: 8px;
  max-width: 600px;
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 0 20px;
`;

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 15px;

  label {
    width: 100px;
    margin-top: 2px;
    margin-right: 10px;
    font-weight: bold;
  }

  input[type="text"],
  textarea,
  input[type="file"] {
    flex: 1; /* 남은 공간을 차지 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
    height: 200px;
  }
`;

const FormFile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  label {
    width: 100px;
    margin-right: 10px;
    font-weight: bold;
  }
`;

const SuccessMessage = styled.h4`
  color: #155724;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  display: flex;
  padding: 10px 15px;
  margin-top: 10px;
  color: white;
  background-color: ${(props) =>
    props.variant === "success" ? "#28a745" : "#007bff"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.variant === "success" ? "#218838" : "#0056b3"};
  }
`;
const AddAnnouncement = ({ text, kind }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null); // 기존 파일 정보 저장
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // 목록으로 리다이렉트할 URL 설정
  const getRedirectPath = () => {
    return "/announcement";
  };

  // 데이터 가져오기
  useEffect(() => {
    if (id) {
      AnnouncementDataService.get(id)
        .then((response) => {
          const data = response.data;
          setTitle(data.title);
          setContent(data.content || "");
          setCreatedBy(data.createdBy || "");
          setExistingFile(data.file_name || null); // 기존 파일 이름 저장
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const saveAnnouncement = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("createdBy", createdBy);
    // 파일 추가
    if (file) {
      formData.append("file", file);
    } else if (existingFile) {
      formData.append("file_name", existingFile);
    }
    // 저장 함수 선택
    const saveFunction = id
      ? AnnouncementDataService.update
      : AnnouncementDataService.create;

    // 요청 보내기
    const request = id ? saveFunction(id, formData) : saveFunction(formData);

    request
      .then((response) => {
        setSubmitted(true);
        console.log("Response:", response.data);
      })
      .catch((e) => {
        console.error("Error:", e.response ? e.response.data : e.message);
      });
  };

  const newAnnouncement = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={getRedirectPath()} />; // 목록으로 리다이렉트할 경로를 설정
  }

  return (
    <>
      <Title kind="form" />
      <FormHeader>공지사항 등록</FormHeader>
      <Divider />
      <FormContainer>
        {submitted ? (
          <div>
            <SuccessMessage>정상적으로 제출되었습니다!</SuccessMessage>
            <ButtonWrapper>
              <Button variant="success" onClick={newAnnouncement}>
                목록으로
              </Button>
            </ButtonWrapper>
          </div>
        ) : (
          <>
            <FormGroup>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="createdBy">작성자</label>
              <input
                type="text"
                id="createdBy"
                required
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                name="createdBy"
              />
            </FormGroup>

            <FormFile>
              <label htmlFor="file">파일 첨부</label>
              {existingFile && <p>현재 파일: {existingFile}</p>}
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
              />
            </FormFile>

            <ButtonWrapper>
              <Button variant="success" onClick={saveAnnouncement}>
                {id ? "수정하기" : "등록하기"}
              </Button>
            </ButtonWrapper>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default AddAnnouncement;
