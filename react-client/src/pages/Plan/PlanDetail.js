import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlanDataService from "../../services/plan.service";
import Title from "../../components/Title";
import styled from "styled-components";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";

const OptionsIcon = styled.div`
    position: absolute;
    top: 12px;
    right: 24px;
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

const ViewerWrapper = styled.div`
    width: 80%;
    aspect-ratio: 16 / 9; /* 16:9 비율 유지 */
    border: 1px solid #444;
    border-radius: 4px;
    background: #121212;
    margin: 0 auto; /* 가운데 정렬 */
    position: relative;
    border-bottom: 1px solid #ddd;
`;

const PlanTitle = styled.div`
    font-size: 2rem;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
`;

const InfoBox = styled.div`
    margin-top: 24px;
`;

const PlanDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const [hasError, setHasError] = useState(false); // 오류 상태 추가
    const optionsRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);

    // Plugins
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [], // 사이드바 제거
    });
    const fullScreenPluginInstance = fullScreenPlugin();

    const getPlan = (id) => {
        PlanDataService.get(id)
            .then((response) => {
                setPlan(response.data);
            })
            .catch((e) => console.error(e));
    };

    const deletePlan = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            PlanDataService.delete(id)
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

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            setCurrentPage((prev) => prev + 1); // 다음 페이지
        } else if (e.key === "ArrowLeft") {
            setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0)); // 이전 페이지
        }
    };

    const isPdfFile = (filePath) => {
        // 파일 확장자가 .pdf인지 확인
        return filePath?.toLowerCase().endsWith(".pdf");
    };

    useEffect(() => {
        // 키 이벤트는 전체 화면일 때만 작동
        const fullScreenContainer = document.querySelector(".viewer-container");
        if (fullScreenContainer) {
            fullScreenContainer.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            if (fullScreenContainer) {
                fullScreenContainer.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [currentPage]);

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
                        <PlanTitle>{plan.title}</PlanTitle>
                        <div
                            style={{
                                marginTop: "24px",                                
                                paddingBottom: "24px",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            <h4 style={{ marginBottom: "18px" }}>
                                <i className="fa-regular fa-file-pdf"></i>
                                {plan.file_name}
                            </h4>
                            {plan.file_path && isPdfFile(plan.file_path) && !hasError ? (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                                    <ViewerWrapper className="viewer-container" tabIndex={0}>
                                        <Viewer
                                            fileUrl={`http://localhost:8080/${plan.file_path}`}
                                            plugins={[
                                                defaultLayoutPluginInstance,
                                                fullScreenPluginInstance,
                                            ]}
                                            theme="dark" // Dark Theme 설정
                                            renderMode="singlePage" // 슬라이드 형식
                                            defaultScale={SpecialZoomLevel.PageWidth}
                                            initialPage={currentPage} // 현재 페이지
                                            onError={(error) => {
                                                console.error(
                                                    "PDF 로드 중 오류 발생. Viewer 숨김:",
                                                    error
                                                );
                                                setHasError(true); // 오류 상태 업데이트
                                            }}
                                        />
                                    </ViewerWrapper>
                                </Worker>
                            ) : (
                                <p>
                                    <strong>첨부 자료:</strong>{" "}
                                    <a
                                        href={`http://localhost:8080/${plan.file_path}`}
                                        download={plan.file_name}
                                    >
                                        {plan.file_name}
                                    </a>
                                </p>
                            )}
                        </div>
                        <InfoBox>
                            <p>
                                <strong>내용:</strong> {plan.content}
                            </p>
                            <p>
                                <strong>작성일:</strong>{" "}
                                {new Date(plan.created_at).toLocaleDateString("ko-KR")}
                            </p>
                            <p>
                                <strong>수정일:</strong>{" "}
                                {new Date(plan.updated_at).toLocaleDateString("ko-KR")}
                            </p>
                        </InfoBox>
                        <OptionsIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                setVisibleOptions((prev) => !prev);
                            }}
                        >
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </OptionsIcon>
                        <OptionsMenu ref={optionsRef} visible={visibleOptions}>
                            <button onClick={() => navigate(`/plan/register/${id}`)}>수정</button>
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

export default PlanDetail;
