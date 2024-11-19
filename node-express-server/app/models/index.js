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

db.user = require("./user.model.js")(sequelize, Sequelize); // 여기에 추가
db.instruction = require("./instruction.model.js")(sequelize, Sequelize);
db.example = require("./example.model.js")(sequelize, Sequelize); // 추가
db.submission = require("./submission.model.js")(sequelize, Sequelize);

// index.js 파일에서 announcement 모델을 정의하지 않았언 ㅠㅠ
db.announcement = require("./announcement.model.js")(sequelize, Sequelize);

// 댓글 모델 만들었으니까 요거 정의!
db.comment = require("./comment.model.js")(sequelize, Sequelize);

// 모델 관계 설정 => 공지사항 자체가 사라지면 댓글도 사라지니까 이거 추가해야댐
db.announcement.hasMany(db.comment, { foreignKey: 'announcement_id', onDelete: 'CASCADE' });
db.comment.belongsTo(db.announcement, { foreignKey: 'announcement_id' });

module.exports = db;
