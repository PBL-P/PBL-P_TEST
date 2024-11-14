import React, { useState, useEffect } from "react";
import ProposalDataService from "../services/proposal.service";
import Title from "./Title";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

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
  const [existingFiles, setExistingFiles] = useState({ fileName: null, filePath: null });
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
      const fetchData = kind === "sample" ? ProposalDataService.get : ProposalDataService.s_get;
      fetchData(id)
        .then(response => {
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
            filePath: filePaths
          });
        })
        .catch(e => console.log(e));
    }
  }, [id, kind]);

  const saveProposal = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("document_type_id", getDocumentKey());
  
    if (kind === "sample") {
      formData.append("content", content);
    } else if (kind === "version" || kind === "report") {
      formData.append("teamName", teamName);
      formData.append("member", member);
      formData.append("thought", thought);
    }
  
    // 고정된 순서로 파일명을 배열에 배치: 발표자료, 발표 동영상, 시연 동영상, 소스 프로그램, 결과 보고서
    const fileNames = ["", "", "", "", ""];
    const filePaths = ["", "", "", "", ""];
  
    // 각 파일을 해당 인덱스에 배치합니다.
    if (presentationFile) {
      formData.append("presentationFile", presentationFile);
      fileNames[0] = presentationFile.name;
      filePaths[0] = "uploads/" + presentationFile.name;
    }
    if (videoFile) {
      formData.append("videoFile", videoFile);
      fileNames[1] = videoFile.name;
      filePaths[1] = "uploads/" + videoFile.name;
    }
    if (demoVideo) {
      formData.append("demoVideo", demoVideo);
      fileNames[2] = demoVideo.name;
      filePaths[2] = "uploads/" + demoVideo.name;
    }
    if (sourceFile) {
      formData.append("sourceFile", sourceFile);
      fileNames[3] = sourceFile.name;
      filePaths[3] = "uploads/" + sourceFile.name;
    }
    if (reportFile) {
      formData.append("reportFile", reportFile);
      fileNames[4] = reportFile.name;
      filePaths[4] = "uploads/" + reportFile.name;
    }
  
    // 구분자로 연결한 파일명 및 경로 추가
    formData.append("file_name", fileNames.join("|"));
    formData.append("file_path", filePaths.join("|"));
  
    // formData 내용을 console.log로 출력
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    const saveFunction = kind === "sample"
      ? (id ? ProposalDataService.update : ProposalDataService.create)
      : (id ? ProposalDataService.s_update : ProposalDataService.s_create);
  
    const request = id ? saveFunction(id, formData) : saveFunction(formData);
  
    request
      .then(response => {
        setSubmitted(true);
        console.log("Response:", response.data);
      })
      .catch(e => {
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
              <>
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
              <div className="form-group">
                <label htmlFor="presentationFile">첨부 자료</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="presentationFile"
                  onChange={(e) => setPresentationFile(e.target.files[0])}
                  name="presentationFile"
                />
              </div>
              </>
            )}

            {(kind === "version" || kind === "report") && (
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
                <div className="form-group">
                  <label htmlFor="presentationFile">발표 자료</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="presentationFile"
                    onChange={(e) => setPresentationFile(e.target.files[0])}
                    name="presentationFile"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoFile">발표 동영상 (선택사항)</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="videoFile"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    name="videoFile"
                  />
                </div>
              </>
            )}

            {kind === "report" && (
              <>                
                <div className="form-group">
                  <label htmlFor="demoVideo">시연 동영상</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="demoVideo"
                    onChange={(e) => setDemoVideo(e.target.files[0])}
                    name="demoVideo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sourceFile">소스 프로그램</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="sourceFile"
                    onChange={(e) => setSourceFile(e.target.files[0])}
                    name="sourceFile"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reportFile">결과 보고서</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="reportFile"
                    onChange={(e) => setReportFile(e.target.files[0])}
                    name="reportFile"
                  />
                </div>
              </>
            )}



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
