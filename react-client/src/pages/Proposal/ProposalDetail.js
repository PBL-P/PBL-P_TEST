import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalDataService from "../../services/proposal.service";
import Title from "../../components/Title";

const ProposalDetail = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState(null);

    // 특정 제안서의 데이터를 가져오는 함수
    const getProposal = (id) => {
        ProposalDataService.get(id)
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
            <Title title="제안서 - 작성 방법 및 예시" />
            <div style={{ padding: '16px 24px' }}>
                {proposal ? (
                    <>
                        <h3>{proposal.title}</h3>
                        <p><strong>내용:</strong> {proposal.content}</p>
                        <p>
                            <strong>첨부 자료:</strong>{" "}
                            <a 
                                href={`http://localhost:8080/${proposal.file_path}`} 
                                download={proposal.file_name}
                            >
                                {proposal.file_name}
                            </a>
                        </p>
                        <p><strong>작성일:</strong> {new Date(proposal.created_at).toLocaleDateString('ko-KR')}</p>
                        <p><strong>수정일:</strong> {new Date(proposal.updated_at).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ProposalDetail;
