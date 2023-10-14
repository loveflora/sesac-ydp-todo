import React, { useState } from 'react';

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({ title: '' });

  //-- 1) 버튼 클릭 시 입력
  // const onButtonClick = () => {
  // if (!todoItem.title.trim()) return;
  // addItem(todoItem);
  // input 초기화
  // setTodoItem({ title: '' });
  // };

  //-- 2) 엔터 치면 입력됨
  const handleKeyDown = (e) => {
    if (!todoItem.title.trim()) return;

    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.code === 'Enter') {
      addItem(todoItem);

      // input 초기화
      setTodoItem({ title: '' });
      return;
    }
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        className="bg-transparent text-white w-full placeholder-[rgba(255,255,255,0.3)] border-b-2 focus:outline-none text-center"
        placeholder="Add your new todo"
        value={todoItem.title}
        onKeyDown={handleKeyDown}
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      {/* <button onClick={onButtonClick}>ADD</button> */}
    </div>
  );
}
