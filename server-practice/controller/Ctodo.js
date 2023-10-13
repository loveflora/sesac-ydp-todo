const { Todo } = require('../models');
const { Op } = require('sequelize');

//; GET /todos
//] read all
exports.readTodos = async (req, res) => {
  try {
    const result = await Todo.findAll();
    res.send({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//] CREATE
//; POST /todo
exports.createTodo = async (req, res) => {
  console.log(req.body);
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
      done: false,
    });
    console.log(newTodo);
    // res.send(newTodo);
    res.end();
  } catch (err) {
    res.send(err);
  }
};

//] update
//; UPDATE /todo/:todoId
exports.updateTodo = async (req, res) => {
  try {
    await Todo.update(
      { title: req.body.title, done: req.body.done },
      {
        where: { id: req.body.id },
      }
    );

    res.send(true);

    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
  } catch (err) {
    res.send(err);
  }
};

//] DELETE
//; DELETE /todo/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const isDeleted = await Todo.destroy({
      where: { id },
    });

    res.send(true);

    // 삭제 실패
    if (!isDeleted) {
      return res.send(false);
    }
  } catch (err) {
    res.send(err);
  }
};
