import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;

    setTodos([
      ...todos,
      { text: text, completed: false }
    ]);

    setText("");
  };


  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };



  return (
    <div className="container">
      <div className="card">
        <h1>Todo App</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  const updatedTodos = [...todos];
                  updatedTodos[index].completed = !updatedTodos[index].completed;
                  setTodos(updatedTodos);
                }}
              />

              <span>{todo.text}</span>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(index)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default App;