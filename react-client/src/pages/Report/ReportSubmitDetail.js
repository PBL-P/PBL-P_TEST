import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReportDataService from "../../services/report.service";
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
`;

const ReportTitle = styled.div`
    font-size: 2rem;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
`;

const InfoBox = styled.div`
    margin-top: 24px;
`;

const ReportSubmitDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const [hasError, setHasError] = useState(false); // 오류 상태 추가
    const optionsRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);

    // Plugins
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [], // 사이드바 제거
    });
    const fullScreenPluginInstance = fullScreenPlugin();

    const getReport = (id) => {
        ReportDataService.s_get(id)
            .then((response) => {
                setReport(response.data);
                console.log(response.data);
            })
            .catch((e) => console.error(e));
    };

    const deleteReport = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            ReportDataService.s_delete(id)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate("/report");
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
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        getReport(id);
    }, [id]);

    return (
        <>
            <Title kind="form" />
            <div style={{ padding: "16px 24px", position: "relative" }}>
                {report ? (
                    <>
                        <ReportTitle>{report.title}</ReportTitle>
                        <div
                            style={{
                                marginTop: "24px",
                                paddingBottom: "8px",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            <h4 style={{ marginBottom: "18px" }}>
                                <i className="fa-regular fa-file-pdf"></i>
                                {report.fileNames[0]}
                            </h4>
                            {report.filePaths && report.filePaths.length > 0 && (
                                <>
                                    {/* Viewer로 첫 번째 파일 표시 */}
                                    {isPdfFile(report.filePaths[0]) && !hasError ? (
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                                            <ViewerWrapper className="viewer-container" tabIndex={0}>
                                                <Viewer
                                                    fileUrl={`http://localhost:8080/${report.filePaths[0]}`}
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
                                        <p style={{ color: "red", textAlign: "center" }}>
                                            PDF 파일만 미리보기가 가능합니다.
                                        </p>
                                    )}

                                    {/* 두 번째 파일 다운로드 링크로 표시 */}
                                    {report.filePaths[1] && (
                                        <div style={{ marginTop: "16px", display:"flex"}}>
                                        <p>
                                            <strong>첨부 자료:</strong>{" "}
                                            <a
                                                href={`http://localhost:8080/${report.filePaths[1]}`}
                                                download={report.fileNames[1]}
                                                style={{
                                                    color: "blue",                                                    
                                                }}
                                            >
                                                {report.fileNames[1]}
                                            </a>
                                        </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <InfoBox>
                            <p>
                                <strong>소감문:</strong> {report.thought}
                            </p>
                            <p>
                                <strong>작성일:</strong>{" "}
                                {new Date(report.createdAt).toLocaleDateString("ko-KR")}
                            </p>
                            <p>
                                <strong>수정일:</strong>{" "}
                                {new Date(report.updatedAt).toLocaleDateString("ko-KR")}
                            </p>
                            <p>
                                <strong>팀명:</strong> {report.teamName}
                            </p>
                            <p>
                                <strong>팀원:</strong> {report.member}
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
                            <button onClick={() => navigate(`/report/submit/register/${id}`)}>수정</button>
                            <button onClick={deleteReport}>삭제</button>
                        </OptionsMenu>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default ReportSubmitDetail;
