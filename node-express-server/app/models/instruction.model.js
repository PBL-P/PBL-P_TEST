module.exports = (sequelize, Sequelize) => {
    const Instruction = sequelize.define("instruction", {
      document_type_id: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      file_name: {
        type: Sequelize.STRING,
      },
      file_path: {
        type: Sequelize.STRING,
      },
    }, {
      timestamps: true, // timestamps 설정
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    return Instruction;
  };
  