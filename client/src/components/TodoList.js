import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo.js';
import Todo from './Todo.js';

export default function TodoList() {
  // console.log('환경변수 >>>', process.env.REACT_APP_DB_HOST);
  // 환경변수 >>> http://localhost:8000

  const [todoItems, setTodoItems] = useState([]);

  //] 컴포넌트가 마운트되면 GET 요청을 보내 데이터를 가져옴
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);
      setTodoItems(res.data);
    };
    console.log(`${process.env.REACT_APP_DB_HOST}/todos`);

    getTodos();
  }, []);

  //_ 3000(client) & 8000(server) : 포트번호 다름
  //!!!!!! CORS Error !!!!!!!! (중요)
  // 요청의 Origin이 8080이 아니므로 8080(BE)쪽에서 거절 (SOP 정책에 어긋남)
  // 다른 도메인에서 요청하더라도 받아들일 수 있도록 설정해야 함 !
  //--> CORS 미들웨어 등록하면 에러 해결됨

  //) SOP (Same Origin Policy, 동일 출처 정책)
  // 같은 origin(출처, 주소)만 데이터를 주고 받겠다

  //////////////////////////////////////////
  //XXX
  // useEffect(() => {

  //   axios({
  //     method: 'GET',
  //     url: '/todos',
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       console.log('!!!!');
  //       // setTodoItems(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []); // 빈 의존성 배열 : 전달하여 컴포넌트가 마운트될 때 한 번만 실행

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
    setTodoItems([...todoItems, res.data]);
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
  };

  const updateItem = async (targetItem) => {
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    );
  };

  ///////////////////////////////////
  //XXX check 토글 XXX
  // const checkHandler = (id, done) => {
  //   //-- 1) 이전 상태 prevState를 받아와서 업데이트를 수행
  //   setTodoItems((prevState) => {
  //     return prevState.map((todo) =>
  //       todo.id === id ? { ...todo, done: !done } : todo
  //     );
  //   });

  //   //-- 2)
  //   // const newTodoItems = todoItems.map((todo) =>
  //   //   todo.id === id ? { ...todo, done: !done } : todo,
  //   // );
  //   // setTodoItems(newTodoItems);
  // };

  return (
    <div>
      <div>남은 할 일 : {todoItems.filter((v) => !v.done).length}</div>
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
          updateItem={updateItem}
        />
      ))}
    </div>
  );
}
