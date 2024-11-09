module.exports = (sequelize, Sequelize) => {
    const DocumentType = sequelize.define("document_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return DocumentType;
  };
  