import React, { useState, useEffect } from "react";
import AnnouncementDataService from "../../services/announcement.service";
import Title from "../../components/Title";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AddAnnouncement = ({ text, kind }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");
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
        .then(response => {
          const data = response.data;
          setTitle(data.title);
          setContent(data.content || "");
          setCreatedBy(data.createdBy || "");
        })
        .catch(e => console.log(e));
    }
  }, [id]);

  const saveAnnouncement = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("CreatedBy:", createdBy);

    const formData = new FormData();
    formData.append('title', title);  
    formData.append('content', content);
    formData.append('createdBy', createdBy);

    // FormData의 내용을 확인
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // 저장 함수 선택
    const saveFunction = id ? AnnouncementDataService.update : AnnouncementDataService.create;

    // 요청 보내기
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

  const newAnnouncement = () => {
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
            <h4>공지사항 정상적으로 제출되었습니다!</h4>
            <button className="btn btn-success" onClick={newAnnouncement}>
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
              <label htmlFor="createdBy">작성자</label>
              <input
                type="text"
                className="form-control"
                id="createdBy"
                required
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                name="createdBy"
              />
            </div>
            <button onClick={saveAnnouncement} className="btn btn-success">
              {id ? "수정하기" : "등록하기"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddAnnouncement;