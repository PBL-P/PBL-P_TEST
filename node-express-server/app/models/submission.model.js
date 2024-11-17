module.exports = (sequelize, Sequelize) => {
  const Submission = sequelize.define("submission", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document_type_id: {
      type: Sequelize.STRING,  // `STRING` 타입으로 수정
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    teamName: {
      type: Sequelize.STRING,
    },
    member: {
      type: Sequelize.STRING,
    },
    thought: {
      type: Sequelize.STRING,
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    filePath: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Submission;
};
