import Clock from "./components/Clock";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

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
        <div className="flex flex-col items-center space-y-6">
          <div className="text-white">
            <Clock />
            <h1 className="text-3xl font-bold">
              What is your main focus for today ?
            </h1>
          </div>
          <div className="w-full">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
