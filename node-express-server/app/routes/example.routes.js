module.exports = app => {
    const examples = require("../controllers/example.controller.js");
    var router = require("express").Router();
  
    // 제안서
    router.get("/proposal", examples.findAll);
    router.get("/proposal/:id", examples.findOne);
    router.post("/proposal/register", examples.create);
    router.put("/proposal/register/:id", examples.update);
    router.delete("/proposal/:id", examples.delete);
    router.delete("/proposal", examples.deleteAll);

    // 기획서
    router.get("/plan", examples.findAll);
    router.get("/plan/:id", examples.findOne);
    router.post("/plan/register", examples.create);
    router.put("/plan/register/:id", examples.update);
    router.delete("/plan/:id", examples.delete);
    router.delete("/plan", examples.deleteAll);

    // 설계서
    router.get("/design", examples.findAll);
    router.get("/design/:id", examples.findOne);
    router.post("/design/register", examples.create);
    router.put("/design/register/:id", examples.update);
    router.delete("/design/:id", examples.delete);
    router.delete("/design", examples.deleteAll);

    // 설계서
    router.get("/report", examples.findAll);
    router.get("/report/:id", examples.findOne);
    router.post("/report/register", examples.create);
    router.put("/report/register/:id", examples.update);
    router.delete("/report/:id", examples.delete);
    router.delete("/report", examples.deleteAll);
  
    app.use('/api/example', router);
  };