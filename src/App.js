import React, { useState } from 'react';
import './App.css';

function Todo({ todo, i }) {
  return (
    <div className="todo">{ todo.text }</div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"
        value={value} 
        placeholder="add new to do"
        onChange={e => setValue(e.target.value)} 
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn Hooks',
      isCompleted: false
    },
    {
      text: 'Appy hooks to Boggle',
      isCompleted: false
    },
    {
      text: 'Get coffee',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, i) => (
          <Todo key={i} index={i} todo={todo}/>
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
};

export default App;
