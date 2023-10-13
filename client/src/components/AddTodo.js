import React, { useState } from 'react';
import axios from 'axios';

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({ title: '' });

  const onButtonClick = () => {
    axios({
      method: 'POST',
      url: '/todo',
      // data: {
      //   result,
      // },
    })
      .then((res) => {
        if (res) {
          console.log(res.data);
          addItem(todoItem);
          // input 초기화
          setTodoItem({ title: '' });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        placeholder="Add your new todo"
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      <button onClick={onButtonClick}>ADD</button>
    </div>
  );
}
