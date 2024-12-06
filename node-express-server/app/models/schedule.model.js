module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedule", {
        title: {
            type: Sequelize.STRING,
            allowNull: false, // NOT NULL
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false, // NOT NULL
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false, // NOT NULL
        },
        progress: {
            type: Sequelize.INTEGER,
            allowNull: false, // NOT NULL
            validate: {
                min: 0,
                max: 100, // 0~100 사이 값만 허용
            },
        },
    }, {
        timestamps: true, // Sequelize의 기본 타임스탬프 기능 활성화
        createdAt: 'created_at', // DB의 created_at 필드와 매핑
        updatedAt: 'updated_at', // DB의 updated_at 필드와 매핑
    });

    return Schedule;
};
