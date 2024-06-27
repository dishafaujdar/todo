import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDone from "./components/TodoDone";
import AuthPage from "./components/AuthPage";

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
    <Router>
    <div>
      <Routes>
        <Route 
          path="/"
          element={
          <>
              <TodoForm addTodo={addTodo} />
              <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
              <TodoDone todos={todos}/> 
              {/* use to pass prop todos in todoDone */}
          </>
            }
          />
          <Route path="/auth" element={<AuthPage/>} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;