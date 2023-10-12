const { Todo } = require("../models");

//; GET /
exports.main = (req, res) => {
  res.render("index");
};

//; GET /todos
//] read all
exports.getTodos = async (req, res) => {
  const result = await Todo.findAll();
  res.render("visitor", { data: result });
};

//] CREATE
//; POST /todo
exports.postTodo = async (req, res) => {
  const { id, title } = req.body;
  const result = await Todo.create({
    id,
    title,
    done: false,
  });
  res.send(result);
};

//] update
//; UPDATE /todo/:todoId
exports.updateTodo = async (req, res) => {
  await Todo.update(
    { title: req.body.title, done: req.body.done },
    {
      where: { id: req.body.id },
    },
  );
  res.send({ isUpdated: true });
};

//] DELETE
//; DELETE /todo/:todoId
exports.deleteTodo = async (req, res) => {
  console.log(req.body); // { id : xx }
  const { id } = req.body;

  const result = await Todo.destroy({
    where: { id },
  });

  res.send(true); // '삭제 성공(true)'을 프론트로 넘김
};
