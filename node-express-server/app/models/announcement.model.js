module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define("announcements", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true,
     },
      file_path: {
        type: Sequelize.STRING,
        allowNull: true,
     },
    });
  
    return Announcement;
  };  