import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoForm from "./level1/TodoForm";
import TodoList from "./level1/TodoList";
import TodoDone from "./level1/TodoDone";
import SendOtp from "./level1/Sendotp";
import Signup from "./level2/Signup";
import Login from "./level2/Login";
import Newtodo from "./level2/Newtodo"
// import AuthPage from "./components/AuthPage";
import Authpg from "./level2/Newauthpg";

function App() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (task) => {
    const newTodo = {
      id: todos.length + 1,
      task: task,
      completed: false,
    };
    setTodos([...todos, newTodo]); //append the newtodo by existing todo 
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  return (
  <div>
  <div>
    <Router>
    <div>
      <Routes>
        <Route 
          path="/todo"
          element={
          <>
              <TodoForm addTodo={addTodo} />
              <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
              <TodoDone todos={todos}/>
              {/* use to pass prop todos in todoDone */}
          </>
            }
          />
          <Route path="/sendOtp" element={<SendOtp/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/newtodo" element={<Newtodo/>}/>
          <Route path="/newauth" element={<Authpg/>}/>
      </Routes>
    </div>
    </Router>
  </div>
  </div>
  );
};

export default App;
