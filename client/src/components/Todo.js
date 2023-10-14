import React, { useState } from 'react';

// Todo Component
// - checkbox와 label을 렌더링하는 하나의 Todo
export default function Todo({ item, deleteItem, updateItem }) {
  const [todoItem, setTodoItem] = useState(item);
  const { id, title, done } = todoItem;
  const [readOnly, setReadOnly] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const onButtonClick = () => {
    deleteItem(todoItem);
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
      updateItem(todoItem); // Enter 키 누르면 저장
    }
  };

  // checkbox 상태 업데이트
  const checkBoxEventHandler = (e) => {
    const { done, ...rest } = todoItem;
    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };

    setTodoItem(updatedItem);
    updateItem(updatedItem); // 체크박스 변경 시 저장
  };

  return (
    <div>
      {/* 1. 체크 박스 */}
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        onChange={checkBoxEventHandler}
        checked={done} // 기본 체크값
        //% checked 해도 되는지 ?
        // 일반적으로 초기 렌더링 시에 입력 요소의 상태를 설정하려면,
        // defaultChecked를 사용하고, 사용자 입력에 대응하여 입력 요소의 상태를 업데이트하려면 checked를 사용합니다.

        className="mr-3 h-4 w-4 border-2 rounded checked:bg-orange-400 
        checked:border-transparent appearance-none 
        focus:ring-2 focus:ring-stone-500
        cursor-pointer"
      />

      {/* 2. 개별 할 일 */}
      {/* 수정 - 클릭하면 변경 */}
      {/* <label htmlFor={`todo${id}`}>{title}</label> */}
      <input
        type="text"
        className={`bg-transparent focus:border-b mr-3 p-1 focus:outline-none 
        ${done ? 'line-through  text-gray-500 text-opacity-70' : ''}`}
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={editKeyEventHandler}
      />
      <button
        onClick={onButtonClick}
        onMouseEnter={() => setIsButtonVisible(true)}
        onMouseLeave={() => setIsButtonVisible(false)}
        className={`text-stone-600 font-bold transition-opacity duration-300 opacity-${
          isButtonVisible ? '100' : '0'
        }`}
      >
        <svg viewBox="0 0 448 512" fill="currentColor" height="1em" width="1em">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
        </svg>
      </button>
    </div>
  );
}
