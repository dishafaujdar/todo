import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;    //trim use to remove whitespaces from lines
    addTodo(task);
    setTask('');
  };

  return (
    <div>
      <h1>ENTER YOUR TODOS</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit"> Add </button>
      </form>
    </div>
  );
};

export default TodoForm;

//so onSubmit is use during form as it works well there as it does not allow user to fill emmpty form and take care of whiteline,it's preferable to use onSubmit,it trigger the form over onclick as onclick can be use anywhere where we just want something trigger just when button/.. get click with concerning much bout anythin