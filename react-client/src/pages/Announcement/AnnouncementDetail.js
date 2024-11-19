import React, { useState, useEffect, useRef  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AnnouncementDataService from "../../services/announcement.service";
import Title from "../../components/Title";

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;       
    
`;
const Y_OptionsIcon = styled.div`
    cursor: pointer;
    font-size: 24px;
    margin-right: 12px;
`;

const Y_OptionsMenu = styled.div`
    position: absolute;
    top: 170px;
    right: 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.visible ? "block" : "none")}; /* visible 상태 반영 */
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

const Container = styled.div`
    margin: 20px 42px;
    font-family: "Arial", sans-serif;
    background: #fff;
    border-radius: 8px;
`;

const Header = styled.div`
    margin-top: 16px;
    padding: 16px;
    border-top: 1.5px solid;
    background: #ecf4fc;
    font-size: 24px;
    font-weight: bold;
`;
const BackButton = styled.button`
    padding: 9px 18px;
    background-color: #ffffff;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: color 0.3s;

    &:hover {
        color: black;
    }

`;
const Content = styled.div`
    padding: 16px;
`;

const Metadata = styled.div`
    font-size: 14px;
    color: #555;
    margin-bottom: 24px;
`;

const Body = styled.p`
    margin: 16px 0;
    line-height: 1.6;
`;

const CommentsSection = styled.div`
    border-top: 1px solid;
    padding: 16px;
`;

const CommentsTitle = styled.h4`
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
`;

const CommentItem = styled.div`
    position: relative;
    padding: 24px 0;
    border-bottom: 1px solid #ddd;
`;

const CommentMeta = styled.div`
    font-size: 14px;
    color: #555;
    margin-bottom: 16px;
`;

const CommentCount = styled.span`
    background-color: #6fcd39;
    color: white;
    padding: 2px 12px;
    font-weight: 100;
    border-radius: 12px;

`

const CommentBody = styled.div`
    font-size: 14px;
    line-height: 1.6;
    margin-left: 8px;
`;

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

const InputWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column; /* 기본 방향: 세로 정렬 */
    align-items: flex-start;

    /* 버튼 정렬을 위한 별도 컨테이너 */
    & > button {
        align-self: flex-end; /* 버튼을 오른쪽 끝으로 이동 */
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 80px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    margin-top: 8px;
    padding: 12px 24px;
    background-color: #009EFF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: #007acc;
    }
    i {
        padding-right: 12px;
    }
`;
const Commenter = styled.span`
    font-weight: bold;
    font-size: 16px; /* 원하는 크기로 설정 */
    margin-right: 8px; /* 글씨 간격 조정 */
`;

const EditWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    flex-direction: column;
    input {
        flex: 1;
        margin-right: 8px;
    }
`;

const SaveButton = styled(SubmitButton)`
    margin-left: auto;
`;

const Attachment = styled.div`
    margin-top: 24px;
    padding: 8px;
    padding-top: 12px;
    border-top: 1px solid #ddd;    
    font-size: 15px;
`;

const AttachmentLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;


