import { useState } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'my todo1',
      done: false,
    },
    {
      id: 2,
      title: 'my todo2',
      done: false,
    },
    {
      id: 3,
      title: 'my todo3',
      done: true,
    },
    {
      id: 4,
      title: 'my todo4',
      done: false,
    },
  ]);

  // todoItems 배열에 newItems 추가
  const addItem = (newItem) => {
    const newTodo = {
      id: todoItems.length + 1,
      title: newItem.title,
      done: false,
    };

    setTodoItems([...todoItems, newTodo]);
    console.log(newItem);
  };

  // todoItems 상태에 특정 todo 삭제
  const deleteItem = (id) => {
    console.log(id);
    const newTodoItems = todoItems.filter((todo) => todo.id !== id);

    setTodoItems(newTodoItems);
  };

  // check 토글
  const checkHandler = (done) => {
    // console.log(e.target.value);
    // const newTodoItems = { ...todoItems, done: !done };
    // setTodoItems([...]
    console.log(done);
  };

  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      {/* 
        1) todoItems 반복
        2) props 데이터 (todo 객체)를 자식 컴포넌트에게 전달
      */}
      {todoItems.map((todo) => (
        <Todo
          key={todo.id}
          item={todo}
          deleteItem={deleteItem}
          checkHandler={checkHandler}
        />
      ))}
    </div>
  );
}

export default App;
