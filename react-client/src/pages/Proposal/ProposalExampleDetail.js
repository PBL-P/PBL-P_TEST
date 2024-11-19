import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProposalDataService from "../../services/proposal.service";
import Title from "../../components/Title";
import styled from "styled-components";

const OptionsIcon = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    font-size: 24px;
`;

const OptionsMenu = styled.div`
    position: absolute;
    top: 24px;
    right: 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.visible ? "block" : "none")};
    z-index: 10;

    button {
        width: 100%;
        background: none;
        border: none;
        padding: 8px 12px;
        text-align: left;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background: #f5f5f5;
        }
    }
`;

const ProposalExampleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proposal, setProposal] = useState(null);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const optionsRef = useRef();

    const getProposal = (id) => {
        ProposalDataService.e_get(id)
            .then((response) => {
                setProposal(response.data);
            })
            .catch((e) => console.error(e));
    };

    const deleteProposal = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            ProposalDataService.e_delete(id)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate("/proposal");
                })
                .catch((e) => console.error(e));
        }
    };

    const handleOutsideClick = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setVisibleOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        getProposal(id);
    }, [id]);

    return (
        <>
            <Title kind="form" />
            <div style={{ padding: "16px 24px", position: "relative" }}>
                {proposal ? (
                    <>
                        <h3>{proposal.title}</h3>
                        <p>
                            <strong>내용:</strong> {proposal.content}
                        </p>
                        <p>
                            <strong>첨부 자료:</strong>{" "}
                            <a
                                href={`http://localhost:8080/${proposal.file_path}`}
                                download={proposal.file_name}
                            >
                                {proposal.file_name}
                            </a>
                        </p>
                        <p>
                            <strong>작성일:</strong>{" "}
                            {new Date(proposal.created_at).toLocaleDateString("ko-KR")}
                        </p>
                        <p>
                            <strong>수정일:</strong>{" "}
                            {new Date(proposal.updated_at).toLocaleDateString("ko-KR")}
                        </p>
                        <OptionsIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                setVisibleOptions((prev) => !prev);
                            }}
                        >
                            ⋮
                        </OptionsIcon>
                        <OptionsMenu ref={optionsRef} visible={visibleOptions}>
                            <button onClick={() => navigate(`/proposal/edit/${id}`)}>수정</button>
                            <button onClick={deleteProposal}>삭제</button>
                        </OptionsMenu>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ProposalExampleDetail;
