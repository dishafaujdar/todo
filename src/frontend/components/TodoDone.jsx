import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TodoDone = ({ todos }) => {
    const Navigate = useNavigate();

  const allTasksCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const done = () => {
    if (allTasksCompleted) {
      Navigate("/auth");
    } else {
      alert("You still have tasks to complete!");
    }
  };

  return (  
    <div>
      <button onClick={done}>ALL DONE</button>
    </div>
  );
};

export default TodoDone;
