import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReportDataService from "../../services/report.service";
import Title from "../../components/Title";

const ReportSubmitDetail = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    // 특정 결과 보고서의 데이터를 가져오는 함수
    const getReport = (id) => {
        ReportDataService.s_get(id)
            .then(response => {
                setReport(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getReport(id);
    }, [id]);

    return (
        <>
            <Title title="결과 보고서 - 제출 버전 관리" />
            <div style={{ padding: '16px 24px' }}>
                {report ? (
                    <>
                        <h3>{report.title}</h3>
                        <p><strong>팀명:</strong> {report.teamName}</p>
                        <p><strong>팀원:</strong> {report.member}</p>
                        <p><strong>소감문:</strong> {report.thought}</p>
                        <p><strong>첨부파일:</strong> {report.fileName || '없음'}</p>
                        <p><strong>작성일:</strong> {new Date(report.createdAt).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ReportSubmitDetail;
