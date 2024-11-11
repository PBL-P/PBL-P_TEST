import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import { useNavigate } from 'react-router-dom';
import AnnouncementDataService from "../../services/announcement.service";

const Announcement = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);

    // 데이터를 가져오는 함수
    const retrieveAnnouncements = () => {
        AnnouncementDataService.getAll()
            .then(response => {
                setAnnouncements(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveAnnouncements();
    }, []);
    
    // 공지사항 삭제 함수
    const deleteAnnouncement = (id) => {
        AnnouncementDataService.delete(id)
            .then(response => {
                console.log(response.data);
                setAnnouncements(announcements.filter(announcement => announcement.id !== id));
            })
            .catch(e => {
                console.log(e);
            });
    };

    // 등록 버튼 클릭 시 실행될 함수
    const handleRegisterClick = () => {
        navigate("/announcement/register");
    };

    // 리스트 항목 클릭 시 상세 페이지로 이동
    const handleAnnouncementClick = (id) => {
        navigate(`/announcement/${id}`);
    };

    // 수정 버튼 클릭 시 실행될 함수
    const handleEditClick = (id) => {
        navigate(`/announcement/register/${id}`);
    };

    return (
        <>
            <Title title="공지사항 - 작성 방법 및 예시"/>

            <>
                <div style={{display: "flex", justifyContent: "space-between", alignItems:"center", padding:"8px 24px", borderBottom:"1px solid rgba(0,0,0,0.1)"}}>
                    <div>

                    </div>
                    <div>
                        <input type="text" placeholder="Search..."/>
                        <button>검색!</button>
                    </div>
                </div>

                <div style={{padding: "4px 24px"}}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">내용</th>
                                <th scope="col">작성자</th>
                                <th scope="col">작성날짜</th>
                                <th scope="col">수정날짜</th>
                                <th scope="col">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement, index) => (                                                             
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td
                                        style={{ cursor: 'pointer', color: '#007bff' }}
                                        onClick={() => handleAnnouncementClick(announcement.id)}
                                    >
                                        {announcement.title}
                                    </td>
                                    <td>{announcement.content}</td>                                    
                                    <td>{announcement.createdBy}</td>
                                    <td>{new Date(announcement.createdAt).toLocaleDateString('ko-KR')}</td>
                                    <td>{new Date(announcement.updatedAt).toLocaleDateString('ko-KR')}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEditClick(announcement.id)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ marginLeft: '4px' }}
                                            onClick={() => deleteAnnouncement(announcement.id)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{textAlign:"right"}}>
                        <button onClick={handleRegisterClick}>등록하기</button>
                    </div>
                </div>
            </>
        </>
    );
}

export default Announcement;
