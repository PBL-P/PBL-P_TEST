const db = require("../models");
const User = db.user;

// 회원가입
exports.register = async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).send({ message: "User ID and Password are required!" });
  }

  try {
    // 사용자 생성
    const user = await User.create({ user_id, password });
    res.status(201).send({ message: "User registered successfully!", userId: user.id });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ message: "User ID already exists!" });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

// 로그인
exports.login = async (req, res) => {
  const { student_id, password } = req.body;

  if (!student_id || !password) {
    return res.status(400).send({ message: "Student ID and Password are required!" });
  }

  try {
    // 사용자 조회
    const user = await User.findOne({ where: { student_id } });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // 비밀번호 확인
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    res.status(200).send({ message: "Login successful!", userId: user.id });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};