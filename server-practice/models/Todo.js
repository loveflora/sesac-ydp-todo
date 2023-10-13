const Todo = (Sequelize, DataTypes) => {
  // Sequelize : models/index.js 에서 sequelize
  const model = Sequelize.define(
    "Todo",
    {
      // model의 column 정의

      // id int PRIMARY KEY NOT NULL auto_increment,
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // name VARCHAR(10) NOT NULL,
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // comment mediumtext
      done: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "Todo", // 실제 db 테이블명
      freezeTableName: true, // 테이블명 고정 (모델 이름 테이블로 바꿀 때 복수형으로 바뀜)
      //  timestamps: true, // true (default) : createdAt, updatedAt 컬럼 자동 생성 --> 일대일 매칭 안됨
      timestamps: false,
    },
  );

  return model;
};

module.exports = Todo;
