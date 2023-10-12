import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import axios from "axios";

function App() {
  const [todoItems, setTodoItems] = useState([
    // {
    //   id: 1,
    //   title: "my todo1",
    //   done: false,
    // },
    // {
    //   id: 2,
    //   title: "my todo2",
    //   done: false,
    // },
    // {
    //   id: 3,
    //   title: "my todo3",
    //   done: true,
    // },
    // {
    //   id: 4,
    //   title: "my todo4",
    //   done: false,
    // },
  ]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 GET 요청을 보내어 더미 데이터를 가져옴
    axios
      .get("/todos")
      .then((response) => {
        setTodoItems(response.data.data);
        console.log("????????");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  // todoItems 배열에 newItems 추가
  const addItem = (newItem) => {
    const newTodo = {
      id: todoItems.length + 1,
      title: newItem.title,
      done: false,
    };

    setTodoItems([...todoItems, newTodo]);
  };

  // todoItems 상태에 특정 todo 삭제
  const deleteItem = (id) => {
    console.log(id);
    const newTodoItems = todoItems.filter((todo) => todo.id !== id);

    setTodoItems(newTodoItems);
  };

  // check 토글
  const checkHandler = (id, done) => {
    //-- 1) 이전 상태 prevState를 받아와서 업데이트를 수행
    setTodoItems((prevState) => {
      return prevState.map((todo) =>
        todo.id === id ? { ...todo, done: !done } : todo,
      );
    });

    //-- 2)
    // const newTodoItems = todoItems.map((todo) =>
    //   todo.id === id ? { ...todo, done: !done } : todo,
    // );

    // setTodoItems(newTodoItems);
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
