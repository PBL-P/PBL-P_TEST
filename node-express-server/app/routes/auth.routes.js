const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// 회원가입
router.post("/register", authController.register);

// 로그인
router.post("/login", authController.login);

module.exports = router; // app.use 부분 제거하고 router만 내보냄