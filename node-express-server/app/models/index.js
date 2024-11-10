const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.instruction = require("./instruction.model.js")(sequelize, Sequelize);
db.submission = require("./submission.model.js")(sequelize, Sequelize);

// index.js 파일에서 announcement 모델을 정의하지 않았언 ㅠㅠ
db.announcement = require("./announcement.model.js")(sequelize, Sequelize);

module.exports = db;
