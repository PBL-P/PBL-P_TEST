module.exports = (app) => {
    const schedules = require("../controllers/schedule.controller.js");
    const router = require("express").Router();
  
    router.get("/schedule", schedules.findAll);           // 모든 일정 조회
    router.post("/schedule/register", schedules.create);  // 일정 생성 
    router.put("/schedule/:id", schedules.update);         // 일정 수정
    router.delete("/schedule/:id", schedules.delete);      // 일정 삭제
  
    app.use("/api", router);
  };  