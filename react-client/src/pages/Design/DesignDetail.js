import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DesignDataService from "../../services/design.service";
import Title from "../../components/Title";

const DesignDetail = () => {
    const { id } = useParams();
    const [design, setDesign] = useState(null);

    // 특정 설계서의 데이터를 가져오는 함수
    const getDesign = (id) => {
        DesignDataService.get(id)
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
            <Title title="설계서 - 작성 방법 및 예시" />
            <div style={{ padding: '16px 24px' }}>
                {design ? (
                    <>
                        <h3>{design.title}</h3>
                        <p><strong>내용:</strong> {design.content}</p>
                        <p>
                            <strong>첨부파일:</strong>{" "}
                            <a 
                                href={`http://localhost:8080/${design.file_path}`} 
                                download={design.file_name}
                            >
                                {design.file_name}
                            </a>
                        </p>
                        <p><strong>작성일:</strong> {new Date(design.created_at).toLocaleDateString('ko-KR')}</p>
                        <p><strong>수정일:</strong> {new Date(design.updated_at).toLocaleDateString('ko-KR')}</p>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default DesignDetail;
