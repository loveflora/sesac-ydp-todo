import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo.js';
import Todo from './Todo.js';
import Button from './Button.js';

export default function TodoList() {
  const [todoItems, setTodoItems] = useState([]);
  const [leftTodo, setLeftTodo] = useState(todoItems.length);

  // console.log('환경변수 >>>', process.env.REACT_APP_DB_HOST);
  // 환경변수 >>> http://localhost:8000

  //] 컴포넌트가 마운트되면 GET 요청을 보내 데이터를 가져옴
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);
      setTodoItems(res.data);

      // 남은 할 일 세기
      const leftTodoCount = res.data.filter((v) => !v.done).length;
      setLeftTodo(leftTodoCount);
    };

    getTodos();
  }, []); // 빈 의존성 배열 : 컴포넌트가 마운트될 때 한 번만 실행

  //_ 3000(client) & 8000(server) : 포트번호 다름
  //!!!!!! CORS Error !!!!!!!! (중요)
  // 요청의 Origin이 8080이 아니므로 8080(BE)쪽에서 거절 (SOP 정책에 어긋남)
  // 다른 도메인에서 요청하더라도 받아들일 수 있도록 설정해야 함 !
  //--> CORS 미들웨어 등록하면 에러 해결됨

  //) SOP (Same Origin Policy, 동일 출처 정책)
  // 같은 origin(출처, 주소)만 데이터를 주고 받겠다

  //] todoItems 배열에 newItems 추가
  const addItem = async (newItem) => {
    //_ [ BEFORE : only FE ]
    // const newTodo = {
    //   id: todoItems.length + 1,
    //   title: newItem.title,
    //   done: false,
    // };
    // setTodoItems([...todoItems, newTodo]);

    //_ [ AFTER : FE + BE ]
    // newItem이 이미 객체
    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/todo`,
      newItem
    ); // axios.post('url', {})
    const updatedItems = [...todoItems, res.data];
    setTodoItems(updatedItems);

    // 남은 할 일 업데이트
    const leftTodoCount = updatedItems.filter((v) => !v.done).length;
    setLeftTodo(leftTodoCount);
  };

  //] todoItems 상태에 특정 todo 삭제
  const deleteItem = async (targetItem) => {
    //_ [ BEFORE : only FE ]
    // const newTodoItems = todoItems.filter((todo) => todo.id !== targetItem.id);
    // setTodoItems(newTodoItems);

    //_ [ AFTER : FE + BE ]
    await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`
    );

    const newTodoItems = todoItems.filter((todo) => todo.id !== targetItem.id);
    setTodoItems(newTodoItems);

    // 남은 할 일 업데이트
    const leftTodoCount = newTodoItems.filter((v) => !v.done).length;
    setLeftTodo(leftTodoCount);
  };

  //] 체크박스 클릭 시 할일목록 업데이트
  const updateItem = async (targetItem) => {
    // 서버에 업데이트 요청
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    );

    const updatedTodoItems = todoItems.map((v) =>
      v.id === targetItem.id ? targetItem : v
    );

    setTodoItems(updatedTodoItems);

    // 남은 할 일 업데이트
    const leftTodoCount = updatedTodoItems.filter((v) => !v.done).length;
    setLeftTodo(leftTodoCount);
  };

  //] 모두 체크/해제 토글
  const toggleAllTodo = async (selectAll) => {
    // check All : true,
    // uncheck All : false 값을 보내줌
    await axios.put(`${process.env.REACT_APP_DB_HOST}/todos`, { selectAll });

    const checkAllTodoItems = todoItems.map((v) => {
      return { ...v, done: selectAll };
    });

    setTodoItems([...checkAllTodoItems]);

    // 남은 할 일 업데이트
    selectAll ? setLeftTodo(0) : setLeftTodo(todoItems.length);
  };

  //] 모두 삭제
  const deleteAllTodo = async () => {
    await axios.delete(`${process.env.REACT_APP_DB_HOST}/todos`);

    setTodoItems([]);

    // 남은 할 일 업데이트
    setLeftTodo(0);
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <AddTodo addItem={addItem} />
        </div>
        <div
          className="mx-auto bg-stone-300 bg-opacity-60 rounded-lg p-4 w-80 h-96 overflow-auto
        "
        >
          <div className=" text-stone-700 text-opacity-60 ">
            Remaining tasks : {leftTodo}
          </div>
          <div className="my-3">
            <hr />
          </div>

          <div className="space-y-2">
            {/* 
        1) todoItems 반복
        2) props 데이터 (todo 객체)를 자식 컴포넌트에게 전달
      */}
            {todoItems.map((todo) => (
              <Todo
                key={todo.id}
                item={todo}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Button
          toggleAllTodo={toggleAllTodo}
          deleteAllTodo={deleteAllTodo}
          leftTodo={leftTodo}
        />
      </div>
    </div>
  );
}
