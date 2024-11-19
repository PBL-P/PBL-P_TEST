module.exports = (sequelize, Sequelize) => {
    const Example = sequelize.define("example", {
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
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    return Example;
};
