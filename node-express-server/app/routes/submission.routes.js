module.exports = app => {
  const submission = require("../controllers/submission.controller.js");
  var router = require("express").Router();

  // 제안서 관련 라우트

  router.get("/proposal/submit", submission.findAll);
  router.get("/proposal/submit/:id", submission.findOne);
  router.post("/proposal/submit/register", submission.create);
  router.put("/proposal/submit/register/:id", submission.update);
  router.delete("/proposal/submit/:id", submission.delete);
  router.delete("/proposal/submit", submission.deleteAll);

  // 기획서 관련 라우트
  router.get("/plan/submit", submission.findAll);
  router.get("/plan/submit/:id", submission.findOne);
  router.post("/plan/submit/register", submission.create);
  router.put("/plan/submit/register/:id", submission.update);
  router.delete("/plan/submit/:id", submission.delete);
  router.delete("/plan/submit", submission.deleteAll);

  // 설계서 관련 라우트
  router.get("/design/submit", submission.findAll);
  router.get("/design/submit/:id", submission.findOne);
  router.post("/design/submit/register", submission.create);
  router.put("/design/submit/register/:id", submission.update);
  router.delete("/design/submit/:id", submission.delete);
  router.delete("/design/submit", submission.deleteAll);

  // 결과 보고서 관련 라우트
  router.get("/report/submit", submission.findAll);
  router.get("/report/submit/:id", submission.findOne);
  router.post("/report/submit/register", submission.create);
  router.put("/report/submit/register/:id", submission.update);
  router.delete("/report/submit/:id", submission.delete);
  router.delete("/report/submit", submission.deleteAll);

  // 기본 경로 설정
  app.use('/api/submission', router);
};
