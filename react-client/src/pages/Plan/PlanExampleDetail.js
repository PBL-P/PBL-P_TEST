import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlanDataService from "../../services/plan.service";
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

const PlanExampleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const optionsRef = useRef();

    const getPlan = (id) => {
        PlanDataService.e_get(id)
            .then((response) => {
                setPlan(response.data);
            })
            .catch((e) => console.error(e));
    };

    const deletePlan = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            PlanDataService.e_delete(id)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate("/plan");
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
        getPlan(id);
    }, [id]);

    return (
        <>
            <Title kind="form" />
            <div style={{ padding: "16px 24px", position: "relative" }}>
                {plan ? (
                    <>
                        <h3>{plan.title}</h3>
                        <p>
                            <strong>내용:</strong> {plan.content}
                        </p>
                        <p>
                            <strong>첨부 자료:</strong>{" "}
                            <a
                                href={`http://localhost:8080/${plan.file_path}`}
                                download={plan.file_name}
                            >
                                {plan.file_name}
                            </a>
                        </p>
                        <p>
                            <strong>작성일:</strong>{" "}
                            {new Date(plan.created_at).toLocaleDateString("ko-KR")}
                        </p>
                        <p>
                            <strong>수정일:</strong>{" "}
                            {new Date(plan.updated_at).toLocaleDateString("ko-KR")}
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
                            <button onClick={() => navigate(`/plan/edit/${id}`)}>수정</button>
                            <button onClick={deletePlan}>삭제</button>
                        </OptionsMenu>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default PlanExampleDetail;
