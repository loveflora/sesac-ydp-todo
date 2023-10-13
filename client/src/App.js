import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './styles/index.css';

function App() {
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
    <div className="App">
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span class="font-semibold text-xl tracking-tight">TODO LIST</span>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div>
            <div
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white 
            hover:border-transparent 
            hover:text-teal-500 
            hover:bg-white mt-4 lg:mt-0"
            >
              reset
            </div>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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

export default App;
