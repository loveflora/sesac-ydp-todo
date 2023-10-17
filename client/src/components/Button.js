import React from 'react';

export default function Button({ toggleAllTodo, deleteAllTodo, leftTodo }) {
  const checkAllHandler = () => {
    toggleAllTodo(true);
  };

  const uncheckAllHandler = () => {
    toggleAllTodo(false);
  };

  const deleteAllHandler = () => {
    deleteAllTodo();
  };

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
