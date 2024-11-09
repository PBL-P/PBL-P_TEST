import React, { useState, useEffect } from "react";
import ProposalDataService from "../services/proposal.service";
import Title from "./Title";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AddProposal = ({ text, kind }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [teamName, setTeamName] = useState("");
  const [member, setMember] = useState("");
  const [thought, setThought] = useState("");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null); // 기존 파일 정보 저장
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // document_key 설정
  const getDocumentKey = () => {
    if (location.pathname.includes("proposal")) return "pro";
    if (location.pathname.includes("plan")) return "pl";
    if (location.pathname.includes("design")) return "des";
    if (location.pathname.includes("report")) return "rep";
    return null; // 매칭되는 key가 없는 경우
  };

  // 목록으로 리다이렉트할 URL 설정
  const getRedirectPath = () => {
    const key = getDocumentKey();
    if (key === "pro") return "/proposal";
    if (key === "pl") return "/plan";
    if (key === "des") return "/design";
    if (key === "rep") return "/report";
    return "/";
  };

  // 데이터 가져오기
  useEffect(() => {    
    if (id) {              
      const fetchData = kind === "sample" ? ProposalDataService.get : ProposalDataService.s_get;
      fetchData(id)
        .then(response => {
          const data = response.data;
          setTitle(data.title);
          setContent(data.content || "");
          setTeamName(data.teamName || "");
          setMember(data.member || "");
          setThought(data.thought || "");
          setExistingFile(data.file_name || null); // 기존 파일 이름 저장
        })
        .catch(e => console.log(e));
    }
  }, [id, kind]);

  const saveProposal = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('document_type_id', getDocumentKey()); // document_type_id 설정
  
    if (kind === "sample") {
      formData.append('content', content); // 샘플의 경우 내용 추가
    } else if (kind === "version") {
      formData.append('teamName', teamName); // 버전의 경우 팀 정보 추가
      formData.append('member', member);
      formData.append('thought', thought);
    }
  
    // 파일 추가
    if (file) {
      formData.append('file', file);
    } else if (existingFile) {
      formData.append('file_name', existingFile);
    }
  
    // 저장 함수 선택
    const saveFunction = (kind === "sample")
      ? (id ? ProposalDataService.update : ProposalDataService.create)
      : (id ? ProposalDataService.s_update : ProposalDataService.s_create);
  
    // 요청 보내기
    const request = id ? saveFunction(id, formData) : saveFunction(formData);
  
    request
      .then(response => {
        setSubmitted(true);
        console.log("Response:", response.data);
      })
      .catch(e => {
        console.error("Error:", e.response ? e.response.data : e.message); // 오류 로깅
      });
  };
  
  
  const newProposal = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={getRedirectPath()} />; // 목록으로 리다이렉트할 경로를 설정
  }

  return (
    <>
      <Title title={text} />
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>정상적으로 제출되었습니다!</h4>
            <button className="btn btn-success" onClick={newProposal}>
              목록으로
            </button>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
              />
            </div>

            {kind === "sample" && (
              <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                  className="form-control"
                  id="content"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  name="content"
                />
              </div>
            )}

            {kind === "version" && (
              <>
                <div className="form-group">
                  <label htmlFor="teamName">팀명</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    name="teamName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="member">팀원</label>
                  <input
                    type="text"
                    className="form-control"
                    id="member"
                    required
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    name="member"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="thought">소감문</label>
                  <textarea
                    className="form-control"
                    id="thought"
                    required
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    name="thought"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="file">파일 첨부</label>
              {existingFile && (
                <p>현재 파일: {existingFile}</p> // 기존 파일 이름 표시
              )}
              <input
                type="file"
                className="form-control-file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
              />
            </div>
            <button onClick={saveProposal} className="btn btn-success">
              {id ? "수정하기" : "등록하기"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddProposal;
