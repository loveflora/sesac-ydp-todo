const express = require("express");
const router = express.Router();
const controller = require("../controller/Ctodo");

// GET /api/todos - show all todos (READ)
router.get("/todos", controller.readTodos);

// POST /api/todo - create a new todo (CREATE)
router.post("/todo", controller.createTodo);

// PATCH /api/todo/:todoId - edit a specific todo (UPDATE)
router.patch("/todo/:todoId", controller.updateTodo);

// PUT /api/todo/check - check all todo (UPDATE)
router.put("/todo/check", controller.checkAllTodo);

// PUT /api/todo/uncheck - uncheck all todo (UPDATE)
router.put("/todo/uncheck", controller.uncheckAllTodo);

// DELETE /api/todo/:todoId - remove a specific todo (DELETE)
router.delete("/todo/:todoId", controller.deleteTodo);

// DELETE /api/todo/all - remove all todo (DELETE)
router.delete("/todo", controller.deleteAllTodo);

module.exports = router;
