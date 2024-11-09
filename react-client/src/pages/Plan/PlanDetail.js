import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanDataService from "../../services/plan.service";
import Title from "../../components/Title";

const PlanDetail = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);

    // 특정 제안서의 데이터를 가져오는 함수
    const getPlan = (id) => {
        PlanDataService.get(id)
            .then(response => {
                setPlan(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getPlan(id);
    }, [id]);

    return (
        <>
            <Title title="기획서 - 제출 버전 관리" />
            <div style={{ padding: '16px 24px' }}>
                {plan ? (
                    <>
                        <h3>{plan.title}</h3>
                        <p><strong>내용:</strong> {plan.content}</p>
                        <p>
                            <strong>첨부파일:</strong>{" "}
                            <a 
                                href={`http://localhost:8080/${plan.file_path}`} 
                                download={plan.file_name}
                            >
                                {plan.file_name}
                            </a>
                        </p>
                        <p><strong>작성일:</strong> {new Date(plan.created_at).toLocaleDateString('ko-KR')}</p>
                        <p><strong>수정일:</strong> {new Date(plan.updated_at).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default PlanDetail;
