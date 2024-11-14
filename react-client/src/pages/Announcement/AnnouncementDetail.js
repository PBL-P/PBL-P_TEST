import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnnouncementDataService from "../../services/announcement.service";
import Title from "../../components/Title";

const AnnouncementDetail = () => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ commenter: "", content: "" });

    // 공지사항 데이터를 가져오는 함수
    const getAnnouncement = () => {
        AnnouncementDataService.get(id)
            .then(response => {
                setAnnouncement(response.data);
                fetchComments(); // 공지사항을 가져온 후 댓글도 가져옴
            })
            .catch(e => {
                console.error("Error fetching announcement:", e);
            });
    };

    // 댓글 데이터를 가져오는 함수
    const fetchComments = () => {
        AnnouncementDataService.c_getAll(id)
            .then(response => {
                setComments(response.data);
            })
            .catch(e => {
                console.error("Error fetching comments:", e);
            });
    };

    // 댓글을 제출하는 함수
    const submitComment = () => {
        if (newComment.commenter.trim() === "" || newComment.content.trim() === "") {
            alert("작성자 이름과 내용을 모두 입력해주세요.");
            return;
        }

        const commentData = {
            announcementId: id,
            commenter: newComment.commenter,
            content: newComment.content
        };

        AnnouncementDataService.c_create(id, commentData)
            .then(response => {
                setComments([...comments, response.data]); // 새로운 댓글 추가
                setNewComment({ commenter: "", content: "" }); // 입력 필드 초기화
            })
            .catch(e => {
                console.error("Error submitting comment:", e);
            });
    };

    // 댓글 수정 상태 토글
    const toggleEdit = (commentId) => {
        setComments(comments.map(comment =>
            comment.id === commentId ? { ...comment, isEditing: !comment.isEditing } : comment
        ));
    };

    // 댓글 내용 수정
    const handleEditChange = (commentId, updatedContent) => {
        setComments(comments.map(comment =>
            comment.id === commentId ? { ...comment, content: updatedContent } : comment
        ));
    };

    // 댓글 수정 완료
    const saveEdit = (commentId) => {
        const commentToUpdate = comments.find(comment => comment.id === commentId);
        
        // 서버에 전달할 데이터 객체
        const updatedData = {
            content: commentToUpdate.content
        };

        AnnouncementDataService.c_update(id, commentId, updatedData)
            .then(() => {
                setComments(comments.map(comment =>
                    comment.id === commentId ? { ...comment, isEditing: false } : comment
                ));
            })
            .catch(e => {
                console.error("Error updating comment:", e);
            });
    };

    // 댓글 삭제
    const deleteComment = (commentId) => {
        AnnouncementDataService.c_delete(id, commentId)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
            })
            .catch(e => {
                console.error("Error deleting comment:", e);
            });
    };

    useEffect(() => {
        getAnnouncement();
    }, [id]);

    return (
        <>
            <Title title="공지사항 세부 사항" />
            <div style={{ padding: '16px 24px' }}>
                {announcement ? (
                    <>
                        <h3>{announcement.title}</h3>
                        <p><strong>내용:</strong> {announcement.content}</p>
                        <p><strong>작성자:</strong> {announcement.createdBy}</p>
                        <p><strong>작성일:</strong> {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}</p>
                        <p><strong>수정일:</strong> {new Date(announcement.updatedAt).toLocaleDateString('ko-KR')}</p>

                        {/* 파일 다운로드 링크 */}
                        {announcement.file_name && announcement.file_path && (
                            <p>
                                <strong>첨부파일:</strong>{" "}
                                <a
                                    href={`http://localhost:8080/${announcement.file_path}`}
                                    download={announcement.file_name}
                                >
                                    {announcement.file_name}
                                </a>
                            </p>
                        )}

                        <div style={{ marginTop: '24px' }}>
                            <h4>댓글 ({comments.length})</h4>
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                                        <p><strong>{comment.commenter}</strong> {new Date(comment.updatedAt).toLocaleDateString('ko-KR')} {new Date(comment.updatedAt).toLocaleTimeString('ko-KR')}</p>
                                        {comment.isEditing ? (
                                            <>
                                                <textarea
                                                    value={comment.content}
                                                    onChange={(e) => handleEditChange(comment.id, e.target.value)}
                                                    style={{ width: '100%', padding: '8px' }}
                                                />
                                                <button onClick={() => saveEdit(comment.id)} style={{ marginTop: '8px', marginRight: '4px', padding: '4px 8px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                    저장
                                                </button>
                                                <button onClick={() => toggleEdit(comment.id)} style={{ marginTop: '8px', padding: '4px 8px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                    취소
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p>{comment.content}</p>
                                                <button onClick={() => toggleEdit(comment.id)} style={{ marginRight: '4px', padding: '4px 8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                    수정
                                                </button>
                                                <button onClick={() => deleteComment(comment.id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                    삭제
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <h4>댓글 작성</h4>
                            <input
                                type="text"
                                placeholder="작성자 이름"
                                value={newComment.commenter}
                                onChange={(e) => setNewComment({ ...newComment, commenter: e.target.value })}
                                style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                            />
                            <textarea
                                value={newComment.content}
                                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                                placeholder="내용을 입력하세요..."
                                style={{ width: '100%', height: '60px', padding: '8px' }}
                            />
                            <button onClick={submitComment} style={{ marginTop: '8px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                댓글 등록
                            </button>
                        </div>
                    </>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </>
    );
};

export default AnnouncementDetail;
