import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DesignDataService from "../../services/design.service";
import Title from "../../components/Title";

const DesignSubmitDetail = () => {
    const { id } = useParams();
    const [design, setDesign] = useState(null);

    // 특정 설계서의 데이터를 가져오는 함수
    const getDesign = (id) => {
        DesignDataService.s_get(id)
            .then(response => {
                setDesign(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDesign(id);
    }, [id]);

    return (
        <>
            <Title title="설계서 - 제출 버전 관리" />
            <div style={{ padding: '16px 24px' }}>
                {design ? (
                    <>
                        <h3>{design.title}</h3>
                        <p><strong>팀명:</strong> {design.teamName}</p>
                        <p><strong>팀원:</strong> {design.member}</p>
                        <p><strong>소감문:</strong> {design.thought}</p>
                        <p><strong>첨부파일:</strong> {design.fileName || '없음'}</p>
                        <p><strong>작성일:</strong> {new Date(design.createdAt).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default DesignSubmitDetail;
