import React from "react";
import {useNavigate } from "react-router-dom";

const TodoDone = ({ todos }) => {
    const Navigate = useNavigate();

  const allTasksCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const done = () => {
    if (allTasksCompleted) {
      Navigate("/sendOtp");
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
