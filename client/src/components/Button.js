import React, { useState } from 'react';

export default function Button({ checkAllTodos, uncheckAllTodos, leftTodo }) {
  // const [isCheckButtonVisible, setIsCheckButtonVisible] = useState(false);
  // const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const checkAllHandler = () => {
    checkAllTodos();
    setAllChecked(true);
  };

  const uncheckAllHandler = () => {
    uncheckAllTodos();
    setAllChecked(false);
  };

  const deleteAllHandler = () => {};

  return (
    <div>
      {leftTodo ? (
        <button
          onClick={checkAllHandler}
          className={`absolute left-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 opacity-20 hover:opacity-90
       
          }`}
        >
          Check All
        </button>
      ) : (
        <button
          onClick={uncheckAllHandler}
          className={`absolute left-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 opacity-30 hover:opacity-90
        
          }`}
        >
          UnCheck All
        </button>
      )}

      <button
        onClick={deleteAllHandler}
        className={`absolute right-5 bottom-5 bg-stone-300 rounded-lg p-2 transition-opacity duration-300 opacity-40 hover:opacity-90
        }`}
      >
        Delete All
      </button>
    </div>
  );
}
