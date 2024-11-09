import React, { useState, useEffect } from 'react';
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import { useNavigate } from 'react-router-dom';
import ReportDataService from "../../services/report.service";

const ReportSubmit = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    // 데이터를 가져오는 함수
    const retrieveReports = () => {
        ReportDataService.s_getAll()
            .then(response => {
                setReports(response.data);  // 데이터 상태 업데이트
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveReports();  // 컴포넌트 마운트 시 데이터 가져오기
    }, []);
    
    // 결과 보고서 삭제 함수
    const deleteReport = (id) => {
        ReportDataService.s_delete(id)
            .then(response => {
                console.log(response.data);
                setReports(reports.filter(report => report.id !== id));  // 삭제된 항목 제거
            })
            .catch(e => {
                console.log(e);
            });
    };

    // 등록 버튼 클릭 시 실행될 함수
    const handleRegisterClick = () => {
        navigate("/report/submit/register");
    };

    // 리스트 항목 클릭 시 상세 페이지로 이동
    const handleReportClick = (id) => {
        navigate(`/report/submit/${id}`);
    };

    return (
        <>
            <Title title="결과 보고서 - 제출 버전 관리"/>
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
                                <th scope="col">팀명</th>
                                <th scope="col">팀원</th>
                                <th scope="col">날짜</th>
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
                                    <td>{report.teamName}</td>                                    
                                    <td>{report.member}</td>
                                    <td>{new Date(report.createdAt).toLocaleDateString('ko-KR')}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
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

export default ReportSubmit;
