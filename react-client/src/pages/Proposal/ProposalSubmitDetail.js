import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalDataService from "../../services/proposal.service";
import Title from "../../components/Title";

const ProposalSubmitDetail = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState(null);

    // 특정 제안서의 데이터를 가져오는 함수
    const getProposal = (id) => {
        ProposalDataService.s_get(id)
            .then(response => {
                setProposal(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getProposal(id);
    }, [id]);

    return (
        <>
            <Title title="제안서 - 제출 버전 관리" />
            <div style={{ padding: '16px 24px' }}>
                {proposal ? (
                    <>
                        <h3>{proposal.title}</h3>
                        <p><strong>팀명:</strong> {proposal.teamName}</p>
                        <p><strong>팀원:</strong> {proposal.member}</p>
                        <p><strong>소감문:</strong> {proposal.thought}</p>
                        <p><strong>첨부파일:</strong> {proposal.fileName || '없음'}</p>
                        <p><strong>작성일:</strong> {new Date(proposal.createdAt).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ProposalSubmitDetail;
