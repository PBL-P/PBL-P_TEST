import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReportDataService from "../../services/report.service";
import Title from "../../components/Title";

const ReportDetail = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    // 특정 결과 보고서의 데이터를 가져오는 함수
    const getReport = (id) => {
        ReportDataService.get(id)
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
            <Title title="결과 보고서 - 작성 방법 및 예시" />
            <div style={{ padding: '16px 24px' }}>
                {report ? (
                    <>
                        <h3>{report.title}</h3>
                        <p><strong>내용:</strong> {report.content}</p>
                        <p>
                            <strong>첨부파일:</strong>{" "}
                            <a 
                                href={`http://localhost:8080/${report.file_path}`} 
                                download={report.file_name}
                            >
                                {report.file_name}
                            </a>
                        </p>
                        <p><strong>작성일:</strong> {new Date(report.created_at).toLocaleDateString('ko-KR')}</p>
                        <p><strong>수정일:</strong> {new Date(report.updated_at).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ReportDetail;
