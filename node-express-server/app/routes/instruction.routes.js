module.exports = app => {
  const instructions = require("../controllers/instruction.controller.js"); // controller 경로 확인
  var router = require("express").Router();

  
  // 제안서 
  router.get("/proposal", instructions.findAll);
  router.get("/proposal/:id", instructions.findOne);
  router.post("/proposal/register", instructions.create);
  router.put("/proposal/register/:id", instructions.update);
  router.delete("/proposal/:id", instructions.delete);
  router.delete("/proposal", instructions.deleteAll);

  // 기획서
  router.get("/plan", instructions.findAll);
  router.get("/plan/:id", instructions.findOne);
  router.post("/plan/register", instructions.create);
  router.put("/plan/register/:id", instructions.update);
  router.delete("/plan/:id", instructions.delete);
  router.delete("/plan", instructions.deleteAll);

  // 설계서
  router.get("/design", instructions.findAll);
  router.get("/design/:id", instructions.findOne);
  router.post("/design/register", instructions.create);
  router.put("/design/register/:id", instructions.update);
  router.delete("/design/:id", instructions.delete);
  router.delete("/design", instructions.deleteAll);

  // 결과 보고서
  router.get("/report", instructions.findAll);
  router.get("/report/:id", instructions.findOne);
  router.post("/report/register", instructions.create);
  router.put("/report/register/:id", instructions.update);
  router.delete("/report/:id", instructions.delete);
  router.delete("/report", instructions.deleteAll);

  app.use('/api/instruction', router);
};