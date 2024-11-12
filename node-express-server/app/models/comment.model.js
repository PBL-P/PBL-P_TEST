module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      commenter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      announcement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'announcements', // 연결할 테이블 이름
          key: 'id', // 연결할 필드 이름
        },
        onDelete: 'CASCADE', // 부모 레코드 삭제 시 연관된 댓글 삭제
      },
    });
  
    return Comment;
  };  