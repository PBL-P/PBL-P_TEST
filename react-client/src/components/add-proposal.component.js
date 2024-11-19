import React, { useState, useEffect } from "react";
import ProposalDataService from "../services/proposal.service";
import Title from "./Title";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

// Styled-components 정의
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
    flex: 1;
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

const AddProposal = ({ text, kind }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [teamName, setTeamName] = useState("");
  const [member, setMember] = useState("");
  const [thought, setThought] = useState("");
  const [presentationFile, setPresentationFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [demoVideo, setDemoVideo] = useState(null); // 시연 동영상
  const [sourceFile, setSourceFile] = useState(null); // 소스 프로그램 파일
  const [reportFile, setReportFile] = useState(null); // 결과 보고서 파일
  const [existingFiles, setExistingFiles] = useState({
    fileName: null,
    filePath: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const getDocumentKey = () => {
    if (location.pathname.includes("proposal")) return "pro";
    if (location.pathname.includes("plan")) return "pl";
    if (location.pathname.includes("design")) return "des";
    if (location.pathname.includes("report")) return "rep";
    return null;
  };

  const getRedirectPath = () => {
    const key = getDocumentKey();
    if (key === "pro") return "/proposal";
    if (key === "pl") return "/plan";
    if (key === "des") return "/design";
    if (key === "rep") return "/report";
    return "/";
  };

  useEffect(() => {
    if (id) {
      const fetchData =
        kind === "instruction"
          ? ProposalDataService.get
          : kind === "example"
          ? ProposalDataService.e_get
          : ProposalDataService.s_get;

      fetchData(id)
        .then((response) => {
          const data = response.data;
          setTitle(data.title);
          setContent(data.content || "");
          setTeamName(data.teamName || "");
          setMember(data.member || "");
          setThought(data.thought || "");

          const fileNames = data.file_name ? data.file_name.split("|") : [];
          const filePaths = data.file_path ? data.file_path.split("|") : [];
          setExistingFiles({
            fileName: fileNames,
            filePath: filePaths,
          });
        })
        .catch((e) => console.log(e));
    }
  }, [id, kind]);

  const saveProposal = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("document_type_id", getDocumentKey());

    if (kind === "instruction" || kind === "example") {
      formData.append("content", content);

      if (presentationFile) {
        formData.append("file", presentationFile); // 'file' 키로 전송
      }
    } else if (kind === "version" || kind === "report") {
      formData.append("teamName", teamName);
      formData.append("member", member);
      formData.append("thought", thought);

      if (presentationFile) formData.append("files", presentationFile);
      if (videoFile) formData.append("files", videoFile);
      if (demoVideo) formData.append("files", demoVideo);
      if (sourceFile) formData.append("files", sourceFile);
      if (reportFile) formData.append("files", reportFile);
    }

    const saveFunction =
      kind === "instruction"
        ? id
          ? ProposalDataService.update
          : ProposalDataService.create
        : kind === "example"
        ? id
          ? ProposalDataService.e_update
          : ProposalDataService.e_create
        : id
        ? ProposalDataService.s_update
        : ProposalDataService.s_create;

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

  const newProposal = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={getRedirectPath()} />;
  }

  return (
    <>
      <Title kind="form" />
      {kind === "instruction" && <FormHeader>양식 자료 등록</FormHeader>}
      {kind === "example" && <FormHeader>샘플 자료 등록</FormHeader>}
      {(kind === "version" || kind === "report") && (
        <FormHeader>과제 제출</FormHeader>
      )}
      <Divider />
      <FormContainer>
        {submitted ? (
          <div>
            <SuccessMessage>정상적으로 제출되었습니다!</SuccessMessage>
            <Button variant="primary" onClick={newProposal}>
              목록으로
            </Button>
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
                placeholder="최대 20자 입력"
                maxLength="20"
              />
            </FormGroup>
            {(kind === "instruction" || kind === "example") && (
              <>
                <FormGroup>
                  <label htmlFor="content">내용</label>
                  <textarea
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    placeholder="최대 500자 입력"
                    maxLength="500"
                  />
                </FormGroup>
                <FormFile>
                  <label htmlFor="presentationFile">파일 첨부</label>
                  <input
                    type="file"
                    id="presentationFile"
                    onChange={(e) => setPresentationFile(e.target.files[0])}
                    name="presentationFile"
                  />
                </FormFile>
              </>
            )}
            {(kind === "version" || kind === "report") && (
              <>
                <FormGroup>
                  <label htmlFor="teamName">팀명</label>
                  <input
                    type="text"
                    id="teamName"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    name="teamName"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="member">팀원</label>
                  <input
                    type="text"
                    id="member"
                    required
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    name="member"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="thought">소감문</label>
                  <textarea
                    id="thought"
                    required
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    name="thought"
                    placeholder="최대 500자 입력"
                    maxLength="500"
                  />
                </FormGroup>
                <FormFile>
                  <label htmlFor="presentationFile">발표 자료</label>
                  <input
                    type="file"
                    id="presentationFile"
                    onChange={(e) => setPresentationFile(e.target.files[0])}
                    name="presentationFile"
                  />
                </FormFile>
                <FormFile>
                  <label htmlFor="videoFile">
                    발표 동영상 <br />
                    (선택사항)
                  </label>
                  <input
                    type="file"
                    id="videoFile"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    name="videoFile"
                  />
                </FormFile>
              </>
            )}
            {kind === "report" && (
              <>
                <FormFile>
                  <label htmlFor="demoVideo">시연 동영상</label>
                  <input
                    type="file"
                    id="demoVideo"
                    onChange={(e) => setDemoVideo(e.target.files[0])}
                    name="demoVideo"
                  />
                </FormFile>
                <FormFile>
                  <label htmlFor="sourceFile">소스 프로그램</label>
                  <input
                    type="file"
                    id="sourceFile"
                    onChange={(e) => setSourceFile(e.target.files[0])}
                    name="sourceFile"
                  />
                </FormFile>
                <FormFile>
                  <label htmlFor="reportFile">결과 보고서</label>
                  <input
                    type="file"
                    id="reportFile"
                    onChange={(e) => setReportFile(e.target.files[0])}
                    name="reportFile"
                  />
                </FormFile>
              </>
            )}
            <ButtonWrapper>
              <Button variant="success" onClick={saveProposal}>
                {id ? "수정하기" : "등록하기"}
              </Button>
            </ButtonWrapper>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default AddProposal;
