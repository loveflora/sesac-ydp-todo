import React from 'react';

// Todo Component
// - checkbox와 label을 렌더링하는 하나의 Todo
export default function Todo({ item }) {
  const { id, title, done } = item;

  const checkHandler = (e) => {
    console.log(e.target.id);

    // (!done)
  };

  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        onChange={checkHandler}
        defaultChecked={done} // 기본 체크값
      />
      <label htmlFor={`todo${id}`}>{title}</label>
    </div>
  );
}
