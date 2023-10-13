const express = require('express');
const router = express.Router();
const controller = require('../controller/Ctodo');

// 기본 주소
// localhost:PORT

//; GET /todos
// localhost:PORT/todos
router.get('/todos', controller.readTodos);

//; POST /todo
// 프론트에서 요청이 왔을 때
router.post('/todo', controller.createTodo);

//; DELETE /todo/:todoId
router.delete('/todo/:todoId', controller.deleteTodo);

//; PATCH /todo/:todoId
router.patch('/todo/:todoId', controller.updateTodo);

module.exports = router;
