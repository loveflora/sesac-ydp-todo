const express = require('express');
const app = express();
const path = require('path');
const PORT = 8001;

// const cors = require('cors');
// app.use(cors());

const db = require('./models'); // ./models/index.js

// EJS
// app.set("view engine", "ejs");
// app.use("/views", express.static(__dirname + "/views"));
// app.use("/static", express.static(__dirname + "/static"));
// app.use(express.urlencoded({ extended: true }));
// post 요청으로 들어오는 모든 형식의 데이터를 파싱(분해)
app.use(express.json());

//] React
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//; 라우터 분리
const todoRouter = require('./routes/todo'); // index 생략 가능 !
// indexRouter에서는 localhost:PORT/ 기본 경로 설정 !
// const indexRouter = require('./routes/index');

// app.use('/', indexRouter);
app.use('/api', todoRouter);

app.get('*', (req, res) => {
  res.render('404');
});

const { Todo } = require('./models');

// 더미 데이터 생성 및 저장
// const dummyData = [
//   {
//     title: 'my todo1',
//     done: false,
//   },
//   {
//     title: 'my todo2',
//     done: false,
//   },
//   {
//     title: 'my todo3',
//     done: true,
//   },
//   {
//     title: 'my todo4',
//     done: false,
//   },
// ];

db.sequelize.sync({ force: false }).then(async () => {
  //-- force: false;
  // 실제 DB에 테이블이 존재하지 않으면,
  // 모델에 정의한대로 생성
  //-- force: true;
  // DB에 테이블 있어도 무조건 생성

  // for (const data of dummyData) {
  //   await Todo.create(data);
  // }

  app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
  });
});
