module.exports = app => {
    const announcements = require("../controllers/announcement.controller.js");
    const comments = require("../controllers/comment.controller.js"); // 댓글 컨트롤러 추가
    const router = require("express").Router();
  
    router.get("/announcement", announcements.findAll);             // 모든 공지사항 조회
    router.get("/announcement/:id", announcements.findOne);         // 특정 공지사항 조회
    router.post("/announcement/register", announcements.create);    // 새 공지사항 추가
    router.put("/announcement/register/:id", announcements.update); // 특정 공지사항 수정
    router.delete("/announcement/:id", announcements.delete);       // 특정 공지사항 삭제

    // 댓글 관련 라우트
    router.post("/announcement/:announcementId/comment", comments.create);              // 댓글 추가
    router.get("/announcement/:announcementId/comment", comments.findAll);              // 특정 공지사항의 모든 댓글 조회
    router.put("/announcement/:announcementId/comment/:commentId", comments.update);    // 특정 댓글 수정
    router.delete("/announcement/:announcementId/comment/:commentId", comments.delete); // 특정 댓글 삭제
  
    app.use("/api", router);
};