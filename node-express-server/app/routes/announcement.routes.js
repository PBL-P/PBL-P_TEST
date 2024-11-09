module.exports = app => {
    const announcements = require("../controllers/announcement.controller.js");
    const router = require("express").Router();
  
    router.get("/announcement", announcements.findAll);             // 모든 공지사항 조회
    router.get("/announcement/:id", announcements.findOne);          // 특정 공지사항 조회
    router.post("/announcement/add", announcements.create);             // 새 공지사항 추가
    router.put("/announcement/edit/:id", announcements.update);           // 특정 공지사항 수정
    router.delete("/announcement/:id", announcements.delete);        // 특정 공지사항 삭제
  
    app.use("/api", router);
};