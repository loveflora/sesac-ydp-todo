import React, { useState } from "react";

export default function Button({ checkAllTodos, uncheckAllTodos, leftTodo }) {
  const [isCheckButtonVisible, setIsCheckButtonVisible] = useState(false);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const checkAllHandler = () => {
    checkAllTodos();
    setAllChecked(true);
  };

  const uncheckAllHandler = () => {
    uncheckAllTodos();
    setAllChecked(false);
  };

  console.log(allChecked);

  const deleteAllHandler = () => {};

  return (
    <div>
      {leftTodo ? (
        <button
          onClick={checkAllHandler}
          onMouseEnter={() => setIsCheckButtonVisible(true)}
          onMouseLeave={() => setIsCheckButtonVisible(false)}
          className={`absolute left-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 ${
            isCheckButtonVisible ? "opacity-90" : "opacity-20"
          }`}
        >
          Check All
        </button>
      ) : (
        <button
          onClick={uncheckAllHandler}
          onMouseEnter={() => setIsCheckButtonVisible(true)}
          onMouseLeave={() => setIsCheckButtonVisible(false)}
          className={`absolute left-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 ${
            isCheckButtonVisible ? "opacity-90" : "opacity-20"
          }`}
        >
          UnCheck All
        </button>
      )}

      <button
        onClick={deleteAllHandler}
        onMouseEnter={() => setIsDeleteButtonVisible(true)}
        onMouseLeave={() => setIsDeleteButtonVisible(false)}
        className={`absolute right-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 ${
          isDeleteButtonVisible ? "opacity-90" : "opacity-40"
        }`}
      >
        Delete All
      </button>
    </div>
  );
}
