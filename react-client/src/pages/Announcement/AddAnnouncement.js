import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnnouncementDataService from "../../services/announcement.service";

const AnnouncementDetailWrapper = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AnnouncementTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const AnnouncementContent = styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
`;

const CommentSection = styled.div`
    margin-top: 30px;
`;

const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CommentItem = styled.li`
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const AnnouncementDetail = () => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // 특정 공지사항 데이터를 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await AnnouncementDataService.get(id);
                setAnnouncement(response.data);
                setComments(response.data.comments || []);
            } catch (e) {
                console.error("Error fetching announcement data:", e);
            }
        };
        fetchData();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // API 호출하여 댓글 등록
        try {
            await fetch(`/api/announcements/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: comment })
            });
            setComments([...comments, { text: comment }]);
            setComment('');
        } catch (e) {
            console.error("Error submitting comment:", e);
        }
    };

    return (
        <AnnouncementDetailWrapper>
            {announcement ? (
                <>
                    <AnnouncementTitle>{announcement.title}</AnnouncementTitle>
                    <AnnouncementContent>{announcement.content}</AnnouncementContent>
                    <CommentSection>
                        <h2>댓글</h2>
                        <CommentList>
                            {comments.map((c, index) => (
                                <CommentItem key={index}>{c.text}</CommentItem>
                            ))}
                        </CommentList>
                        <CommentForm onSubmit={handleCommentSubmit}>
                            <Input 
                                type="text" 
                                placeholder="댓글 작성" 
                                value={comment} 
                                onChange={(e) => setComment(e.target.value)} 
                                required 
                            />
                            <Button type="submit">등록</Button>
                        </CommentForm>
                    </CommentSection>
                </>
            ) : (
                <p>로딩 중...</p>
            )}
        </AnnouncementDetailWrapper>
    );
};

export default AnnouncementDetail;