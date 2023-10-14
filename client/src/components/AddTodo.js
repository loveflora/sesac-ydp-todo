import React, { useState } from 'react';

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({ title: '' });

  const onButtonClick = () => {
    addItem(todoItem);
    // input 초기화
    setTodoItem({ title: '' });
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        className="bg-transparent"
        placeholder="Add your new todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      <button onClick={onButtonClick}>ADD</button>
    </div>
  );
}
