const { Todo } = require("../models");
const { Op } = require("sequelize");

// GET /api/todos - show all todos (READ)
exports.readTodos = async (_, res) => {
  try {
    let todos = await Todo.findAll({
      order: [["done"], ["id", "DESC"]],
    });
    res.send(todos);
  } catch (err) {
    res.send(err);
  }
};

// POST /api/todo - create a new todo (CREATE)
exports.createTodo = async (req, res) => {
  console.log(">>>>", req.body);
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
      done: false,
    });
    console.log(newTodo);
    res.send(newTodo);
    // res.end(); // 데이터 없이 응답 -> 빈 문자열
  } catch (err) {
    res.send(err);
  }
};

// PATCH /api/todo/:todoId - edit a specific todo (UPDATE)
exports.updateTodo = async (req, res) => {
  console.log(req.body);
  try {
    let [idUpdated] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: { [Op.eq]: req.params.todoId },
          // [Op.eq]: 3
          // = 3
        },
      },
    );

    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let isDeleted = await Todo.destroy({
      where: {
        id: { [Op.eq]: req.params.todoId },
      },
      raw: true,
    });
    // 삭제 실패
    if (!isDeleted) {
      return res.send(false);
    }
    // 삭제 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};

// PUT /api/todo/check - check all todo (UPDATE)
exports.checkAllTodo = async (req, res) => {
  try {
    let [idUpdated] = await Todo.update(
      {
        done: true,
      },
      {
        where: {}, // 모든 항목을 업데이트하기 위해 빈 객체 사용
      },
    );

    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
    console.log(idUpdated);
  } catch (err) {
    res.send(err);
  }
};

// PUT /api/todo/uncheck - uncheck all todo (UPDATE)
exports.uncheckAllTodo = async (req, res) => {
  try {
    let [idUpdated] = await Todo.update(
      {
        done: false,
      },
      {
        where: {}, // 모든 항목을 업데이트하기 위해 빈 객체 사용
      },
    );

    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};

// DELETE /api/todo/all - remove all todo (DELETE)
exports.deleteAllTodo = async (req, res) => {
  try {
    let isDeleted = await Todo.destroy({
      where: {},
      raw: true,
    });
    // 삭제 실패
    if (!isDeleted) {
      return res.send(false);
    }
    // 삭제 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
};