const AnnouncementDetail = () => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ commenter: "", content: "" });
    const [visibleOptions, setVisibleOptions] = useState(null);
    const [announcementVisibleOptions, setAnnouncementVisibleOptions] = useState(null);
    
    const navigate = useNavigate();
    const optionsRef = useRef();
    const announcementsRef = useRef();

    const getAnnouncement = () => {
        AnnouncementDataService.get(id)
            .then((response) => {
                setAnnouncement(response.data);
                fetchComments();
            })
            .catch((e) => console.error("Error fetching announcement:", e));
    };
    const deleteAnnouncement = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            AnnouncementDataService.delete(id)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate("/announcement");
                })
                .catch((e) => console.error("Error deleting announcement:", e));
        }
    };
    const fetchComments = () => {
        AnnouncementDataService.c_getAll(id)
            .then((response) => setComments(response.data))
            .catch((e) => console.error("Error fetching comments:", e));
    };

    const submitComment = () => {
        if (!newComment.commenter || !newComment.content) {
            alert("작성자 이름과 내용을 모두 입력해주세요.");
            return;
        }

        const commentData = {
            announcementId: id,
            commenter: newComment.commenter,
            content: newComment.content,
        };

        AnnouncementDataService.c_create(id, commentData)
            .then((response) => {
                setComments([...comments, response.data]);
                setNewComment({ commenter: "", content: "" });
            })
            .catch((e) => console.error("Error submitting comment:", e));
    };

    const deleteComment = (commentId) => {
        AnnouncementDataService.c_delete(id, commentId)
            .then(() => {
                setComments(comments.filter((comment) => comment.id !== commentId));
            })
            .catch((e) => console.error("Error deleting comment:", e));
    };

    const toggleEdit = (commentId) => {
        setComments((comments) =>
            comments.map((comment) =>
                comment.id === commentId ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    };

    const handleEditChange = (commentId, newContent) => {
        setComments((comments) =>
            comments.map((comment) =>
                comment.id === commentId ? { ...comment, content: newContent } : comment
            )
        );
    };

    const saveEdit = (commentId) => {
        const updatedComment = comments.find((comment) => comment.id === commentId);
        AnnouncementDataService.c_update(id, commentId, { content: updatedComment.content })
            .then(() => {
                toggleEdit(commentId);
            })
            .catch((e) => console.error("Error updating comment:", e));
    };

    const handleOutsideClick = (event) => {
        if (
            announcementsRef.current &&
            !announcementsRef.current.contains(event.target)
        ) {
            setAnnouncementVisibleOptions(false); // 메뉴 닫기
        }
        if (
            optionsRef.current &&
            !optionsRef.current.contains(event.target)
        ) {
            setVisibleOptions(null); // 댓글 메뉴 닫기
        }
    };
    
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    

    useEffect(() => {
        getAnnouncement();
    }, [id]);

    return (
        <>
            <Title kind="form" />
            <Container>
                {announcement && (
                    <>
                    <HeaderWrapper>
                        <BackButton onClick={() => navigate("/announcement")}>
                            목록으로 이동
                        </BackButton>
                        <Y_OptionsIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                setAnnouncementVisibleOptions((prev) => !prev); // announcementVisibleOptions 토글
                            }}
                        >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Y_OptionsIcon>
                        <Y_OptionsMenu ref={announcementsRef} visible={announcementVisibleOptions}>
                            <button onClick={() => navigate(`/announcement/register/${id}`)}>수정</button>
                            <button onClick={deleteAnnouncement}>삭제</button>
                        </Y_OptionsMenu>
                    </HeaderWrapper>

                        <Header>{announcement.title}</Header>
                        <Content>
                            <Metadata>
                                작성자: {announcement.createdBy} | 등록:{" "}
                                {new Date(announcement.createdAt).toLocaleDateString("ko-KR")}
                            </Metadata>
                            <Body>{announcement.content}</Body>
                            {announcement.file_name && announcement.file_path && (
                                <Attachment>
                                    첨부파일:{" "}
                                    <AttachmentLink
                                        href={`http://localhost:8080/${announcement.file_path}`}
                                        download={announcement.file_name}
                                    >
                                        {announcement.file_name}
                                    </AttachmentLink>
                                </Attachment>
                            )}                            
                        </Content>
                        <CommentsSection>
                            <CommentsTitle>
                                댓글 <CommentCount>{comments.length}</CommentCount>
                            </CommentsTitle>
                            {comments.map((comment) => (
                                <CommentItem key={comment.id}>
                                    <CommentMeta>
                                        <Commenter>{comment.commenter}</Commenter> |{" "}
                                        {new Date(comment.updatedAt).toLocaleDateString("ko-KR")}{" "}
                                        {new Date(comment.updatedAt).toLocaleTimeString("ko-KR")}
                                    </CommentMeta>
                                    {comment.isEditing ? (
                                        <EditWrapper>
                                            <Input
                                                value={comment.content}
                                                onChange={(e) => handleEditChange(comment.id, e.target.value)}
                                            />
                                            <SaveButton onClick={() => saveEdit(comment.id)}>저장</SaveButton>
                                        </EditWrapper>
                                    ) : (
                                        <CommentBody>{comment.content}</CommentBody>
                                    )}
                                    <OptionsIcon
                                        onClick={(e) => {
                                            e.stopPropagation(); // 이벤트 전파를 막음
                                            setVisibleOptions(
                                                visibleOptions === comment.id ? null : comment.id
                                            );
                                        }}
                                    >
                                        ⋮
                                    </OptionsIcon>
                                    <OptionsMenu
                                        ref={optionsRef}
                                        visible={visibleOptions === comment.id}
                                    >
                                        <button onClick={() => toggleEdit(comment.id)}>수정</button>
                                        <button onClick={() => deleteComment(comment.id)}>삭제</button>
                                    </OptionsMenu>
                                </CommentItem>
                            ))}
                            <InputWrapper>
                                <Input
                                    type="text"
                                    placeholder="작성자 이름"
                                    value={newComment.commenter}
                                    onChange={(e) =>
                                        setNewComment({ ...newComment, commenter: e.target.value })
                                    }
                                />
                                <TextArea
                                    placeholder="댓글 내용을 입력하세요..."
                                    value={newComment.content}
                                    onChange={(e) =>
                                        setNewComment({ ...newComment, content: e.target.value })
                                    }
                                />
                                <SubmitButton onClick={submitComment}>
                                    <i className="fa-regular fa-message"></i>댓글등록
                                </SubmitButton>
                            </InputWrapper>
                        </CommentsSection>
                    </>
                )}
            </Container>
        </>
    );
};

export default AnnouncementDetail;