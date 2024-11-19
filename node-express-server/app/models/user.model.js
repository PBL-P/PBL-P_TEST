module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        user_id: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true, // 타임스탬프 사용
        createdAt: "created_at", // Sequelize 기본 createdAt을 created_at으로 변경
        updatedAt: false, // 필요하지 않다면 false로 설정 가능
      }
    );
  
    return User;
  };
  