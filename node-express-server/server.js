const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./app/routes/submission.routes.js')(app);
require('./app/routes/instruction.routes.js')(app);
require('./app/routes/example.routes.js')(app);
require('./app/routes/announcement.routes.js')(app);

// 인증 관련 라우터 추가
const authRoutes = require('./app/routes/auth.routes.js'); // 라우터 가져오기
app.use('/api/auth', authRoutes); // app.use로 등록

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});