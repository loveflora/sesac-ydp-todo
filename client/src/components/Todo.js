import React, { useState } from "react";

// Todo Component
// - checkbox와 label을 렌더링하는 하나의 Todo
export default function Todo({ item, deleteItem, checkHandler }) {
  const { id, title, done } = item;

  const onButtonClick = () => {
    deleteItem(id);
  };

  const toggleHandler = () => {
    checkHandler(id, done);
  };

  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        onChange={toggleHandler}
        defaultChecked={done} // 기본 체크값
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button onClick={onButtonClick}>DELETE</button>
    </div>
  );
}
