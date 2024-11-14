import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import { useNavigate } from 'react-router-dom';
import ReportDataService from "../../services/report.service";

const Report = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    // 데이터를 가져오는 함수
    const retrieveReports = () => {
        ReportDataService.getAll()
            .then(response => {
                setReports(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveReports();
    }, []);
    
    // 결과 보고서 삭제 함수
    const deleteReport = (id) => {
        ReportDataService.delete(id)
            .then(response => {
                console.log(response.data);
                setReports(reports.filter(report => report.id !== id));
            })
            .catch(e => {
                console.log(e);
            });
    };

    // 등록 버튼 클릭 시 실행될 함수
    const handleRegisterClick = () => {
        navigate("/report/register");
    };

    // 리스트 항목 클릭 시 상세 페이지로 이동
    const handleReportClick = (id) => {
        navigate(`/report/${id}`);
    };

    // 수정 버튼 클릭 시 실행될 함수
    const handleEditClick = (id) => {
        navigate(`/report/register/${id}`);
    };

    return (
        <>
            <Title title="결과 보고서 - 작성 방법 및 예시"/>
            <Tabs />

            <>
                <div style={{display: "flex", justifyContent: "space-between", alignItems:"center", padding:"8px 24px", borderBottom:"1px solid rgba(0,0,0,0.1)"}}>
                    <div>
                        <span>총 : {reports.length}개</span>
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
                                <th scope="col">작성날짜</th>
                                <th scope="col">수정날짜</th>
                                <th scope="col">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (                                                             
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td
                                        style={{ cursor: 'pointer', color: '#007bff' }}
                                        onClick={() => handleReportClick(report.id)}
                                    >
                                        {report.title}
                                    </td>
                                    <td>{new Date(report.created_at).toLocaleDateString('ko-KR')}</td>
                                    <td>{new Date(report.updated_at).toLocaleDateString('ko-KR')}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEditClick(report.id)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ marginLeft: '4px' }}
                                            onClick={() => deleteReport(report.id)}
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

export default Report;
