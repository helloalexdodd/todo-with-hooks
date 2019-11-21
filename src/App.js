import React, { useState, useEffect } from 'react';
import './App.css';

function Todo({ todo, i, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(i)}>Complete</button>
        <button onClick={() => removeTodo(i)}>x</button>
      </div>
    </div>
  );
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

  const completeTodo = i => {
    const newTodos = [...todos];
    newTodos[i].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = i => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };
  
  const [data, setData] = useState();

  // Call our fetch function below once the component mounts
  useEffect(() => {
    callBackendAPI()
      .then(res => setData(res.express))
      .catch(err => console.log(err));
  });
  
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, i) => (
          <Todo
            key={i}
            i={i}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
};

export default App;
