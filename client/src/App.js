import Clock from './components/Clock';
import TodoList from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <div className="relative bg-cover bg-center bg-no-repeat h-screen w-screen">
        <img
          className="object-cover w-full h-full"
          src="img/bg.jpeg"
          alt="bg"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center">
        <div class="flex flex-col items-center space-y-6">
          <div className="space-y-3 text-white">
            <Clock />
            <h1 className="text-3xl font-bold">
              What is your main focus for today ?
            </h1>
          </div>
          <div className=" bg-stone-300 bg-opacity-60 rounded-lg p-4">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
