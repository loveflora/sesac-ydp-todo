import React, { useState } from 'react';

// Todo Component
// - checkbox와 label을 렌더링하는 하나의 Todo
export default function Todo({ item, deleteItem, checkHandler }) {
  const [todoItem, setTodoItem] = useState(item);
  const { id, title, done } = todoItem;
  const [readOnly, setReadOnly] = useState(true);

  const onButtonClick = () => {
    deleteItem(todoItem);
  };

  const checkBoxEventHandler = (e) => {
    //XXX checkHandler(id, done);

    const { done, ...rest } = todoItem;
    setTodoItem({
      done: e.target.checked,
      ...rest,
    });
  };

  // title 클릭하면 readOnly를 false로 변경 (수정 가능하도록)
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  // title 수정
  const editEventHandler = (e) => {
    const { title, ...rest } = todoItem;
    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  //_ rest parameters
  //) 객체에서 rest
  // const icecream = {
  //   company: 'lotte',
  //   flavor: 'choco',
  //   price: 1000,
  // };

  // const { flavor, ...rest } = icecream;

  // console.log(flavor); // choco
  // console.log(rest); // {company: 'lotte', price: 1000}
  //_

  // Enter 키 누르면, readOnly를 true로 변경
  const editKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      setReadOnly(true);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        onChange={checkBoxEventHandler}
        defaultChecked={done} // 기본 체크값
      />
      {/* 수정 - 클릭하면 변경 */}
      {/* <label htmlFor={`todo${id}`}>{title}</label> */}
      <input
        type="text"
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={editKeyEventHandler}
      />
      <button onClick={onButtonClick}>DELETE</button>
    </div>
  );
}
