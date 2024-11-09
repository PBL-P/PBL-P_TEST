import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanDataService from "../../services/plan.service";
import Title from "../../components/Title";

const PlanSubmitDetail = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);

    // 특정 제안서의 데이터를 가져오는 함수
    const getPlan = (id) => {
        PlanDataService.s_get(id)
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
            <Title title="제안서 - 제출 버전 관리" />
            <div style={{ padding: '16px 24px' }}>
                {plan ? (
                    <>
                        <h3>{plan.title}</h3>
                        <p><strong>팀명:</strong> {plan.teamName}</p>
                        <p><strong>팀원:</strong> {plan.member}</p>
                        <p><strong>소감문:</strong> {plan.thought}</p>
                        <p><strong>첨부파일:</strong> {plan.fileName || '없음'}</p>
                        <p><strong>작성일:</strong> {new Date(plan.createdAt).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default PlanSubmitDetail;
